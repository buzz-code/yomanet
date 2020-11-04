const { YemotPlayback } = require("../models/YemotPlayback");
const { YemotFile } = require("../models/YemotFile");
const { YemotConfBridge } = require("../models/YemotConfBridge");
const axios = require("axios");
const qs = require("querystring");
const readline = require("readline");
const fs = require("fs");
const path = require("path");
const tmp = require("tmp");
const moment = require("moment");

const models = {
    LogPlaybackPlayStop: YemotPlayback,
    LogConfBridgeEnterExit: YemotConfBridge,
};

const yemotUrl = (isPrivate) =>
    isPrivate ? "https://private.call2all.co.il/ym/api/" : "https://www.call2all.co.il/ym/api/";

const loginAndGetToken = async (username, password, isPrivateYemot) => {
    const parameters = { username, password };
    const data = qs.stringify(parameters);
    const res = await axios.get(yemotUrl(isPrivateYemot) + "Login?" + data);

    if (res.data && res.data.responseStatus !== "OK") {
        throw res.data.responseStatus + ": " + res.data.message;
    }

    return res.data.token;
};

const downloadFile = async (token, path, isPrivateYemot) => {
    const parameters = { token, path };
    const data = qs.stringify(parameters);
    const name = tmp.tmpNameSync();
    const res = await axios.get(yemotUrl(isPrivateYemot) + "DownloadFile?" + data, {
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
    const rl = readline.createInterface({
        input: fs.createReadStream(path),
        crlfDelay: Infinity,
    });
    const arr = [];

    for await (const line of processLine(rl, arr, fileType, defaultItem, options)) {
    }

    if (arr.length > 0) {
        saveAndClear(arr, fileType, options, defaultItem, arr.length);
    }
};

async function* processLine(rl, arr, fileType, defaultItem, options) {
    let index = 0;
    for await (const line of rl) {
        arr.push(getItemFromLine(line, defaultItem));
        index++;

        if (arr.length === 3000) {
            saveAndClear(arr, fileType, options, defaultItem, index);
        }
        yield index;
    }
}

const getItemFromLine = (line, defaultItem) => {
    const item = { ...defaultItem };
    line.split("%").forEach((pair) => {
        const [key, value] = pair.split("#");
        item[key] = getValue(key, value, item);
    });
    if (Object.keys(item).length < 10) {
        return null;
    }
    return item;
};

function getValue(key, value, item) {
    switch (key) {
        case "EnterDate":
            return moment.utc(value, "DD/MM/YYYY").toDate();
        case "EnterTime":
        case "ExitTime":
            if (item["EnterDate"] === undefined) {
                return null;
            }
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

const saveAndClear = async (arr, fileType, options, defaultItem, index) => {
    await models[fileType].create(arr, options);
    arr.length = 0;
    console.log("save yemot file data for ", defaultItem, fileType, index);
};

async function uploadFile(user, fullPath, fileType) {
    await YemotFile.deleteMany({ user: user.name, fullPath });
    await YemotFile.create({
        user: user.name,
        fileName: path.basename(fullPath),
        fullPath,
        status: "בטעינה",
    });
    await models[fileType].deleteMany({ user: user.name, fileName: fullPath });

    // const session = await YemotFile.startSession();
    // session.startTransaction();
    const defaultItem = { user: user.name, fileName: fullPath };

    try {
        const opts = {}; //{ session };
        console.log("start processing yemot file", defaultItem);

        const token = await loginAndGetToken(user.yemotUsername, user.yemotPassword, user.yemotIsPrivate);
        const tempPath = await downloadFile(token, fullPath, user.yemotIsPrivate);
        await readFile(tempPath, fileType, defaultItem, opts);
        await YemotFile.findOneAndUpdate({ user: user.name, fullPath }, { $set: { status: "נטען בהצלחה" } }, opts);
        console.log("finish processing yemot file", defaultItem);

        // await session.commitTransaction();
        // session.endSession();
    } catch (err) {
        console.log("error processing yemot file", defaultItem, err);

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
