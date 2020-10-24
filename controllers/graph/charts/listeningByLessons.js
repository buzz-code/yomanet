const { getListOfPreviosDays } = require("../../../helpers/utils");
const { graphNumberOfDays } = require("../../../helpers/constants");
const { Listening } = require("../../../models/Listening");
const { Lesson } = require("../../../models/Lesson");

module.exports = {
    type: "bar",
    options: {
        tooltips: {
            enabled: true,
        },
        legend: false,
    },
    title: "השיעורים הכי פופולריים",
    getData: async function (filter) {
        const { user, klass } = filter;

        const query = [];
        const studentQuery = [];
        if (user) {
            query.push({ user });
            studentQuery.push({ user });
        }
        if (klass && klass.length)
            studentQuery.push({ fullName: new RegExp(`^(${klass.map((item) => item.value).join("|")}).*`) });

        if (studentQuery.length > 1) {
            const studentIds = await Student.find({ $and: studentQuery }, ["identityNumber"]).lean();
            query.push({ identityNumber: { $in: studentIds.map((item) => item.identityNumber) } });
        }

        const days = getListOfPreviosDays(graphNumberOfDays);
        query.push({ date: { $gte: days[0].toDate(), $lte: days[days.length - 1].toDate() } });

        const data = await Listening.aggregate()
            .match({ $and: query })
            .group({ _id: "$extension", count: { $sum: "$seconds" } })
            .sort({ count: -1 })
            .limit(10);

        const lessons = await Lesson.find({ extension: { $in: data.map((item) => item._id) } });
        const lessonByExt = {};
        lessons.forEach((item) => (lessonByExt[item.extension] = item.messageName));

        return {
            datasets: [
                {
                    data: data.map((item) => item.count).map((item) => Math.floor(item / 60)),
                    backgroundColor: "#563d7caa",
                },
            ],
            labels: data.map((item) => item._id).map((item) => lessonByExt[item] || item),
        };
    },
};
