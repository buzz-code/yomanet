const { getDateList } = require("../../../helpers/utils");
const { YemotPlayback } = require("../../../models/YemotPlayback");
const queryUtil = require("../../../helpers/dataUtils/queryUtil");

module.exports = {
    type: "line",
    options: {
        tooltips: {
            enabled: true,
        },
        legend: false,
    },
    title: "חיוגים יומיים למערכת",
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
            .group({ _id: "$EnterDate", count: { $sum: "$TimeTotal" } })
            .sort({ _id: 1 });

        return {
            datasets: [
                {
                    data: days
                        .map((day) => data.find((item) => day.isSame(item._id)))
                        .map((item) => (item ? item.count : 0))
                        .map((item) => Math.floor(item / 60)),
                    borderColor: "#563d7cd1",
                    fill: false,
                },
            ],
            labels: days.map((item) => item.format("DD/MM")),
        };
    },
};
