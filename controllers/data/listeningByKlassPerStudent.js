const moment = require("moment");
const { Listening } = require("../../models/Listening");
const { Student } = require("../../models/Student");
const { getPagingConfig } = require("../../helpers/normalizer");

module.exports = {
    url: "/listeningByKlassPerStudent",
    title: function (filter) {
        const { klass, fromDate, toDate } = filter;
        let title = "סך נתוני האזנה לפי תלמידה לכיתה ";
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
        return filter.klass && filter.klass.length;
    },
    data: async function (query, page, filter) {
        const { fromDate, toDate } = filter;

        const config = {
            ...getPagingConfig(page),
            sort: { name: 1 },
        };
        const students = await Student.find(query, null, config).lean();

        const match = [{ identityNumber: { $in: students.map((item) => item.identityNumber) } }];
        if (fromDate) match.push({ date: { $gte: moment.utc(fromDate).toDate() } });
        if (toDate) match.push({ date: { $lte: moment.utc(toDate).toDate() } });

        const aggregate = [
            { $match: { $and: match } },
            {
                $group: {
                    _id: { identityNumber: "$identityNumber", name: "$name" },
                    seconds: { $sum: "$seconds" },
                },
            },
            { $addFields: { identityNumber: "$_id.identityNumber", name: "$_id.name" } },
        ];
        const results = await Listening.aggregate(aggregate);

        return students
            .map((student) => results.find((item) => student.identityNumber === item._id.identityNumber))
            .map((item, index) => item || students[index])
            .map((item) => ({ identityNumber: item.identityNumber, name: item.name, seconds: item.seconds || 0 }));
    },
    headers: async function (data) {
        const headers = [
            { label: "מספר זהות", value: "identityNumber" },
            { label: "שם התלמידה", value: "name", format: "nameWOKlass" },
            { label: "דקות האזנה", value: "seconds", format: "sec2min" },
        ];

        return headers;
    },
    count: async function (query) {
        return Student.count(query);
    },
};
