const constants = require("../../helpers/constants");
const moment = require("moment");
const { Listening } = require("../../models/Listening");
const { Lesson } = require("../../models/Lesson");
const { getPagingConfig } = require("../../helpers/normalizer");

module.exports = {
    url: "/listeningByKlassAndLesson",
    title: function () {
        return "נתוני האזנה לפי כיתה ומקצוע";
    },
    query: async function (body, user) {
        const { klass, lesson, fromDate, toDate } = body;

        const query = [{ user: user.name }];
        if (lesson && lesson.length) query.push({ extension: new RegExp(lesson.map((item) => item.value).join("|")) });
        if (klass && klass.length)
            query.push({ name: new RegExp(`^(${klass.map((item) => item.value).join("|")}).*`) });
        if (fromDate) query.push({ date: { $gte: moment.utc(fromDate).toDate() } });
        if (toDate) query.push({ date: { $lte: moment.utc(toDate).toDate() } });

        const aggregate = [
            { $match: { $and: query } },
            {
                $group: {
                    _id: { name: "$name", extension: "$extension", listening: "$listening" },
                    seconds: { $sum: "$seconds" },
                },
            },
            {
                $group: {
                    _id: { name: "$_id.name", extension: "$_id.extension" },
                    items: { $addToSet: { listening: "$_id.listening", seconds: { $sum: "$seconds" } } },
                },
            },
            { $project: { tmp: { $arrayToObject: { $zip: { inputs: ["$items.listening", "$items.seconds"] } } } } },
            { $addFields: { "tmp.name": "$_id.name", "tmp.extension": "$_id.extension" } },
            { $replaceRoot: { newRoot: "$tmp" } },
            { $sort: { name: 1 } },
        ];

        return aggregate;
    },
    validate: async function (query, user) {
        return query.length > 1;
    },
    data: async function (query, page) {
        const { skip, limit } = getPagingConfig(page);
        const pagingConfig = [{ $skip: skip }, { $limit: limit }];

        const results = await Listening.aggregate([...query, ...pagingConfig]);

        const extensions = new Set(results.map((item) => item.extension));
        const lessons = await Lesson.find({ extension: { $in: [...extensions] } });
        const lessonByExt = {};
        lessons.forEach((item) => (lessonByExt[item.extension] = item.messageName));
        results.forEach((item) => (item.extension = lessonByExt[item.extension] || item.extension));

        return results;
    },
    headers: async function (data, query, body) {
        const keys = new Set();
        data.forEach((item) => {
            for (const key in item) {
                keys.add(key);
            }
        });

        const headers = [
            { label: "שם התלמידה", value: "name", format: body.klass ? "nameWOKlass" : null },
            { label: "שם השיעור", value: "extension" },
            ...[...keys]
                .filter((item) => item !== "name" && item !== "extension")
                .sort()
                .map((item) => ({ value: item, label: item, format: "sec2min" })),
        ];

        return headers;
    },
    count: async function (query) {
        return await Listening.aggregate(query)
            .count("totalCount")
            .then((res) => (res && res.length && res[0].totalCount) || 0);
    },
};
