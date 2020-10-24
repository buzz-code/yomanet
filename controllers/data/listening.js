const constants = require("../../helpers/constants");
const moment = require("moment");
const { Lesson } = require("../../models/Lesson");
const { Listening } = require("../../models/Listening");
const { Student } = require("../../models/Student");
const { getPagingConfig } = require("../../helpers/utils");

module.exports = {
    url: "/listening",
    title: function () {
        return "נתוני האזנה";
    },
    query: async function (body, user) {
        const { fromDate, toDate, klass, lesson, megama, name, fromSeconds, toSeconds } = body;

        const query = [{ user: user.name }];
        const studentQuery = [{ user: user.name }];
        if (fromDate) query.push({ date: { $gte: moment.utc(fromDate).toDate() } });
        if (toDate) query.push({ date: { $lte: moment.utc(toDate).toDate() } });
        if (fromSeconds) query.push({ seconds: { $gte: Number(fromSeconds) } });
        if (toSeconds) query.push({ seconds: { ...query.seconds, $lte: Number(toSeconds) } });
        if (lesson && lesson.length) query.push({ extension: new RegExp(lesson.map((item) => item.value).join("|")) });
        if (klass && klass.length)
            studentQuery.push({ fullName: new RegExp(`^(${klass.map((item) => item.value).join("|")}).*`) });
        if (megama && megama.length)
            studentQuery.push({ megama: new RegExp(megama.map((item) => item.value).join("|")) });
        if (name) query.push({ name: new RegExp(name) });

        if (studentQuery.length > 1) {
            const studentIds = await Student.find({ $and: studentQuery }, ["identityNumber"]).lean();
            query.push({ identityNumber: { $in: studentIds.map((item) => item.identityNumber) } });
        }

        return { $and: query };
    },
    validate: async function (query, user) {
        return true;
    },
    data: async function (query, page) {
        const results = await Listening.find(query, null, getPagingConfig(page)).lean();

        const extensions = new Set(results.map((item) => item.extension));
        const lessons = await Lesson.find({ extension: { $in: [...extensions] } }).lean();
        const lessonByExt = {};
        lessons.forEach((item) => (lessonByExt[item.extension] = item.messageName));
        results.forEach((item) => (item.extension = lessonByExt[item.extension] || item.extension));

        return results;
    },
    headers: async function (data) {
        return constants.listeningHeaders
            .filter((item) => item.value !== "identityType")
            .sort((item1, item2) => item1.order - item2.order);
    },
    count: async function (query) {
        return await Listening.count(query);
    },
};
