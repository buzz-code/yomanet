const { YemotPlayback } = require("../../../models/YemotPlayback");
const { YemotFile } = require("../../../models/YemotFile");
const { YemotConfBridge } = require("../../../models/YemotConfBridge");
const { YemotPlayDir } = require("../../../models/YemotPlayDir");
const moment = require("moment");
const { getYedaController } = require("../../../helpers/data-providers/yeda");

const models = {
    LogPlaybackPlayStop: YemotPlayback,
    LogConfBridgeEnterExit: YemotConfBridge,
    LogPlayDirTimeEnterExit: YemotPlayDir,
};

const downloadFile = async (username, password, url, path) => {
    const controller = await getYedaController(username, password);
    const { data } = await controller.downloadFile(url, path);
    return data;
};

const processFile = async (data, fileType, defaultItem, options) => {
    const arr = [];
    let index = 0;
    for await (const line of data) {
        arr.push(mapItem(line, defaultItem));
        index++;

        if (arr.length === 3000) {
            await saveAndClear(arr, fileType, options, defaultItem, index);
        }
    }
    await saveAndClear(arr, fileType, options, defaultItem, index);
};

const mapItem = (
    {
        id,
        class_name,
        class_path,
        record_name,
        user_id,
        user_name,
        user_class,
        tz,
        id_mosad,
        caller_id,
        create_date,
        end_date,
        duration,
        record_duration,
    },
    { user, fileName }
) => {
    if (!tz || !user_id) {
        return null;
    }

    const EnterTime = moment.utc(create_date, "YYYY-MM-DD HH:mm:ss");
    const ExitTime = moment.utc(end_date, "YYYY-MM-DD HH:mm:ss");
    const EnterDate = moment.utc(EnterTime).startOf("day");
    const TimeTotal = moment.utc(duration, "HH:mm:ss").diff(moment.utc().startOf("day"), "seconds");
    const FileLength = moment.utc(record_duration, "HH:mm:ss").diff(moment.utc().startOf("day"), "seconds");

    return {
        user,
        fileName,
        title: class_name,
        Folder: class_path,
        Current: record_name,
        Phone: caller_id,
        EnterId: tz,
        ValName: user_name,
        EnterDate,
        EnterTime,
        ExitTime,
        TimeTotal,
        FileLength,
    };
};

const saveAndClear = async (arr, fileType, options, defaultItem, index) => {
    await models[fileType].insertMany(arr, options);
    arr.length = 0;
    console.log("save yeda file data for ", defaultItem, fileType, index);
};

async function uploadFile(user, { url, yedaUrl, fileType }, fullPath) {
    await YemotFile.deleteMany({ user: user.name, fullPath: fullPath + url });
    await YemotFile.create({
        user: user.name,
        fileName: fullPath,
        fullPath: fullPath + url,
        status: "בטעינה",
    });
    const defaultItem = { user: user.name, fileName: fullPath + url };
    await models[fileType].deleteMany(defaultItem);

    // const session = await YemotFile.startSession();
    // session.startTransaction();

    try {
        const opts = {}; //{ session };
        console.log("start processing yeda file", defaultItem);

        const data = await downloadFile(user.providerUsername, user.providerPassword, yedaUrl, fullPath);
        await processFile(data, fileType, defaultItem, opts);
        await YemotFile.findOneAndUpdate(
            { user: user.name, fullPath: fullPath + url },
            { $set: { status: "נטען בהצלחה" } },
            opts
        );
        console.log("finish processing yeda file", defaultItem);

        // await session.commitTransaction();
        // session.endSession();
    } catch (err) {
        console.log("error processing yeda file", defaultItem, err);

        // await session.abortTransaction();
        // session.endSession();

        await YemotFile.findOneAndUpdate(
            { user: user.name, fullPath: fullPath + url },
            { $set: { status: "טעינה נכשלה" } }
        );
    }
}

module.exports = { uploadFile };
