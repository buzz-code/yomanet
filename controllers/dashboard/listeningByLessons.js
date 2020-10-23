const { getListOfPreviosDays } = require("../../helpers/utils");
const { dashboardNumberOfDays } = require("../../helpers/constants");
const { Listening } = require("../../models/Listening");
const { Lesson } = require("../../models/Lesson");

module.exports = {
    type: "bar",
    options: {
        tooltips: {
            enabled: true,
        },
    },
    getData: async function (user) {
        const days = getListOfPreviosDays(dashboardNumberOfDays);
        const dateFilter = { $gte: days[0].toDate(), $lte: days[days.length - 1].toDate() };

        const data = await Listening.aggregate()
            .match(user)
            .match({ date: dateFilter })
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
                    label: "השיעורים הכי פופולריים",
                    backgroundColor: "#563d7caa",
                },
            ],
            labels: data.map((item) => item._id).map((item) => lessonByExt[item] || item),
        };
    },
};
