// // // // // const files = require("./files");
// // // // // const validation = require("./validation");
// // // // // const parsing = require("./parsing");
// // // // // const normalizer = require("./utils");
// // // // // const db = require("./db");

// // // const { request } = require("express");

// // // // // // url = "C:/Users/Home/Downloads/LogPlaybackPlayStop.2020-09-22.html";
// // // // // // files
// // // // // //     .readFile(url)
// // // // // //     .then((content) => content.toString())
// // // // // //     .then((content) => {
// // // // // //         if (validation.fileIsUnique(content)) {
// // // // // //             return parsing.parseHtml(content);
// // // // // //         } else {
// // // // // //             throw "file has already been added";
// // // // // //         }
// // // // // //     })
// // // // // //     .then(normalizer.normalizeListening)
// // // // // //     .then(db.saveListening)
// // // // // //     .then(console.log)
// // // // // //     .finally(console.log);

// // // // // // const XLSX = require("xlsx");
// // // // // // const url = "C:/Users/Home/Downloads/שיעורים וקודים.xlsx";
// // // // // // const wb = XLSX.readFile(url);
// // // // // // wb.SheetNames.forEach((n, i) => {
// // // // // //     console.log(`Sheet #${i + 1}: ${n}`);
// // // // // //     const ws = wb.Sheets[n];
// // // // // //     console.log(XLSX.utils.sheet_to_json(ws, { header: ["שלוחה", "שם הודעה"] }));
// // // // // // });

// // // // // // wb.SheetNames.forEach((n, i) => {
// // // // // //     console.log(`Sheet #${i + 1}: ${n}`);
// // // // // //     const ws = wb.Sheets[n];
// // // // // //     console.log(XLSX.utils.sheet_to_json(ws, { header: ["שלוחה", "שם הודעה"] }));
// // // // // // });

// // // // // db.saveLesson(parsing.parseLesson("C:/Users/Home/Downloads/שיעורים וקודים.xlsx")).then(console.log)
// // // // // db.saveStudent(parsing.parseStudent("C:/Users/Home/Downloads/עותק של רשימת בנות ותעודות זהות.xlsx")).then(console.log)

// // // // //     //     var pdf = new PdfDocument({
// // // // //     //         autoFirstPage: false
// // // // //     //     }),
// // // // //     //     table = new PdfTable(pdf, {
// // // // //     //         bottomMargin: 30
// // // // //     //     });
// // // // //     //     pdf.font("C:/Users/Home/Downloads/Rubik-Regular.ttf")

// // // // //     // table
// // // // //     //     // add some plugins (here, a 'fit-to-width' for a column)
// // // // //     //     .addPlugin(new (require('voilab-pdf-table/plugins/fitcolumn'))({
// // // // //     //         column: 'description'
// // // // //     //     }))
// // // // //     //     // set defaults to your columns
// // // // //     //     .setColumnsDefaults({
// // // // //     //         headerBorder: 'B',
// // // // //     //         align: 'right'
// // // // //     //     })
// // // // //     //     // add table columns
// // // // //     //     .addColumns([
// // // // //     //         {
// // // // //     //             id: 'description',
// // // // //     //             header: 'jklj;l',
// // // // //     //             align: 'left'
// // // // //     //         },
// // // // //     //         {
// // // // //     //             id: 'quantity',
// // // // //     //             header: 'Quantity',
// // // // //     //             width: 50
// // // // //     //         },
// // // // //     //         {
// // // // //     //             id: 'price',
// // // // //     //             header: 'לחלחלחלחלח',
// // // // //     //             width: 40
// // // // //     //         },
// // // // //     //         {
// // // // //     //             id: 'total',
// // // // //     //             header: 'Total',
// // // // //     //             width: 70,
// // // // //     //             renderer: function (tb, data) {
// // // // //     //                 return 'CHF ' + data.total;
// // // // //     //             }
// // // // //     //         }
// // // // //     //     ])
// // // // //     //     // add events (here, we draw headers on each new page)
// // // // //     //     .onPageAdded(function (tb) {
// // // // //     //         tb.addHeader();
// // // // //     //     });

// // // // //     // // if no page already exists in your PDF, do not forget to add one
// // // // //     // pdf.addPage();

