const constants = require("../../helpers/constants");
const moment = require("moment");
const { Conf } = require("../../models/Conf");
const { Lesson } = require("../../models/Lesson");
const { getPagingConfig } = require("../../helpers/normalizer");

module.exports = {
    url: "/confByKlass",
    title: "נתוני ועידה לפי כיתה",
    query: async function (body, user) {
        const { klass, fromDate, toDate } = body;

        const query = [{ user: user.name }];
        if (klass) query.push({ name: new RegExp(`^${klass}.*`) });
        if (fromDate) query.push({ date: { $gte: moment.utc(fromDate).toDate() } });
        if (toDate) query.push({ date: { $lte: moment.utc(toDate).toDate() } });

        return query;
    },
    validate: async function (query, user) {
        return query.length > 1;
    },
    data: async function (query, page) {
        const pagingConfig = getPagingConfig(page);

        const results = await Conf.aggregate([
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
            { $skip: pagingConfig.skip },
            { $limit: pagingConfig.limit },
        ]);

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
        return 0;
    },
};
