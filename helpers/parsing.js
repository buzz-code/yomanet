const htmlParser = require("node-html-parser");
const XLSX = require("xlsx");
const constants = require("./constants");

const parseListening = (htmlString) => {
    const keys = [];
    const data = [];
    const root = htmlParser.parse(htmlString);
    const table = root.querySelector("table");

    table
        .querySelector("thead")
        .querySelectorAll("th")
        .forEach((item) => keys.push(item.text));
    table
        .querySelector("tbody")
        .querySelectorAll("tr")
        .forEach((item) => {
            row = {};
            item.querySelectorAll("td").forEach((item, index) => (row[keys[index]] = item.text));
            data.push(row);
        });

    return data;
};

const parseLesson = (url) => {
    const wb = XLSX.readFile(url);
    const ws = wb.Sheets[wb.SheetNames[0]];
    return XLSX.utils.sheet_to_json(ws, { header: constants.lessonXslxHeaders });
};

const parseStudent = (url) => {
    const wb = XLSX.readFile(url);
    const ws = wb.Sheets[wb.SheetNames[0]];
    return XLSX.utils.sheet_to_json(ws, { header: constants.studentXslxHeaders });
};

module.exports = {
    parseListening,
    parseLesson,
    parseStudent,
};