// // // // //     // // draw content, by passing data to the addBody method
// // // // //     // table.addBody([
// // // // //     //     {description: 'Product 1', quantity: 1, price: 20.10, total: 20.10},
// // // // //     //     {description: 'Product 2', quantity: 4, price: 4.00, total: 16.00},
// // // // //     //     {description: 'Product 3', quantity: 2, price: 17.85, total: 35.70}
// // // // //     // ]);

// // // // //     //     pdf.pipe(res);

// // // // //     //     pdf.end();

// // // // //     // var PDFDocument = require("pdfkit");

// // // // //     // var doc = new PDFDocument;

// // // // //     // doc.pipe(res);

// // // // //     // // doc.font("C:Users/Home/Desktop/SideProjects/VocalCenterStats/controllers/Rubik-Regular.ttf")
// // // // //     // doc.font("C:/Users/Home/Downloads/Rubik-Regular.ttf")
// // // // //     // // doc.font('https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf');
// // // // //     // doc.fontSize(15);
// // // // //     // doc.text('Generate PDF! שדגכשגד');

// // // // //     // doc.end();

// // // // const headerFunction = function (Report) {
// // // //     let title = "נתונים";
// // // //     if (klass) title += ` לכיתה ${klass}`;
// // // //     if (lesson) title += ` לשיעור ${lesson}`;
// // // //     Report.print(title, {
// // // //         fontSize: 22,
// // // //         bold: true,
// // // //         underline: true,
// // // //         align: "center",
// // // //     });
// // // //     Report.newLine(2);
// // // //     Report.band(headers);
// // // // };

// // // // const footerFunction = function (Report) {
// // // //     Report.line(Report.currentX(), Report.maxY() - 18, Report.maxX(), Report.maxY() - 18);
// // // //     Report.pageNumber({ text: "עמוד {0} מתוך {1}", footer: true, align: "left" });
// // // //     Report.print("הודפס בתאריך: " + new Date().toLocaleDateString(), { y: Report.maxY() - 14, align: "right" });
// // // // };
// // // // res.setHeader("Content-Type", "application/octet-stream");
// // // // res.setHeader("Content-Disposition", 'attachment; filename="picture.pdf"');
// // // // res.attachment("pdfname.pdf");
// // // //     // const rpt = new Report(res)
// // // // //     .font("C:/Users/Home/Downloads/Rubik-Regular.ttf")
// // // // //     .landscape(true)
// // // // //     .autoPrint(false) // Optional
// // // // //     .margins(20) // Change the Margins to 20 pixels
// // // // //     .data(results) // Add our Data
// // // // //     .pageHeader(headerFunction) // Add a header
// // // // //     .pageFooter(footerFunction) // Add a footer
// // // // //     .detail(headers.map((item) => [item.value, item.width, "right"])) // Put how we want to print out the data line.
// // // // //     .render(function (err) {
// // // // //         if (err) throw err;
// // // // //     }); // Render it

// // // // (async () => {
// // // //     console.log("start");

// // // //     // const { Listening } = require("../models/Listening");
// // // //     const { Lesson } = require("../models/Lesson");

// // // //     // Lesson.updateMany({ user: "aysk123" }, { $set: { user: "rlayosh" } })
// // // //     //     .then(console.log)
// // // //     //     .catch(console.log);
// // // //     const c = await Lesson.count();

// // // //     console.log("end");
// // // // })().finally(console.log);

// // // // const {Lesson} = require('./../models/Lesson')
// // // // const a =  Lesson.countDocuments().then(console.log);
// // // // // console.log(a)
// // // // setTimeout(() => {
// // // //     console.log('got your')
// // // // }, 10000);

// // // const { Lesson } = require("./models/Lesson");
// // // const { Listening } = require("./models/Listening");
// // // const { Conf } = require("./models/Conf");
// // // const { Student } = require("./models/Student");
// // // const { User } = require("./models/User");

// // // const lastUser = "aysk123",
// // //     currentUser = "shviley-beit-yaakov";
// // // Lesson.updateMany({ user: lastUser }, { $set: { user: currentUser } }).then(console.log);
// // // Listening.updateMany({ user: lastUser }, { $set: { user: currentUser } }).then(console.log);
// // // Conf.updateMany({ user: lastUser }, { $set: { user: currentUser } }).then(console.log);
// // // Student.updateMany({ user: lastUser }, { $set: { user: currentUser } }).then(console.log);
// // // User.updateOne({ name: lastUser }, { $set: { name: currentUser } }).then(console.log);

