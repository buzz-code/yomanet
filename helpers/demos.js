// // const files = require("./files");
// // const validation = require("./validation");
// // const parsing = require("./parsing");
// // const normalizer = require("./normalizer");
// // const db = require("./db");

// // // url = "C:/Users/Home/Downloads/LogPlaybackPlayStop.2020-09-22.html";
// // // files
// // //     .readFile(url)
// // //     .then((content) => content.toString())
// // //     .then((content) => {
// // //         if (validation.fileIsUnique(content)) {
// // //             return parsing.parseHtml(content);
// // //         } else {
// // //             throw "file has already been added";
// // //         }
// // //     })
// // //     .then(normalizer.normalizeListening)
// // //     .then(db.saveListening)
// // //     .then(console.log)
// // //     .finally(console.log);

// // // const XLSX = require("xlsx");
// // // const url = "C:/Users/Home/Downloads/שיעורים וקודים.xlsx";
// // // const wb = XLSX.readFile(url);
// // // wb.SheetNames.forEach((n, i) => {
// // //     console.log(`Sheet #${i + 1}: ${n}`);
// // //     const ws = wb.Sheets[n];
// // //     console.log(XLSX.utils.sheet_to_json(ws, { header: ["שלוחה", "שם הודעה"] }));
// // // });


// // // wb.SheetNames.forEach((n, i) => {
// // //     console.log(`Sheet #${i + 1}: ${n}`);
// // //     const ws = wb.Sheets[n];
// // //     console.log(XLSX.utils.sheet_to_json(ws, { header: ["שלוחה", "שם הודעה"] }));
// // // });


// // db.saveLesson(parsing.parseLesson("C:/Users/Home/Downloads/שיעורים וקודים.xlsx")).then(console.log)
// // db.saveStudent(parsing.parseStudent("C:/Users/Home/Downloads/עותק של רשימת בנות ותעודות זהות.xlsx")).then(console.log)

// //     //     var pdf = new PdfDocument({
// //     //         autoFirstPage: false
// //     //     }),
// //     //     table = new PdfTable(pdf, {
// //     //         bottomMargin: 30
// //     //     });
// //     //     pdf.font("C:/Users/Home/Downloads/Rubik-Regular.ttf")

// //     // table
// //     //     // add some plugins (here, a 'fit-to-width' for a column)
// //     //     .addPlugin(new (require('voilab-pdf-table/plugins/fitcolumn'))({
// //     //         column: 'description'
// //     //     }))
// //     //     // set defaults to your columns
// //     //     .setColumnsDefaults({
// //     //         headerBorder: 'B',
// //     //         align: 'right'
// //     //     })
// //     //     // add table columns
// //     //     .addColumns([
// //     //         {
// //     //             id: 'description',
// //     //             header: 'jklj;l',
// //     //             align: 'left'
// //     //         },
// //     //         {
// //     //             id: 'quantity',
// //     //             header: 'Quantity',
// //     //             width: 50
// //     //         },
// //     //         {
// //     //             id: 'price',
// //     //             header: 'לחלחלחלחלח',
// //     //             width: 40
// //     //         },
// //     //         {
// //     //             id: 'total',
// //     //             header: 'Total',
// //     //             width: 70,
// //     //             renderer: function (tb, data) {
// //     //                 return 'CHF ' + data.total;
// //     //             }
// //     //         }
// //     //     ])
// //     //     // add events (here, we draw headers on each new page)
// //     //     .onPageAdded(function (tb) {
// //     //         tb.addHeader();
// //     //     });

// //     // // if no page already exists in your PDF, do not forget to add one
// //     // pdf.addPage();

// //     // // draw content, by passing data to the addBody method
// //     // table.addBody([
// //     //     {description: 'Product 1', quantity: 1, price: 20.10, total: 20.10},
// //     //     {description: 'Product 2', quantity: 4, price: 4.00, total: 16.00},
// //     //     {description: 'Product 3', quantity: 2, price: 17.85, total: 35.70}
// //     // ]);

// //     //     pdf.pipe(res);

// //     //     pdf.end();

// //     // var PDFDocument = require("pdfkit");

// //     // var doc = new PDFDocument;

// //     // doc.pipe(res);

// //     // // doc.font("C:Users/Home/Desktop/SideProjects/VocalCenterStats/controllers/Rubik-Regular.ttf")
// //     // doc.font("C:/Users/Home/Downloads/Rubik-Regular.ttf")
// //     // // doc.font('https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf');
// //     // doc.fontSize(15);
// //     // doc.text('Generate PDF! שדגכשגד');

// //     // doc.end();


// const headerFunction = function (Report) {
//     let title = "נתונים";
//     if (klass) title += ` לכיתה ${klass}`;
//     if (lesson) title += ` לשיעור ${lesson}`;
//     Report.print(title, {
//         fontSize: 22,
//         bold: true,
//         underline: true,
//         align: "center",
//     });
//     Report.newLine(2);
//     Report.band(headers);
// };

// const footerFunction = function (Report) {
//     Report.line(Report.currentX(), Report.maxY() - 18, Report.maxX(), Report.maxY() - 18);
//     Report.pageNumber({ text: "עמוד {0} מתוך {1}", footer: true, align: "left" });
//     Report.print("הודפס בתאריך: " + new Date().toLocaleDateString(), { y: Report.maxY() - 14, align: "right" });
// };
// res.setHeader("Content-Type", "application/octet-stream");
// res.setHeader("Content-Disposition", 'attachment; filename="picture.pdf"');
// res.attachment("pdfname.pdf");
//     // const rpt = new Report(res)
// //     .font("C:/Users/Home/Downloads/Rubik-Regular.ttf")
// //     .landscape(true)
// //     .autoPrint(false) // Optional
// //     .margins(20) // Change the Margins to 20 pixels
// //     .data(results) // Add our Data
// //     .pageHeader(headerFunction) // Add a header
// //     .pageFooter(footerFunction) // Add a footer
// //     .detail(headers.map((item) => [item.value, item.width, "right"])) // Put how we want to print out the data line.
// //     .render(function (err) {
// //         if (err) throw err;
// //     }); // Render it out