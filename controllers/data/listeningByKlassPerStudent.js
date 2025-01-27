const moment = require("moment");
const { YemotPlayback } = require("../../models/YemotPlayback");
const { Student } = require("../../models/Student");
const { getPagingConfig } = require("../../helpers/utils");
const titleUtil = require("../../helpers/dataUtils/titleUtil");
const { getAggregateByKlassPerStudent } = require("../../helpers/dataUtils/aggregateUtil");
const queryUtil = require("../../helpers/dataUtils/queryUtil");

module.exports = {
    url: "/listeningByKlassPerStudent",
    title: function (filter) {
        return titleUtil.getTitle("דוח האזנה כללי", filter, titleUtil.singleKlass, titleUtil.dates);
    },
    query: async function (filter, user) {
        const query = queryUtil.getQuery(user, filter, queryUtil.klass);

        return { $and: query };
    },
    validate: async function (query, user, filter) {
        if (filter.klass && filter.klass.length) {
            return { isValid: true, errorMessage: null };
        }
        return { isValid: false, errorMessage: "חובה לבחור כיתה" };
    },
    data: async function (query, page, filter, user) {
        const { fromDate, toDate } = filter;

        const config = {
            ...getPagingConfig(page),
            sort: { name: 1 },
        };
        const students = await Student.find(query, null, config).lean();

        const match = [{ user: user.name }, { EnterId: { $in: students.map((item) => item.identityNumber) } }];
        if (fromDate) match.push({ EnterDate: { $gte: moment.utc(fromDate).toDate() } });
        if (toDate) match.push({ EnterDate: { $lte: moment.utc(toDate).toDate() } });

        const results = await YemotPlayback.aggregate(getAggregateByKlassPerStudent(match));

        return students
            .map((student) => results.find((item) => student.identityNumber === item.EnterId))
            .map((item, index) => ({ ...item, ...students[index] }))
            .map((item) => ({ identityNumber: item.identityNumber, name: item.name, TimeTotal: item.TimeTotal || 0 }));
    },
    headers: async function (data) {
        const headers = [
            { label: "מספר זהות", value: "identityNumber" },
            { label: "שם התלמידה", value: "name", format: "nameWOKlass" },
            { label: "דקות האזנה", value: "TimeTotal", format: "sec2min" },
        ];

        return headers;
    },
    count: async function (query) {
        return Student.countDocuments(query);
    },
};
