const { YemotPlayback } = require("../../../models/YemotPlayback");
const { YemotFile } = require("../../../models/YemotFile");
const { YemotConfBridge } = require("../../../models/YemotConfBridge");
const { YemotPlayDir } = require("../../../models/YemotPlayDir");
const readline = require("readline");
const fs = require("fs");
const path = require("path");
const tmp = require("tmp");
const moment = require("moment");
const XLSX = require("xlsx");
const { getFtpClient } = require("../../../helpers/data-providers/ftp");
const constants = require("../../../helpers/constants");

const models = {
    LogPlaybackPlayStop: YemotPlayback,
    LogConfBridgeEnterExit: YemotConfBridge,
    LogPlayDirTimeEnterExit: YemotPlayDir,
};

const downloadFile = async (username, password, path) => {
    const client = await getFtpClient("gis", username, password);
    const name = tmp.tmpNameSync();
    await client.downloadTo(name, path);
    client.close();
    return name;
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
    const item = Object.values(defaultItem);
    line.split(",").forEach((value, index) => {
        item.push(value.replace(/"/g, ""));
    });
    return mapItem(item);
};

const mapItem = ([
    user,
    fileName,
    caller_id_number,
    caller_id_name,
    join_time,
    leave_time,
    length,
    date,
    conference_session_uuid,
    conference_uuid,
]) => {
    if (!caller_id_number || !caller_id_name || date === "date") {
        return null;
    }

    const [ValName, Phone] = caller_id_name.split(" * ");
    const EnterDate = moment.utc(date, "YYYY-MM-DD");
    const EnterTime = moment.utc(join_time, "YYYY-MM-DD HH:mm:ss");
    const ExitTime = moment.utc(leave_time, "YYYY-MM-DD HH:mm:ss");
    const TimeTotal = moment.utc(length, "HH:mm:ss").diff(moment.utc().startOf("day"), "seconds");

    return {
        user,
        fileName,
        Folder: conference_uuid,
        Current: conference_session_uuid,
        Phone,
        EnterId: caller_id_number,
        ValName,
        EnterDate,
        EnterTime,
        ExitTime,
        TimeTotal,
    };
};

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
        console.log("start processing gis file", defaultItem);

        const tempPath = await downloadFile(user.providerUsername, user.providerPassword, fullPath);
        await readFile(tempPath, fileType, defaultItem, opts);
        await YemotFile.findOneAndUpdate({ user: user.name, fullPath }, { $set: { status: "נטען בהצלחה" } }, opts);
        console.log("finish processing gis file", defaultItem);

        // await session.commitTransaction();
        // session.endSession();
    } catch (err) {
        console.log("error processing gis file", defaultItem, err);

        // await session.abortTransaction();
        // session.endSession();

        await YemotFile.findOneAndUpdate({ user: user.name, fullPath }, { $set: { status: "טעינה נכשלה" } });
    }
}

module.exports = { uploadFile };
