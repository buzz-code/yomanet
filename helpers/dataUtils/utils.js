const { Lesson } = require("../../models/Lesson");
const { LessonInstance } = require("../../models/LessonInstance");
const moment = require("moment");

const groupByField = {
    listening: "Current",
    conf: "EnterDate",
    record: "EnterDate",
};

function getExtensions(data) {
    const extensions = new Set();
    data.forEach((item) => {
        for (const key in item) {
            extensions.add(key);
        }
    });
    return extensions;
}

async function getLessonByExt(user, extensions) {
    const lessons = await Lesson.find({ user: user.name, extension: { $in: [...extensions] } }).lean();
    const lessonByExt = {};
    lessons.forEach((item) => (lessonByExt[item.extension] = item.displayName || item.messageName));
    return lessonByExt;
}

async function getExtensionHeaders(user, data) {
    const extensions = getExtensions(data);
    const lessonByExt = await getLessonByExt(user, extensions);

    return [...extensions]
        .filter((item) => item !== "name" && item !== "EnterId")
        .sort()
        .map((item) => ({ value: item, label: lessonByExt[item] || item, format: "sec2min" }));
}

async function setExtensionNames(results, user) {
    const extensions = new Set(results.map((item) => item.extension));
    const lessonByExt = await getLessonByExt(user, extensions);
    results.forEach((item) => (item.Folder = lessonByExt[item.Folder] || item.Folder));
}

async function getDataById(model, aggregate) {
    const data = await model.aggregate(aggregate);
    const dataById = {};
    data.map((item) => (dataById[item.EnterId] = item));
    return dataById;
}

async function getLessonInstancesForDiploma(lessonIds, user, { fromDate, toDate }, reportType) {
    const query = [{ user: user.name }];
    query.push({ Folder: { $in: [...lessonIds] } });
    query.push({ $or: [{ FileLength: { $gt: 0 } }, { LongestListening: { $gt: 0 } }] });
    query.push({ type: reportType });
    if (fromDate) query.push({ FirstListeningDate: { $gte: moment.utc(fromDate).toDate() } });
    if (toDate) query.push({ FirstListeningDate: { $lte: moment.utc(toDate).toDate() } });

    const lessonInstances = await LessonInstance.find({ $and: query }, [
        "Folder",
        groupByField[reportType],
        "FileLength",
        "LongestListening",
    ]).lean();
    const lengthByFolderAndCurrent = {};
    lessonIds.forEach(
        (id) =>
            (lengthByFolderAndCurrent[id] = lessonInstances
                .filter((item) => item.Folder === id)
                .map((item) => [item[groupByField[reportType]], item.FileLength || item.LongestListening]))
    );

    return lengthByFolderAndCurrent;
}

async function getLessonInstancesForKlassAndLesson(folder, keys, user, reportType) {
    const fileLengths = await LessonInstance.find(
        {
            user: user.name,
            Folder: folder,
            [groupByField[reportType]]: { $in: [...keys] },
            type: reportType,
        },
        [groupByField[reportType], "FileLength", "LongestListening"]
    ).lean();
    const fileLengthByKey = {};
    fileLengths.forEach(
        (item) => (fileLengthByKey[item[groupByField[reportType]]] = item.FileLength || item.LongestListening)
    );

    return fileLengthByKey;
}

module.exports = {
    getExtensions,
    getLessonByExt,
    getExtensionHeaders,
    setExtensionNames,
    getDataById,
    getLessonInstancesForDiploma,
    getLessonInstancesForKlassAndLesson,
};
