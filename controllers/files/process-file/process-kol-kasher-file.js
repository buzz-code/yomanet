const { YemotPlayback } = require("../../../models/YemotPlayback");
const { YemotFile } = require("../../../models/YemotFile");
const { YemotConfBridge } = require("../../../models/YemotConfBridge");
const { YemotPlayDir } = require("../../../models/YemotPlayDir");
const readline = require("readline");
const fs = require("fs");
const path = require("path");
const tmp = require("tmp");
const moment = require("moment");
const iconv = require("iconv-lite");
const { getFtpClient } = require("../../../helpers/data-providers/ftp");

const models = {
    LogPlaybackPlayStop: YemotPlayback,
    LogConfBridgeEnterExit: YemotConfBridge,
    LogPlayDirTimeEnterExit: YemotPlayDir,
};

const downloadFile = async (username, password, path) => {
    const client = await getFtpClient("kol-kasher", username, password);
    const name = tmp.tmpNameSync();
    await client.downloadTo(name, path);
    client.close();
    return name;
};

const readFile = async (path, fileType, defaultItem, options) => {
    const rl = readline.createInterface({
        input: fs.createReadStream(path).pipe(iconv.decodeStream("win1255")),
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
    enter_time,
    phone,
    folder,
    file_name,
    current,
    seconds,
    identifier,
    tz,
    first_name,
    last_name,
    klass,
]) => {
    if (isNaN(Number(seconds))) {
        return null
    }

    const TimeTotal = Number(seconds);
    const EnterTime = moment.utc(enter_time, "DD/MM/YYYY HH:mm:ss");
    const EnterDate = moment.utc(enter_time, "DD/MM/YYYY HH:mm:ss").startOf('day');
    const ExitTime = EnterTime.add(TimeTotal, 'seconds');

    return {
        user,
        fileName,
        Folder: folder,
        Current: current,
        Phone: phone,
        EnterId: tz,
        ValName: last_name + ' ' + first_name,
        EnterDate: EnterDate.toDate(),
        EnterTime: EnterTime.toDate(),
        ExitTime: ExitTime.toDate(),
        TimeTotal,
        LessonTitle: file_name,
    };
};

const saveAndClear = async (arr, fileType, options, defaultItem, index) => {
    // await YemotPlayback.insertMany(arr, options);
    console.log(arr);
    throw 'err'
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
    await YemotPlayback.deleteMany({ user: user.name, fileName: fullPath });

    // const session = await YemotFile.startSession();
    // session.startTransaction();
    const defaultItem = { user: user.name, fileName: fullPath };

    try {
        const opts = {}; //{ session };
        console.log("start processing kol kasher file", defaultItem);

        // const tempPath = await downloadFile(user.providerUsername, user.providerPassword, fullPath);
        await readFile("C:/Users/Home/Downloads/דוח שיעורים נוות ישראל היסטוריה.csv", fileType, defaultItem, opts);
        await YemotFile.findOneAndUpdate({ user: user.name, fullPath }, { $set: { status: "נטען בהצלחה" } }, opts);
        console.log("finish processing kol kasher file", defaultItem);

        // await session.commitTransaction();
        // session.endSession();
    } catch (err) {
        console.log("error processing kol kasher file", defaultItem, err);

        // await session.abortTransaction();
        // session.endSession();

        await YemotFile.findOneAndUpdate({ user: user.name, fullPath }, { $set: { status: "טעינה נכשלה" } });
    }
}

module.exports = { uploadFile };

uploadFile({name:'nevat-3'}, 'דוח שיעורים נוות ישראל היסטוריה.csv')