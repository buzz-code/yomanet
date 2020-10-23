const { getListOfPreviosDays } = require("../../../helpers/utils");
const { graphNumberOfDays } = require("../../../helpers/constants");
const { Listening } = require("../../../models/Listening");

module.exports = {
    type: "line",
    options: {
        tooltips: {
            enabled: true,
        },
        legend: false,
    },
    title: "חיוגים יומיות למערכת",
    getData: async function (filter) {
        const { user, klass } = filter;
        const query = [];
        if (user) query.push({ user });
        if (klass && klass.length)
            query.push({ name: new RegExp(`^(${klass.map((item) => item.value).join("|")}).*`) });

        const days = getListOfPreviosDays(graphNumberOfDays);
        query.push({ date: { $gte: days[0].toDate(), $lte: days[days.length - 1].toDate() } });

        const data = await Listening.aggregate()
            .match({ $and: query })
            .group({ _id: "$date", count: { $sum: 1 } })
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
