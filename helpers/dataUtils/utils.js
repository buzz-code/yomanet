const { Lesson } = require("../../models/Lesson");
const { LessonInstance } = require("../../models/LessonInstance");
const moment = require("moment");
const { getSec2Min } = require("../format");

const groupByField = {
    current: "Current",
    enterDate: "EnterDate",
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

async function getLessonInstancesForDiploma(lessonIds, user, { fromDate, toDate }, groupField, reportType) {
    const query = [{ user: user.name }];
    query.push({ Folder: { $in: [...lessonIds] } });
    query.push({ $or: [{ FileLength: { $gt: 0 } }, { LongestListening: { $gt: 0 } }] });
    // query.push({ type: reportType });
    if (fromDate) query.push({ FirstListeningDate: { $gte: moment.utc(fromDate).toDate() } });
    if (toDate) query.push({ FirstListeningDate: { $lte: moment.utc(toDate).toDate() } });

    const lessonInstances = await LessonInstance.find({ $and: query }, [
        "Folder",
        groupByField[groupField],
        "FileLength",
        "LongestListening",
    ]).lean();
    const lengthByFolderAndCurrent = {};
    lessonIds.forEach(
        (id) =>
            (lengthByFolderAndCurrent[id] = lessonInstances
                .filter((item) => item.Folder === id)
                .map((item) => [item[groupByField[groupField]], item.FileLength || item.LongestListening]))
    );

    return lengthByFolderAndCurrent;
}

async function getLessonInstancesForKlassAndLesson(folder, keys, user, groupField, reportType) {
    const fileLengths = await LessonInstance.find(
        {
            user: user.name,
            Folder: folder,
            [groupByField[groupField]]: { $in: [...keys] },
            // type: reportType,
        },
        [groupByField[groupField], "FileLength", "LongestListening", "LessonTitle", "FirstListeningDate"]
    ).lean();
    const fileLengthByKey = {};
    const lessonTitleByKey = {};
    const firstListeningByKey = {};
    fileLengths.forEach((item) => {
        const itemKey = item[groupByField[groupField]];
        fileLengthByKey[itemKey] = item.FileLength || item.LongestListening;
        lessonTitleByKey[itemKey] = item.LessonTitle;
        firstListeningByKey[itemKey] =
            item.FirstListeningDate && moment.utc(item.FirstListeningDate).format("DD/MM/YYYY");
    });

    return { fileLengthByKey, lessonTitleByKey, firstListeningByKey };
}

function getHeaderTitle(item, groupField, lessonObj, fileLengthByKey, lessonTitleByKey, firstListeningByKey) {
    const lessonName = lessonObj ? (lessonObj.displayName || lessonObj.messageName) + " " : "";

    let title = lessonName;
    if (lessonTitleByKey[item]) {
        if (groupField === "enterDate") {
            title += lessonTitleByKey[item];
        } else {
            title += `${lessonTitleByKey[item]} (${item})`;
        }
    } else if (groupField !== "enterDate") {
        title += item;
    }
    return title + ` ${firstListeningByKey[item] || ""} - ${getSec2Min(fileLengthByKey[item])}`;
}

module.exports = {
    getExtensions,
    getLessonByExt,
    getExtensionHeaders,
    setExtensionNames,
    getDataById,
    getLessonInstancesForDiploma,
    getLessonInstancesForKlassAndLesson,
    getHeaderTitle,
};
