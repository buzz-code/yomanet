const htmlParser = require("node-html-parser");
const XLSX = require("xlsx");
const constants = require("./constants");

const parseListening = (htmlString) => {
    // const keys = [];
    const data = [];
    const root = htmlParser.parse(htmlString);
    const table = root.querySelector("table");

    // table
    //     .querySelector("thead")
    //     .querySelectorAll("th")
    //     .forEach((item) => keys.push(item.text));
    table
        .querySelector("tbody")
        .querySelectorAll("tr")
        .forEach((item) => {
            row = {};
            item.querySelectorAll("td").forEach(
                (item, index) => (row[constants.listeningHeaders[index].value] = item.text)
            );
            data.push(row);
        });

    console.log("parsing finished");
    return data;
};

const parseConf = (htmlString) => {
    // const keys = [];
    const data = [];
    const root = htmlParser.parse(htmlString);
    const table = root.querySelector("table");

    // table
    //     .querySelector("thead")
    //     .querySelectorAll("th")
    //     .forEach((item) => keys.push(item.text));
    table
        .querySelector("tbody")
        .querySelectorAll("tr")
        .forEach((item) => {
            row = {};
            item.querySelectorAll("td").forEach((item, index) => {
                row[constants.confHeaders[index].value] = item.text;
            });
            data.push(row);
        });

    console.log("parsing finished");
    return data;
};

const parseLesson = (content) => {
    const wb = XLSX.read(content, { type: "buffer" });
    const ws = wb.Sheets[wb.SheetNames[0]];
    const header = constants.lessonHeaders.map((item) => item.value);
    return XLSX.utils.sheet_to_json(ws, { header });
};

const parseStudent = (content) => {
    const wb = XLSX.read(content, { type: "buffer" });
    const ws = wb.Sheets[wb.SheetNames[0]];
    const header = constants.studentHeaders.map((item) => item.value);
    return XLSX.utils.sheet_to_json(ws, { header });
};

module.exports = {
    parseListening,
    parseLesson,
    parseStudent,
    parseConf,
};
