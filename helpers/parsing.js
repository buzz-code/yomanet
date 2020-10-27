const htmlParser = require("node-html-parser");
const XLSX = require("xlsx");
const readLine = require("readline");
const moment = require("moment");
const { Readable } = require("stream");
const yemotApi = require("./yemot");
const constants = require("./constants");

const parseListening = (content, user) => {
    let headers = constants.listeningHeaders;
    if (user.name === "seminar-wolf" || user.name === "seminar-hachadash") {
        headers = [...headers.slice(0, 6), { value: "instituteDesc", label: "תאור מוסד" }, ...headers.slice(6)];
    }

    // const keys = [];
    const data = [];
    const root = htmlParser.parse(content.toString());
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
                row[headers[index].value] = item.text;
            });
            data.push(row);
        });

    console.log("parsing finished");
    return data;
};

const parseConf = (content) => {
    // const keys = [];
    const data = [];
    const root = htmlParser.parse(content.toString());
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

function parseYemotFile(user, fullPath) {
    return new Promise(async (resolve, reject) => {
        var arr = [];
        const yemot = new yemotApi(user.yemotUsername, user.yemotPassword);
        const file = await yemot.exec("DownloadFile", { path: fullPath });

        var lineReader = readLine.createInterface(Readable.from([file.data]));

        lineReader.on("line", function (line) {
            const item = {
                user: user.name,
                fileName: fullPath,
            };
            line.split("%").forEach((pair) => {
                const [key, value] = pair.split("#");
                item[key] = getValue(key, value, item);
            });
            arr.push(item);
        });

        function getValue(key, value, item) {
            switch (key) {
                case "EnterDate":
                    return moment.utc(value, "DD/MM/YYYY").toDate();
                case "EnterTime":
                case "ExitTime":
                    return moment
                        .utc(item["EnterDate"].toISOString().slice(0, 10) + " " + value, "YYYY-MM-DD HH:mm:ss")
                        .toDate();
                case "PositionPlay":
                case "PositionStop":
                    return Number(value);
                case "TimeTotal":
                    const numValue = Number(value);
                    if (!Number.isNaN(numValue)) {
                        return numValue;
                    } else {
                        return (item["ExitTime"] - item["EnterTime"]) / 1000;
                    }
                default:
                    return value;
            }
        }

        lineReader.on("close", function () {
            resolve(arr);
        });
    });
}

module.exports = {
    parseListening,
    parseLesson,
    parseStudent,
    parseConf,
    parseYemotFile,
};
