const puppeteer = require("puppeteer");
const { getSec2Min } = require("./format");

const defaultStats = { Count: 0, TimeTotal: 0 };

const createTableRow = (label, stats) => `
    <tr>
        <td>${label}</td>
        <td>${stats.Count}</td>
        <td>${getSec2Min(stats.TimeTotal)}</td>
        <td>${getSec2Min(stats.Count ? stats.TimeTotal / stats.Count : 0)}</td>
    </tr>
`;

const createTable = (studentData, headers) => `
    <table>
        <thead>
            <tr>
                <th>שם השיעור</th>
                <th>מספר שיעורים</th>
                <th>סה"כ האזנה</th>
                <th>זמן האזנה ממוצע</th>
            </tr>
        </thead>
        <tbody>
            ${headers.map((item) => createTableRow(item.label, studentData[item.value] || defaultStats)).join("")}
        </tbody>
    </table>
    `;

const createPage = (studentData, headers) => `
    <div class="page">
        <h1>${studentData.name}</h1>
        ${createTable(studentData, headers)}
    </div>
    `;

const createHtml = (data, headers) => `
      <html>
        <head>
          <style>
            body {
                direction: rtl;
            }
            h1 {
                text-align: center;
            }
            .page {
                page-break-after: always;
                text-align: center;
                width: 600px;
                min-height: 88vh;
                margin: 5vh auto;
                border: double #563d7c;
            }
            table {
                width: 100%;
                padding: 0 10%;
                margin: 20px 0 40px;
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
                width: auto;
                min-width: 40px;
            }
            td:first-of-type, th:first-of-type {
                width: 100px;
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
            <h1>${data.length == 0 ? "לא נמצאו נתונים" : ""}</h1>
            ${data.map((item) => createPage(item, headers)).join("")}
        </body>
      </html>
    `;

const getDiplomaReportObject = async (title, results, headers) => {
    const html = createHtml(results, headers);
    const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
    const pdf = await browser.newPage();
    await pdf.setContent(html);
    const buffer = await pdf.pdf({
        format: "A4",
        printBackground: true,
        landscape: false,
        margin: {
            left: "20px",
            top: "20px",
            right: "20px",
            bottom: "20px",
        },
    });
    // require("fs").writeFileSync("report.html", html);
    await browser.close();
    return {
        fileName: title + ".pdf",
        buffer,
    };
};

module.exports = {
    getDiplomaReportObject,
};
