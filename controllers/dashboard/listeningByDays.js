const { getListOfPreviosDays } = require("../../helpers/utils");
const { dashboardNumberOfDays } = require("../../helpers/constants");
const { Listening } = require("../../models/Listening");

module.exports = {
    type: "line",
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
            .group({ _id: "$date", count: { $sum: 1 } })
            .sort({ _id: 1 });

        return {
            datasets: [
                {
                    data: days
                        .map((day) => data.find((item) => day.isSame(item._id)))
                        .map((item) => (item ? item.count : 0))
                        .map((item) => Math.floor(item / 60)),
                    label: "חיוגים יומיות למערכת",
                    borderColor: "#563d7cd1",
                    fill: false,
                },
            ],
            labels: days.map((item) => item.format("DD/MM")),
        };
    },
};
