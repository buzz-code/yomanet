const constants = require("../../helpers/constants");
const { Lesson } = require("../../models/Lesson");
const { getPagingConfig } = require("../../helpers/utils");

module.exports = {
    url: "/lesson",
    title: function () {
        return "נתוני שיעורים";
    },
    query: async function (body, user) {
        const { extension, messageName, klass, megama } = body;

        const query = [{ user: user.name }];
        if (extension) query.push({ extension: new RegExp(extension) });
        if (messageName) query.push({ messageName: new RegExp(messageName) });
        if (klass && klass.length) query.push({ megama: new RegExp(klass.map((item) => item.label).join("|")) });
        if (megama && megama.length) query.push({ megama: new RegExp(megama.map((item) => item.value).join("|")) });

        return { $and: query };
    },
    validate: async function (query, user) {
        return { isValid: true, errorMessage: null };
    },
    data: async function (query, page) {
        return Lesson.find(query, null, { ...getPagingConfig(page), sort: { extension: 1 } }).lean();
    },
    headers: async function (data) {
        return constants.lessonHeaders;
    },
    count: async function (query) {
        return Lesson.countDocuments(query);
    },
};
