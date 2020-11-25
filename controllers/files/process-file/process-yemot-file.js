const { YemotPlayback } = require("../../../models/YemotPlayback");
const { YemotFile } = require("../../../models/YemotFile");
const { YemotConfBridge } = require("../../../models/YemotConfBridge");
const { YemotPlayDir } = require("../../../models/YemotPlayDir");
const readline = require("readline");
const fs = require("fs");
const path = require("path");
const tmp = require("tmp");
const moment = require("moment");
const { doYemotAction } = require("../../../helpers/data-providers/yemot");

const models = {
    LogPlaybackPlayStop: YemotPlayback,
    LogConfBridgeEnterExit: YemotConfBridge,
    LogPlayDirTimeEnterExit: YemotPlayDir,
};

const downloadFile = async (username, password, isPrivateYemot, path) => {
    const { data } = await doYemotAction(
        username,
        password,
        isPrivateYemot,
        "DownloadFile",
        { path },
        { responseType: "stream" }
    );

    const name = tmp.tmpNameSync();
    data.pipe(fs.createWriteStream(name));
    return new Promise((resolve, reject) => {
        data.on("end", function () {
            resolve(name);
        });
        data.on("err", function (err) {
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
    let index = 0;
    for await (const line of rl) {
        arr.push(getItemFromLine(line, defaultItem));
        index++;

        if (arr.length === 3000) {
            await saveAndClear(arr, fileType, options, defaultItem, index);
        }
    }
    await saveAndClear(arr, fileType, options, defaultItem, index);
};

const getItemFromLine = (line, defaultItem) => {
    const item = { ...defaultItem };
    line.split("%").forEach((pair) => {
        const [key, value] = pair.split("#");
        item[key] = getValue(key, value, item);
    });
    if (Object.keys(item).length < 8) {
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
        case "FileLength":
            if (value) {
                return moment.utc(value, "H:m:s").diff(moment.utc().startOf("day"), "seconds");
            } else {
                return null;
            }
        case "File":
            item["Current"] = value;
            return value;
        default:
            return value;
    }
}

const saveAndClear = async (arr, fileType, options, defaultItem, index) => {
    await models[fileType].insertMany(arr, options);
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

        const tempPath = await downloadFile(
            user.providerUsername,
            user.providerPassword,
            user.providerIsPrivate,
            fullPath
        );
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
//     { name: "asdf", providerUsername: "033069265", providerPassword: "7525" },
//     "ivr2:Log/LogPlaybackPlayStop/LogPlaybackPlayStop.2020-10-28.ymgr",
//     "LogPlaybackPlayStop"
// ).then(() => console.log("done"));
