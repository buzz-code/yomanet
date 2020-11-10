const constants = require("../../helpers/constants");
const moment = require("moment");
const { YemotConfBridge } = require("../../models/YemotConfBridge");
const { Lesson } = require("../../models/Lesson");
const { Student } = require("../../models/Student");
const { getPagingConfig } = require("../../helpers/utils");
const aggregateByKlassOrMegama = require("./dataUtils/aggregateByKlassOrMegama");
const titleUtil = require("../../helpers/titleUtil");
const queryUtil = require("../../helpers/queryUtil");
const { getExtensionHeaders } = require("./dataUtils/utils");

module.exports = {
    url: "/confByKlass",
    title: function (filter) {
        return titleUtil.getTitle("דוח ועידה", filter, titleUtil.singleKlass, titleUtil.lesson, titleUtil.dates);
    },
    query: async function (filter, user) {
        const query = queryUtil.getQuery(user, filter, queryUtil.dates, queryUtil.lesson);
        const studentQuery = queryUtil.getQuery(user, filter, queryUtil.klass);

        return { query, studentQuery };
    },
    validate: async function (query, user, filter) {
        if (filter.klass && filter.klass.length) {
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

        const confs = await YemotConfBridge.aggregate(aggregateByKlassOrMegama(query));
        const confById = {};
        confs.map((item) => (confById[item.EnterId] = item));

        return students.map((item) => ({
            name: item.name,
            ...confById[item.identityNumber],
        }));
    },
    headers: async function (data, query, filter, user) {
        const headers = [
            { label: "שם התלמידה", value: "name", format: "nameWOKlass" },
            ...getExtensionHeaders(user, data),
        ];

        return headers;
    },
    count: async function (queries) {
        const { studentQuery } = queries;
        return await Student.countDocuments({ $and: studentQuery });
    },
};
