const constants = require("../../helpers/constants");
const moment = require("moment");
const { Lesson } = require("../../models/Lesson");
const { YemotPlayback } = require("../../models/YemotPlayback");
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
        if (fromDate) query.push({ EnterDate: { $gte: moment.utc(fromDate).toDate() } });
        if (toDate) query.push({ EnterDate: { $lte: moment.utc(toDate).toDate() } });
        if (fromSeconds) query.push({ TimeTotal: { $gte: Number(fromSeconds) } });
        if (toSeconds) query.push({ TimeTotal: { ...query.seconds, $lte: Number(toSeconds) } });
        if (lesson && lesson.length) query.push({ Folder: new RegExp(lesson.map((item) => item.value).join("|")) });
        if (klass && klass.length)
            studentQuery.push({ fullName: new RegExp(`^(${klass.map((item) => item.value).join("|")}).*`) });
        if (megama && megama.length)
            studentQuery.push({ megama: new RegExp(megama.map((item) => item.value).join("|")) });
        if (name) query.push({ ValName: new RegExp(name) });

        if (studentQuery.length > 1) {
            const studentIds = await Student.find({ $and: studentQuery }, ["identityNumber"]).lean();
            query.push({ EnterId: { $in: studentIds.map((item) => item.identityNumber) } });
        }

        return { $and: query };
    },
    validate: async function (query, user) {
        return { isValid: true, errorMessage: null };
    },
    data: async function (query, page, filter, user) {
        const results = await YemotPlayback.find(query, null, getPagingConfig(page)).lean();

        const extensions = new Set(results.map((item) => item.extension));
        const lessons = await Lesson.find({ user: user.name, extension: { $in: [...extensions] } }).lean();
        const lessonByExt = {};
        lessons.forEach((item) => (lessonByExt[item.extension] = item.messageName));
        results.forEach((item) => (item.Folder = lessonByExt[item.Folder] || item.Folder));

        return results;
    },
    headers: async function (data) {
        return constants.yemotPlaybackHeaders;
    },
    count: async function (query) {
        return await YemotPlayback.countDocuments(query);
    },
};
