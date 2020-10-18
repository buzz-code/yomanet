const constants = require("./constants");
const puppeteer = require("puppeteer");

const normalizeListening = (data) => {
    return data;
};

const getTableCellValue = (item, header) => {
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
    <td>${getTableCellValue(item, header)}</td>
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
            h1 {
                text-align: center;
            }
            table {
                max-width: 100%;
                font-family: sans-serif;
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
                padding: 15px;
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
            ${createTable(data.map((item) => createRow(item, headers)).join(""), headers)}
        </body>
      </html>
    `;

const createReport = async (res, title, results, headers) => {
    const html = createHtml(title, results, headers);
    const browser = await puppeteer.launch({ headless: true });
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
    res.end(buffer);
};
module.exports = {
    normalizeListening,
    getTableCellValue,
    getTableDataResponse,
    createReport,
};
