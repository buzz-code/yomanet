const moment = require("moment");
const { YemotPlayback } = require("../../models/YemotPlayback");
const { Student } = require("../../models/Student");
const { getPagingConfig } = require("../../helpers/utils");

module.exports = {
    url: "/listeningByKlassPerStudent",
    title: function (filter) {
        const { klass, fromDate, toDate } = filter;
        let title = "דוח האזנה כללי לכיתה ";
        title += klass.map((item) => item.label).join("");
        if (fromDate) title += " מתאריך " + moment.utc(fromDate).format("DD-MM-YYYY");
        if (toDate) title += " עד תאריך " + moment.utc(toDate).format("DD-MM-YYYY");
        return title;
    },
    query: async function (body, user) {
        const { klass } = body;

        const query = [{ user: user.name }];
        if (klass && klass.length)
            query.push({ fullName: new RegExp(`^(${klass.map((item) => item.value).join("|")}).*`) });

        return { $and: query };
    },
    validate: async function (query, user, filter) {
        if (filter.klass && filter.klass.length) {
            return { isValid: true, errorMessage: null };
        }
        return { isValid: false, errorMessage: "חובה לבחור כיתה" };
    },
    data: async function (query, page, filter) {
        const { fromDate, toDate } = filter;

        const config = {
            ...getPagingConfig(page),
            sort: { name: 1 },
        };
        const students = await Student.find(query, null, config).lean();

        const match = [{ EnterId: { $in: students.map((item) => item.identityNumber) } }];
        if (fromDate) match.push({ EnterDate: { $gte: moment.utc(fromDate).toDate() } });
        if (toDate) match.push({ EnterDate: { $lte: moment.utc(toDate).toDate() } });

        const aggregate = [
            { $match: { $and: match } },
            {
                $group: {
                    _id: { EnterId: "$EnterId" },
                    TimeTotal: { $sum: "$TimeTotal" },
                },
            },
            { $addFields: { EnterId: "$_id.EnterId" } },
        ];
        const results = await YemotPlayback.aggregate(aggregate);

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
