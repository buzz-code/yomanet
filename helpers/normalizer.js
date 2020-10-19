const constants = require("./constants");
const puppeteer = require("puppeteer");
const moment = require("moment");

const normalizeListening = (data) => {
    return data;
};

const getTableCellValue = (item, header) => {
    try {
        if (header.format === "sec2min") {
            const duration = item[header.value];
            var hrs = ~~(duration / 3600);
            var mins = ~~((duration % 3600) / 60);
            var secs = ~~duration % 60;

            // Output like "1:01" or "4:03:59" or "123:03:59"
            var ret = [];
            if (hrs > 0) {
                ret.push(hrs);
                ret.push(":");
            }
            if (mins < 10) {
                ret.push("0");
            }
            ret.push(mins);
            ret.push(":");
            if (secs < 10) {
                ret.push("0");
            }
            ret.push(secs);
            return ret.join("");
        }
        if (header.format === "date") {
            return moment.utc(item[header.value]).format("DD/MM/YYYY");
        }
        if (header.format === "time") {
            return moment.utc(item[header.value]).format("HH:mm:ss");
        }
        if (header.format === "nameWOKlass") {
            return item[header.value].match(/\d(.*)$/)[1];
        }
    } catch (e) {
        console.log(JSON.stringify(item[header.value]), header.format, e);
        return item[header.value];
    }
    return item[header.value];
};

const getTableDataResponse = (results, totalCount, headers, params) => {
    results.forEach((item) => {
        headers.forEach((header) => {
            item[header.value] = getTableCellValue(item, header);
        });
    });

    const data = {
        results,
        pageCount: Math.ceil(totalCount / constants.pageSize),
        headers,
        params,
    };
    return data;
};

const createHeader = (header) => `
    <td>${header.label}</td>
    `;

const createCell = (item, header) => `
    <td title='${getTableCellValue(item, header)}'>${getTableCellValue(item, header)}</td>
    `;

const createRow = (item, headers) => `
    <tr>
      ${headers.map((header) => createCell(item, header)).join("")}
    </tr>
  `;

const createTable = (rows, headers) => `
      <table>
        <thead>
            <tr>
                ${headers.map((item) => createHeader(item)).join("")}
            </tr>
        </thead>
        <tbody>
            ${rows}
        </tbody>
      </table>
    `;

const createHtml = (title, data, headers) => `
      <html>
        <head>
          <style>
            body {
                direction: rtl;
            }
            h1, h2 {
                text-align: center;
            }
            table {
                min-width: 100%;
                font-family: sans-serif;
                table-layout: fixed;
            }
            thead tr {
                background-color: #009879;
                color: #ffffff;
                text-align: left;            
            }
            tbody tr {
                border-bottom: 1px solid #dddddd;
            }
            th, td {
                padding: 10px 5px;
                text-align: center;
                font-size: 0.75rem;
                width: auto;
                min-width: 40px;
            }
            td:first-of-type, th:first-of-type {
                width: 100px;
            }
            td[title='00:00'] {
                color: white;
            }
            tbody tr:nth-of-type(even) td[title='00:00'] {
                color: #f3f3f3;
            }
            tbody tr:nth-of-type(even) {
                background-color: #f3f3f3;
            }
            tbody tr:last-of-type {
                border-bottom: 2px solid #009879;
            }
            </style>
        </head>
        <body>
            <h1>${title}</h1>
            ${data.length > 0 ? createTable(data.map((item) => createRow(item, headers)).join(""), headers) : ""}
            <h2>${data.length == 0 ? "לא נמצאו נתונים" : ""}</h2>
        </body>
      </html>
    `;

const createReport = async (res, title, results, headers) => {
    const html = createHtml(title, results, headers);
    const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
    const pdf = await browser.newPage();
    await pdf.setContent(html);
    const buffer = await pdf.pdf({
        format: "A4",
        printBackground: true,
        landscape: true,
        margin: {
            left: "20px",
            top: "20px",
            right: "20px",
            bottom: "20px",
        },
    });
    await browser.close();
    res.attachment(title + ".pdf");
    res.end(buffer);
};

function getPagingConfig(page) {
    return {
        skip: constants.pageSize * (page - 1),
        limit: constants.pageSize,
    };
}

module.exports = {
    normalizeListening,
    getTableCellValue,
    getTableDataResponse,
    createReport,
    getPagingConfig,
};
