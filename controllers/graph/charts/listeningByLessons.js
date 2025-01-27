const { getDateList } = require("../../../helpers/utils");
const { YemotPlayback } = require("../../../models/YemotPlayback");
const queryUtil = require("../../../helpers/dataUtils/queryUtil");
const { getLessonByExt } = require("../../../helpers/dataUtils/utils");

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
        const { user, klass, fromDate, toDate } = filter;

        const query = [];
        const studentQuery = [];
        if (user) {
            query.push({ user });
            studentQuery.push({ user });
        }
        queryUtil.klass(filter, studentQuery);

        await queryUtil.filterStudents(query, studentQuery);

        const days = getDateList(fromDate, toDate);
        if (days.length === 0) {
            return { datasets: [], labels: [] };
        }
        query.push({ EnterDate: { $gte: days[0].toDate(), $lte: days[days.length - 1].toDate() } });

        const data = await YemotPlayback.aggregate()
            .match({ $and: query })
            .group({ _id: "$Folder", count: { $sum: "$TimeTotal" } })
            .sort({ count: -1 })
            .limit(10);

        const lessonByExt = await getLessonByExt(
            { name: user },
            data.map((item) => item._id)
        );

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
