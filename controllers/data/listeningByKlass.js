const constants = require("../../helpers/constants");
const moment = require("moment");
const { Listening } = require("../../models/Listening");
const { Lesson } = require("../../models/Lesson");
const { getPagingConfig } = require("../../helpers/normalizer");

module.exports = {
    url: "/listeningByKlass",
    title: function () {
        return "נתוני האזנה לפי כיתה";
    },
    query: async function (body, user) {
        const { klass, fromDate, toDate } = body;

        const query = [{ user: user.name }];
        if (klass && klass.length)
            query.push({ name: new RegExp(`^(${klass.map((item) => item.value).join("|")}).*`) });
        if (fromDate) query.push({ date: { $gte: moment.utc(fromDate).toDate() } });
        if (toDate) query.push({ date: { $lte: moment.utc(toDate).toDate() } });

        const aggregate = [
            { $match: { $and: query } },
            {
                $group: {
                    _id: { name: "$name", extension: "$extension" },
                    seconds: { $sum: "$seconds" },
                },
            },
            {
                $group: {
                    _id: { name: "$_id.name" },
                    items: { $addToSet: { extension: "$_id.extension", seconds: { $sum: "$seconds" } } },
                },
            },
            { $project: { tmp: { $arrayToObject: { $zip: { inputs: ["$items.extension", "$items.seconds"] } } } } },
            { $addFields: { "tmp.name": "$_id.name" } },
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

        return results;
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
            { label: "שם התלמידה", value: "name", format: "nameWOKlass" },
            ...[...keys]
                .filter((item) => item !== "name")
                .sort()
                .map((item) => ({ value: item, label: lessonByExt[item] || item, format: "sec2min" })),
        ];

        return headers;
    },
    count: async function (query) {
        return await Listening.aggregate(query)
            .count("totalCount")
            .then((res) => (res && res.length && res[0].totalCount) || 0);
    },
};
