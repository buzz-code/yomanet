const constants = require("../../helpers/constants");
const { Student } = require("../../models/Student");
const { getPagingConfig } = require("../../helpers/utils");

module.exports = {
    url: "/student",
    title: function () {
        return "נתוני תלמידים";
    },
    query: async function (body, user) {
        const { identityNumber, name, klass, megama } = body;

        const query = [{ user: user.name }];
        if (identityNumber) query.push({ identityNumber: new RegExp(identityNumber) });
        if (name) query.push({ name: new RegExp(name) });
        if (klass && klass.length)
            query.push({ fullName: new RegExp(`^(${klass.map((item) => item.value).join("|")}).*`) });
        if (megama && megama.length) query.push({ megama: new RegExp(megama.map((item) => item.value).join("|")) });

        return { $and: query };
    },
    validate: async function (query, user) {
        return { isValid: true, errorMessage: null };
    },
    data: async function (query, page) {
        return Student.find(query, null, { ...getPagingConfig(page), sort: { name: 1 } }).lean();
    },
    headers: async function (data) {
        return constants.studentHeaders;
    },
    count: async function (query) {
        return Student.countDocuments(query);
    },
};