// // // const { Lesson } = require("./models/Lesson");
// // // const { Listening } = require("./models/Listening");
// // // const { Conf } = require("./models/Conf");
// // // const { Student } = require("./models/Student");
// // // const lastUser = 'hildesimer'
// // // Lesson.remove({ user: lastUser }).then(console.log);
// // // Listening.remove({ user: lastUser }).then(console.log);
// // // Conf.remove({ user: lastUser }).then(console.log);
// // // Student.remove({ user: lastUser }).then(console.log);

// // // require('./models/Listening').Listening.remove({user:'shviley-beit-yaakov'}).then(console.log)

// // // require("./models/Listening")
// // //     .Listening.updateMany({ startTime: { $type: "string" } }, [
// // //         {
// // //             $set: {
// // //                 startDate: {
// // //                     $dateFromString: {
// // //                         dateString: {
// // //                             $concat: [{ $substr: [{ $dateToString: { date: "$date" } }, 0, 10] }, "T", "$startTime"],
// // //                         },
// // //                     },
// // //                 },
// // //             },
// // //         },
// // //         {
// // //             $set: {
// // //                 endDate: {
// // //                     $dateFromString: {
// // //                         dateString: {
// // //                             $concat: [{ $substr: [{ $dateToString: { date: "$date" } }, 0, 10] }, "T", "$endTime"],
// // //                         },
// // //                     },
// // //                 },
// // //             },
// // //         },
// // //     ])
// // //     .then(console.log);

// // // require("./models/Listening").Listening.updateMany({startTime: { $type: "string" }}, [
// // //     {
// // //         $set: {
// // //             startTime: "$startDate",
// // //         },
// // //     },
// // //     {
// // //         $set: {
// // //             endTime: "$endDate",
// // //         },
// // //     },
// // // ]).then(console.log);

// // // require("./models/Listening")
// // //     .Listening.updateMany({}, [
// // //         {
// // //             $unset: ["startDate", "endDate"],
// // //         },
// // //     ])
// // //     .then(console.log);

// // const path = "C:/Users/Home/Downloads/LogPlaybackPlayStop.2020-09.ymgr";
// // const readLine = require("readline");
// // const moment = require("moment");
// // const { Listening } = require("./../models/Listening");
// // const limit = 100;
// // const user = { name: "testing" };
// // const fullPath = "kjljk";
// // var LineByLineReader = require("line-by-line");

// // // var lineReader = require("line-reader");

// // // var eachLine = function (filename, options, iteratee) {
// // //     return new Promise(function (resolve, reject) {
// // //         lineReader.eachLine(filename, options, iteratee, function (err) {
// // //             if (err) {
// // //                 reject(err);
// // //             } else {
// // //                 resolve();
// // //             }
// // //         });
// // //     });
// // // };
// // // const arr = [];
// // // eachLine(path, async function (line) {
// // //     const item = {
// // //         user: user.name,
// // //         fileName: fullPath,
// // //     };
// // //     line.split("%").forEach((pair) => {
// // //         const [key, value] = pair.split("#");
// // //         item[key] = getValue(key, value, item);
// // //     });
// // //     arr.push(item);
// // //     console.log(arr.length);
// // //     if (arr.length === limit) {
// // //         const items = arr.map(getItem);
// // //         const resp = await Listening.insertMany(items);
// // //         console.log("saved", resp, arr);
// // //         throw "err";
// // //     } else {
// // //         return false;
// // //     }
// // // })
// // //     .then(function () {
// // //         console.log("done");
// // //     })
// // //     .catch(function (err) {
// // //         console.error(err);
// // //     });

// // // //     lr = new LineByLineReader(path);

// // // // lr.on("error", function (err) {
// // // //     console.log("error", err);
// // // // });
// // // // const arr = [];
// // // // lr.on("line", async function (line) {
// // // //     if (arr.length === limit) {
// // // //         lr.pause();
// // // //         const items = arr.map(getItem);
// // // //         const resp = await Listening.insertMany(items);
// // // //         console.log("saved", resp, arr);
// // // //         lr.close();
// // // //     } else if (arr.length < limit) {
// // // //         const item = {
// // // //             user: user.name,
// // // //             fileName: fullPath,
// // // //         };
// // // //         line.split("%").forEach((pair) => {
// // // //             const [key, value] = pair.split("#");
// // // //             item[key] = getValue(key, value, item);
// // // //         });
// // // //         arr.push(item);
// // // //         console.log(arr.length);
// // // //     }
// // // // });

