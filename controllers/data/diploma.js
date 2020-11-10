const moment = require("moment");
const { YemotPlayback } = require("../../models/YemotPlayback");
const { Lesson } = require("../../models/Lesson");
const { Student } = require("../../models/Student");
const { getPagingConfig } = require("../../helpers/utils");
const titleUtil = require("./dataUtils/titleUtil");

module.exports = {
    url: "/diploma",
    title: function (filter) {
        return titleUtil.getTitle("תעודות", filter, titleUtil.singleKlass, titleUtil.lesson, titleUtil.dates);
    },
    query: async function (body, user) {
        const { klass, lesson, name, fromDate, toDate } = body;

        const query = [{ user: user.name }];
        const studentQuery = [{ user: user.name }];
        if (klass && klass.length)
            studentQuery.push({ fullName: new RegExp(`^(${klass.map((item) => item.value).join("|")}).*`) });
        if (name) studentQuery.push({ name: new RegExp(name) });
        if (fromDate) query.push({ EnterDate: { $gte: moment.utc(fromDate).toDate() } });
        if (toDate) query.push({ EnterDate: { $lte: moment.utc(toDate).toDate() } });
        if (lesson && lesson.length) query.push({ Folder: new RegExp(lesson.map((item) => item.value).join("|")) });

        return { query, studentQuery };
    },
    validate: async function (query, user, filter) {
        if (filter.klass && filter.klass.length) {
            if (filter.format !== "PDF") {
                return { isValid: false, errorMessage: "להנפקת תעודות לחצו על הכפתור Pdf" };
            }
            return { isValid: true, errorMessage: null };
        }
        return { isValid: false, errorMessage: "חובה לבחור כיתה" };
    },
    data: async function (queries, page) {
        const { query, studentQuery } = queries;
        const students = await Student.find({ $and: studentQuery }, ["identityNumber", "name"], {
            ...getPagingConfig(page),
            sort: { name: 1 },
        }).lean();
        query.push({ EnterId: { $in: students.map((item) => item.identityNumber) } });

        const aggregate = [
            { $match: { $and: query } },
            {
                $group: {
                    _id: { EnterId: "$EnterId", Folder: "$Folder", Current: "$Current" },
                    TimeTotal: { $sum: "$TimeTotal" },
                },
            },
            {
                $group: {
                    _id: {
                        EnterId: "$_id.EnterId",
                        Folder: "$_id.Folder",
                    },
                    TimeTotal: { $sum: "$TimeTotal" },
                    Count: { $sum: 1 },
                },
            },
            {
                $group: {
                    _id: { EnterId: "$_id.EnterId" },
                    items: {
                        $addToSet: {
                            Folder: "$_id.Folder",
                            Stats: {
                                TimeTotal: "$TimeTotal",
                                Count: "$Count",
                            },
                        },
                    },
                },
            },
            { $project: { tmp: { $arrayToObject: { $zip: { inputs: ["$items.Folder", "$items.Stats"] } } } } },
            { $addFields: { "tmp.EnterId": "$_id.EnterId" } },
            { $replaceRoot: { newRoot: "$tmp" } },
        ];

        const listenings = await YemotPlayback.aggregate(aggregate);
        const listeningById = {};
        listenings.map((item) => (listeningById[item.EnterId] = item));

        return students.map((item) => ({
            name: item.name,
            ...listeningById[item.identityNumber],
        }));
    },
    headers: async function (data, query, filter, user) {
        const keys = new Set();
        data.forEach((item) => {
            for (const key in item) {
                keys.add(key);
            }
        });

        const lessons = await Lesson.find({ user: user.name, extension: { $in: [...keys] } }).lean();
        const lessonByExt = {};
        lessons.forEach((item) => (lessonByExt[item.extension] = item.messageName));

        if (filter.lesson && filter.lesson.length) {
            filter.lesson.forEach((item) => (lessonByExt[item.value] = item.label));
        }

        const headers = [...keys]
            .filter((item) => item !== "name" && item !== "EnterId")
            .sort()
            .map((item) => ({ value: item, label: lessonByExt[item] || item, format: "sec2min" }));

        return headers;
    },
    count: async function (queries) {
        const { studentQuery } = queries;
        return await Student.countDocuments({ $and: studentQuery });
    },
};
