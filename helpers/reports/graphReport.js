const puppeteer = require("puppeteer");

const createChart = (chartOptions) => `
        <div class="chart-container">
            <h2>${chartOptions.title}</h2>
            <canvas id="myChart-${chartOptions.title}"></canvas>
            <script>
                var ctx = document.getElementById('myChart-${chartOptions.title}').getContext('2d');
                var myChart = new Chart(ctx, ${JSON.stringify(chartOptions)});
            </script>
        </div>
    `;

const createHtml = (title, data) => `
      <html>
        <head>
          <style>
            body {
                direction: rtl;
            }
            h1, h2 {
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
            .chart-container {
                display: inline-block;
                width: 510px;
                height: 330px;
                padding: 0 10px;
            }
            </style>
            <script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.4/dist/Chart.min.js"></script>
        </head>
        <body>
            <h1>${title}</h1>
            <h2>${data.length == 0 ? "לא נמצאו נתונים" : ""}</h2>
            ${data.map((item) => createChart(item)).join("")}
        </body>
      </html>
    `;

const getGraphReportObject = async (title, results) => {
    results.forEach((item) => (item.options.animation = { duration: 0 }));
    results.forEach((item) => (item.options.aspectRatio = 2.5));
    const html = createHtml(title, results);
    const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
    const pdf = await browser.newPage();
    await pdf.setContent(html, { waitUntil: ["load", "networkidle0"] });
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
    getGraphReportObject,
};
