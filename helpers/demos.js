const files = require("./files");
const validation = require("./validation");
const parsing = require("./parsing");
const normalizer = require("./normalizer");
const db = require("./db");

// url = "C:/Users/Home/Downloads/LogPlaybackPlayStop.2020-09-22.html";
// files
//     .readFile(url)
//     .then((content) => content.toString())
//     .then((content) => {
//         if (validation.fileIsUnique(content)) {
//             return parsing.parseHtml(content);
//         } else {
//             throw "file has already been added";
//         }
//     })
//     .then(normalizer.normalizeListening)
//     .then(db.saveListening)
//     .then(console.log)
//     .finally(console.log);

// const XLSX = require("xlsx");
// const url = "C:/Users/Home/Downloads/שיעורים וקודים.xlsx";
// const wb = XLSX.readFile(url);
// wb.SheetNames.forEach((n, i) => {
//     console.log(`Sheet #${i + 1}: ${n}`);
//     const ws = wb.Sheets[n];
//     console.log(XLSX.utils.sheet_to_json(ws, { header: ["שלוחה", "שם הודעה"] }));
// });


// wb.SheetNames.forEach((n, i) => {
//     console.log(`Sheet #${i + 1}: ${n}`);
//     const ws = wb.Sheets[n];
//     console.log(XLSX.utils.sheet_to_json(ws, { header: ["שלוחה", "שם הודעה"] }));
// });


db.saveLesson(parsing.parseLesson("C:/Users/Home/Downloads/שיעורים וקודים.xlsx")).then(console.log)
db.saveStudent(parsing.parseStudent("C:/Users/Home/Downloads/עותק של רשימת בנות ותעודות זהות.xlsx")).then(console.log)

