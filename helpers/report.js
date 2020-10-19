const { getTableCellValue } = require("./data");

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
            </style>
        </head>
        <body>
            <h1>${title}</h1>
            ${data.length > 0 ? createTable(data.map((item) => createRow(item, headers)).join(""), headers) : ""}
            <h2>${data.length == 0 ? "לא נמצאו נתונים" : ""}</h2>
        </body>
      </html>
    `;

module.exports = {
    createHtml,
};
