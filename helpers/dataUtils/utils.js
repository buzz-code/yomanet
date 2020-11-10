const { Lesson } = require("../../models/Lesson");

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
    lessons.forEach((item) => (lessonByExt[item.extension] = item.messageName));
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

async function setExtensionNames(results) {
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

module.exports = { getExtensions, getLessonByExt, getExtensionHeaders, setExtensionNames, getDataById };