// // // // lr.on("end", function () {
// // // //     console.log("end");
// // // // });

// // // // function parseYemotFile(user, fullPath) {
// // // //     return new Promise((resolve, reject) => {
// // // //         var arr = [];

// // // //         var lineReader = readLine.createInterface({
// // // //             input: require("fs").createReadStream(path),
// // // //         });

// // // //         lineReader.on("line", function (line) {
// // // //             if (arr.length === limit) {
// // // //                 Listening.insertMany(arr.map(getItem)).then(console.log);
// // // //             } else if (arr.length < limit) {
// // // //                 const item = {
// // // //                     user: user.name,
// // // //                     fileName: fullPath,
// // // //                 };
// // // //                 line.split("%").forEach((pair) => {
// // // //                     const [key, value] = pair.split("#");
// // // //                     item[key] = getValue(key, value, item);
// // // //                 });
// // // //                 arr.push(1);
// // // //                 console.log(arr.length);
// // // //             }
// // // //         });

// // // //         lineReader.on("close", function () {
// // // //             resolve(arr);
// // // //         });
// // // //     });
// // // }

// // // (async function a() {
// // //     try {
// // //         const lineReader = require("readline").createInterface({
// // //             input: require("fs").createReadStream(path),
// // //         });

// // //         const asyncIterator = require("p-event").iterator(lineReader, "line", {
// // //             resolutionEvents: ["close"],
// // //         });

// // //         for await (const line of asyncIterator) {
// // //             // console.log("Line from file:", line);
// // //             // const item = {
// // //             //     user: user.name,
// // //             //     fileName: fullPath,
// // //             // };
// // //             // line.split("%").forEach((pair) => {
// // //             //     const [key, value] = pair.split("#");
// // //             //     item[key] = getValue(key, value, item);
// // //             // });
// // //             // const doc = getItem(item);
// // //             // console.log(doc);
// // //             // const resp = await Listening.create(doc);
// // //             // console.log("saved", resp);

// // //         }
// // //     } catch (e) {
// // //         console.log(e);
// // //     } finally {
// // //         console.log("Finished");
// // //     }
// // // })()
// // //     .then(console.log)
// // //     .catch(console.log);

// // function getValue(key, value, item) {
// //     switch (key) {
// //         case "EnterDate":
// //             return moment.utc(value, "DD/MM/YYYY").toDate();
// //         case "EnterTime":
// //         case "ExitTime":
// //             return moment
// //                 .utc(item["EnterDate"].toISOString().slice(0, 10) + " " + value, "YYYY-MM-DD HH:mm:ss")
// //                 .toDate();
// //         case "PositionPlay":
// //         case "PositionStop":
// //         case "TimeTotal":
// //             return Number(value);
// //         default:
// //             return value;
// //     }
// // }

// // function getItem({
// //     user,
// //     fileName,
// //     Folder,
// //     Current,
// //     Phone,
// //     IdType,
// //     EnterId,
// //     ValName,
// //     EnterHebrewDate,
// //     EnterDate,
// //     EnterTime,
// //     PositionPlay,
// //     PositionStop,
// //     ExitTime,
// //     TimeTotal,
// // }) {
// //     return {
// //         user,
// //         extension: Folder,
// //         listening: Current,
// //         phone: Phone,
// //         identityType: IdType,
// //         identityNumber: EnterId,
// //         name: ValName,
// //         hebrew: EnterHebrewDate,
// //         date: EnterDate,
// //         startTime: EnterTime,
// //         endTime: ExitTime,
// //         startPoing: PositionPlay,
// //         endPoint: PositionStop,
// //         seconds: TimeTotal,
// //     };
// // }

// // // // parseYemotFile({ name: "testing" }, "test").then(console.log);

// // const doc = {
// //     user: 'testing',
// //     extension: '8/1/06/2/04',
// //     listening: '002',
// //     phone: '039445090',
// //     identityType: 'list_all_information',
// //     identityNumber: '215028523',
// //     name: 'י - 2 בצלאל איילת ',
// //     hebrew: 'י״ב אלול תש״פ',
// //     date: new Date('2020-08-31T00:00:00.000Z'),
// //     startTime: new Date('2020-08-31T23:59:40.000Z'),
// //     endTime: new Date('2020-08-31T00:00:04.000Z'),
// //     startPoing: 663380,
// //     endPoint: 686880,
// //     seconds: 24
// //   }
// //   console.log(doc)
// // Listening.create([doc]).then(console.log).catch(console.log)

