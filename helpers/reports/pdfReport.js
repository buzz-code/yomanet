const { getTableCellValue } = require("../format");
const puppeteer = require("puppeteer");

const createHeader = (header) => `
    <td>${header.label}</td>
    `;

const createCell = (item, header) => {
    const cellValue = getTableCellValue(item, header);
    return `
    <td title='${cellValue}'>${cellValue}</td>
    `;
};

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
                font-family: sans-serif;
            }
            h1, h2 {
                text-align: center;
            }
            table {
                min-width: 100%;
                table-layout: fixed;
            }
            thead tr {
                background-color: #563d7c;
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
            footer {
                position: fixed;
                bottom: 0;
                font-size: 0.75rem;
            }
            </style>
        </head>
        <body>
            <h1>${title}</h1>
            ${data.length > 0 ? createTable(data.map((item) => createRow(item, headers)).join(""), headers) : ""}
            <h2>${data.length == 0 ? "לא נמצאו נתונים" : ""}</h2>
            <footer>הופק ע"י מערכת יומנט, חסוי ע"פ חוק הגנת הפרטיות</footer>
        </body>
      </html>
    `;

const getPdfReportObject = async (title, results, headers) => {
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
    return {
        fileName: title + ".pdf",
        buffer,
    };
};

module.exports = {
    getPdfReportObject,
};
