const constants = require("../../helpers/constants");
const moment = require("moment");
const { Conf } = require("../../models/Conf");
const { Lesson } = require("../../models/Lesson");
const { Student } = require("../../models/Student");
const { getPagingConfig } = require("../../helpers/utils");

module.exports = {
    url: "/confByMegama",
    title: function (filter) {
        const { megama, lesson, fromDate, toDate } = filter;
        let title = "דוח ועידה למגמה ";
        title += megama.map((item) => item.label).join("");
        if (lesson && lesson.length) title += " לשיעורים " + lesson.map((item) => item.label).join(",");
        if (fromDate) title += " מתאריך " + moment.utc(fromDate).format("DD-MM-YYYY");
        if (toDate) title += " עד תאריך " + moment.utc(toDate).format("DD-MM-YYYY");
        return title;
    },
    query: async function (body, user) {
        const { megama, lesson, fromDate, toDate } = body;

        const query = [{ user: user.name }];
        const studentQuery = [{ user: user.name }];
        if (megama && megama.length)
            studentQuery.push({ megama: new RegExp(megama.map((item) => item.value).join("|")) });
        if (fromDate) query.push({ date: { $gte: moment.utc(fromDate).toDate() } });
        if (toDate) query.push({ date: { $lte: moment.utc(toDate).toDate() } });
        if (lesson && lesson.length) query.push({ extension: new RegExp(lesson.map((item) => item.value).join("|")) });

        return { query, studentQuery };
    },
    validate: async function (query, user, filter) {
        if (filter.megama && filter.megama.length) {
            return { isValid: true, errorMessage: null };
        }
        return { isValid: false, errorMessage: "חובה לבחור מגמה" };
    },
    data: async function (queries, page) {
        const { query, studentQuery } = queries;
        const students = await Student.find({ $and: studentQuery }, ["identityNumber", "name"], {
            ...getPagingConfig(page),
            sort: { name: 1 },
        }).lean();
        query.push({ identityNumber: { $in: students.map((item) => item.identityNumber) } });

        const aggregate = [
            { $match: { $and: query } },
            {
                $group: {
                    _id: { identityNumber: "$identityNumber", extension: "$extension" },
                    seconds: { $sum: "$seconds" },
                },
            },
            {
                $group: {
                    _id: { identityNumber: "$_id.identityNumber" },
                    items: { $addToSet: { extension: "$_id.extension", seconds: { $sum: "$seconds" } } },
                },
            },
            { $project: { tmp: { $arrayToObject: { $zip: { inputs: ["$items.extension", "$items.seconds"] } } } } },
            { $addFields: { "tmp.identityNumber": "$_id.identityNumber" } },
            { $replaceRoot: { newRoot: "$tmp" } },
        ];

        const confs = await Conf.aggregate(aggregate);
        const confById = {};
        confs.map((item) => (confById[item.identityNumber] = item));

        return students.map((item) => ({
            name: item.name,
            ...confById[item.identityNumber],
        }));
    },
    headers: async function (data) {
        const keys = new Set();
        data.forEach((item) => {
            for (const key in item) {
                keys.add(key);
            }
        });

        const lessons = await Lesson.find({ extension: { $in: [...keys] } });
        const lessonByExt = {};
        lessons.forEach((item) => (lessonByExt[item.extension] = item.messageName));

        const headers = [
            { label: "שם התלמידה", value: "name" },
            ...[...keys]
                .filter((item) => item !== "name" && item !== "identityNumber")
                .sort()
                .map((item) => ({ value: item, label: lessonByExt[item] || item, format: "sec2min" })),
        ];

        return headers;
    },
    count: async function (queries) {
        const { studentQuery } = queries;
        return await Student.count({ $and: studentQuery });
    },
};
