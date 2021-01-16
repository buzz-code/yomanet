const puppeteer = require("puppeteer");
const { getSec2Min } = require("../format");

const getLabelScoreForScore = (score) => {
    if (score > 78) return "מצוין";
    if (score > 60) return "טוב";
    if (score > 40) return "בסדר";
    return "חלש";
};

const createTableRow = (label, stats, lessonInstances) => {
    if (stats[key] === "none") return "";
    
    const percents = lessonInstances.map(([key, value]) => Math.min(1, (stats[key] || 0) / value));
    const avgPercent = percents.length ? percents.reduce((a, b) => a + b, 0) / percents.length : 0;
    const score = Math.floor(avgPercent * 100);
    const timeTotal = Object.values(stats).reduce((a, b) => a + b, 0);
    const labelScore = getLabelScoreForScore(score);

    return `
    <tr>
        <td>${label}</td>
        <td>${percents.length}</td>
        <td>${getSec2Min(timeTotal)}</td>
        <td>${score}%</td>
        <td>${labelScore}</td>
    </tr>
`;
};

const createTable = (studentData, lessonInstances, headers) => `
    <table>
        <thead>
            <tr>
                <th>שם השיעור</th>
                <th>מספר שיעורים</th>
                <th>סה"כ האזנה</th>
                <th>אחוז האזנה כולל</th>
                <th>ציון</th>
            </tr>
        </thead>
        <tbody>
            ${headers
                .map((item) => createTableRow(item.label, studentData[item.value] || {}, lessonInstances[item.value]))
                .join("")}
        </tbody>
    </table>
    `;

const createPage = (studentData, lessonInstances, headers) => `
    <div class="page">
        <h1>${studentData.name}</h1>
        ${createTable(studentData, lessonInstances, headers)}
    </div>
    `;

const createHtml = (listeningData, lessonInstances, headers) => `
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
            <h1>${listeningData.length == 0 ? "לא נמצאו נתונים" : ""}</h1>
            ${listeningData.map((item) => createPage(item, lessonInstances, headers)).join("")}
        </body>
      </html>
    `;

const getDiplomaReportObject = async (title, { listeningData, lessonInstances }, headers) => {
    const html = createHtml(listeningData, lessonInstances, headers);
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
