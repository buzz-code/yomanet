const { getListOfPreviosDays } = require("../../../helpers/utils");
const { graphNumberOfDays } = require("../../../helpers/constants");
const { Listening } = require("../../../models/Listening");
const { Student } = require("../../../models/Student");

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
            .group({ _id: "$date", count: { $sum: 1 } })
            .sort({ _id: 1 });

        return {
            datasets: [
                {
                    data: days
                        .map((day) => data.find((item) => day.isSame(item._id)))
                        .map((item) => (item ? item.count : 0)),
                    borderColor: "#563d7cd1",
                    fill: false,
                },
            ],
            labels: days.map((item) => item.format("DD/MM")),
        };
    },
};