// /*
//  * Requires the MongoDB Node.js Driver
//  * https://mongodb.github.io/node-mongodb-native
//  */

// const MongoClient = require("mongodb").MongoClient;
// const assert = require("assert");

// const agg = [
//     {
//         $match: {
//             user: "tiferet-sara",
//         },
//     },
//     {
//         $group: {
//             _id: "$Folder",
//         },
//     },
// ];

// MongoClient.connect(
//     "mongodb://myUserAdmin:1@188.34.183.27:27018/admin?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false",
//     { useNewUrlParser: true, useUnifiedTopology: true },
//     function (connectErr, client) {
//         assert.equal(null, connectErr);
//         const coll = client.db("vocal").collection("yemotplaybacks");
//         coll.aggregate(agg, (cmdErr, result) => {
//             assert.equal(null, cmdErr);
//             result.toArray().then((res) => {
//                 require("fs").writeFileSync("folders list for tiferet-sara", JSON.stringify(res, null, "\t"));
//                 client.close();
//             });
//         });
//     }
// );

// const MongoClient = require("mongodb").MongoClient;
// const assert = require("assert");
// const { fstat } = require("fs");

// /*
//  * Requires the MongoDB Node.js Driver
//  * https://mongodb.github.io/node-mongodb-native
//  */

// const agg = [
//     {
//         //     '$match': {
//         //       'user': {
//         //         '$ne': 'testing'
//         //       }
//         //     }
//         //   }, {
//         $group: {
//             _id: {
//                 user: "$user",
//                 fileName: "$fileName",
//                 enterId: "$EnterId",
//                 enterTime: "$EnterTime",
//             },
//             count: {
//                 $sum: 1,
//             },
//         },
//     },
//     {
//         $match: {
//             count: {
//                 $gt: 1,
//             },
//         },
//     },
//     {
//         $group: {
//             _id: {
//                 user: "$_id.user",
//                 fileName: "$_id.fileName",
//             },
//             count: {
//                 $sum: 1,
//             },
//         },
//     },
// ];

// MongoClient.connect(
//     "mongodb://myUserAdmin:1@188.34.183.27:27018/admin?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false",
//     { useNewUrlParser: true, useUnifiedTopology: true },
//     function (connectErr, client) {
//         assert.equal(null, connectErr);
//         const coll = client.db("vocal").collection("yemotplaybacks");
//         coll.aggregate(agg, { allowDiskUse: true }, (cmdErr, result) => {
//             assert.equal(null, cmdErr);
//             result
//                 .toArray()
//                 .then((res) => require("fs").writeFileSync("duplicate files", JSON.stringify(res, null, "\t")))
//                 .then(() => client.close());
//         });
//     }
// );

// async function main() {
//     await require("mongoose")
//         .connect("mongodb://myUserAdmin:1@188.34.183.27:27018/vocal?authSource=admin", {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//             useCreateIndex: true,
//             useFindAndModify: false,
//         })
//         .then(() => console.log("MongoDB Connected..."))
//         .catch((err) => console.log(err));

//     const { uploadFile } = require("./process-yemot-file");
//     const User = require("./../models/User").User;
//     const data = require("fs").readFileSync("duplicate files");
//     const json = JSON.parse(data);
//     for (const row of json) {
//         const user = row._id.user;
//         const userModel = await User.findOne({ name: user });
//         const fileType = row._id.fileName.includes("Playback") ? "LogPlaybackPlayStop" : "LogConfBridgeEnterExit";
//         console.log("start process", row);
//         await uploadFile(userModel, row._id.fileName, fileType);
//         console.log("end process", row);
//     }
// }

// main().then(console.log).catch(console.log);

// const bcrypt = require("bcrypt");
// const saltRounds = 10;

// bcrypt.genSalt(saltRounds, function (err, salt) {
//     if (err) return next(err);

//     bcrypt.hash('035584675', salt, function (err, hash) {
//         if (err) return next(err);
//        console.log(hash)
//         next();
//     });
// });