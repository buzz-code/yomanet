const { YemotPlayback } = require("../models/YemotPlayback");
const { YemotFile } = require("../models/YemotFile");
const { YemotConfBridge } = require("../models/YemotConfBridge");
const axios = require("axios");
const qs = require("querystring");
const fs = require("fs");
const path = require("path");
const tmp = require("tmp");
const byline = require("byline");
const moment = require("moment");

const models = {
    LogPlaybackPlayStop: YemotPlayback,
    LogConfBridgeEnterExit: YemotConfBridge,
};

const loginAndGetToken = async (username, password) => {
    const parameters = { username, password };
    const data = qs.stringify(parameters);
    const res = await axios.get("https://www.call2all.co.il/ym/api/Login?" + data);

    if (res.data && res.data.responseStatus !== "OK") {
        throw res.data.responseStatus + ": " + res.data.message;
    }

    return res.data.token;
};

const downloadFile = async (token, path) => {
    const parameters = { token, path };
    const data = qs.stringify(parameters);
    const name = tmp.tmpNameSync();
    const res = await axios.get("https://www.call2all.co.il/ym/api/DownloadFile?" + data, {
        maxContentLength: Infinity,
        responseType: "stream",
    });

    res.data.pipe(fs.createWriteStream(name));
    return new Promise((resolve, reject) => {
        res.data.on("end", function () {
            resolve(name);
        });
        res.data.on("err", function (err) {
            reject(err);
        });
    });
};

const readFile = async (path, fileType, defaultItem, options) => {
    var stream = fs.createReadStream(path);
    stream.setEncoding("utf8");
    stream = byline.createStream(stream);
    let index = 0;

    return new Promise((resolve, reject) => {
        stream.on("data", function (line) {
            stream.pause();
            console.log(index++);

            processLine(line, fileType, defaultItem, options)
                .then(() => stream.resume())
                .catch((err) => {
                    stream.destroy();
                    console.log(err);
                    reject();
                    return;
                });
        });
        stream.on("end", function () {
            resolve();
        });
    });
};

const processLine = async (line, fileType, defaultItem, options) => {
    const item = { ...defaultItem };
    line.split("%").forEach((pair) => {
        const [key, value] = pair.split("#");
        item[key] = getValue(key, value, item);
    });
    await models[fileType].create([item], options);
};

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

async function uploadFile(user, fullPath, fileType) {
    await YemotFile.deleteMany({ user: user.name, fullPath });
    await YemotFile.create({
        user: user.name,
        fileName: path.basename(fullPath),
        fullPath,
        status: "בטעינה",
    });

    // const session = await models[fileType].startSession();
    // session.startTransaction();

    try {
        const opts = {}; // { session };
        const defaultItem = { user: user.name, fileName: fullPath };

        const token = await loginAndGetToken(user.yemotUsername, user.yemotPassword);
        const tempPath = await downloadFile(token, fullPath);
        await readFile(tempPath, fileType, defaultItem, opts);
        await YemotFile.findOneAndUpdate({ user: user.name, fullPath }, { $set: { status: "נטען בהצלחה" } }, opts);

        // await session.commitTransaction();
        // session.endSession();
    } catch (err) {
        console.log(err);

        // await session.abortTransaction();
        // session.endSession();

        await YemotFile.findOneAndUpdate({ user: user.name, fullPath }, { $set: { status: "טעינה נכשלה" } });
    }
}

module.exports = { uploadFile };

// uploadFile(
//     { name: "asdf", yemotUsername: "033069265", yemotPassword: "7525" },
//     "ivr2:Log/LogPlaybackPlayStop/LogPlaybackPlayStop.2020-10-28.ymgr",
//     "LogPlaybackPlayStop"
// ).then(() => console.log("done"));
