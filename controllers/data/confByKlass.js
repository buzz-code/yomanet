const constants = require("../../helpers/constants");
const moment = require("moment");
const { Conf } = require("../../models/Conf");
const { Lesson } = require("../../models/Lesson");
const { getPagingConfig } = require("../../helpers/normalizer");

module.exports = {
    url: "/confByKlass",
    title: function (filter) {
        const { klass, fromDate, toDate } = filter;
        let title = "נתוני ועידה לכיתה ";
        title += klass.map((item) => item.label).join("");
        if (fromDate) title += " מתאריך " + moment.utc(fromDate).format("DD-MM-YYYY");
        if (toDate) title += " עד תאריך " + moment.utc(toDate).format("DD-MM-YYYY");
        return title;
    },
    query: async function (body, user) {
        const { klass, fromDate, toDate } = body;

        const query = [{ user: user.name }];
        const studentQuery = [{ user: user.name }];
        if (klass && klass.length)
            studentQuery.push({ fullName: new RegExp(`^(${klass.map((item) => item.value).join("|")}).*`) });
        if (fromDate) query.push({ date: { $gte: moment.utc(fromDate).toDate() } });
        if (toDate) query.push({ date: { $lte: moment.utc(toDate).toDate() } });

        if (studentQuery.length > 1) {
            const studentIds = await Student.find({ $and: studentQuery }, ["identityNumber"]).lean();
            query.push({ identityNumber: { $in: studentIds.map((item) => item.identityNumber) } });
        }

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
    validate: async function (query, user, filter) {
        return filter.klass && filter.klass.length;
    },
    data: async function (query, page) {
        const { skip, limit } = getPagingConfig(page);
        const pagingConfig = [{ $skip: skip }, { $limit: limit }];

        const results = await Conf.aggregate([...query, ...pagingConfig]);

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
        return await Conf.aggregate(query)
            .count("totalCount")
            .then((res) => (res && res.length && res[0].totalCount) || 0);
    },
};
