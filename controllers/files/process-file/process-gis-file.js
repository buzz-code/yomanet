const { YemotPlayback } = require("../../../models/YemotPlayback");
const { YemotFile } = require("../../../models/YemotFile");
const { YemotConfBridge } = require("../../../models/YemotConfBridge");
const readline = require("readline");
const fs = require("fs");
const path = require("path");
const tmp = require("tmp");
const moment = require("moment");
const XLSX = require("xlsx");
const { doYemotAction } = require("../../../helpers/yemot");
const constants = require("../../../helpers/constants");

const models = {
    LogPlaybackPlayStop: YemotPlayback,
    LogConfBridgeEnterExit: YemotConfBridge,
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
    const wb = XLSX.read(path, { type: "file", raw: true });
    const ws = wb.Sheets[wb.SheetNames[0]];
    const lines = XLSX.utils.sheet_to_json(ws);

    const arr = lines.map((item) => getItemFromLine(item, defaultItem));

    await saveAndClear(arr, fileType, options, defaultItem, arr.length);
};

const getItemFromLine = (
    { caller_id_number, caller_id_name, join_time, leave_time, length, date, conference_session_uuid, conference_uuid },
    { user, fileName }
) => {
    if (!caller_id_number || !caller_id_name) {
        return null;
    }

    const [Phone, ValName] = caller_id_name.split(" * ");
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

        const tempPath = fullPath; // await downloadFile(user.yemotUsername, user.yemotPassword, user.yemotIsPrivate, fullPath);
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
