const { getDateList } = require("../../../helpers/utils");
const { YemotPlayback } = require("../../../models/YemotPlayback");
const { Student } = require("../../../models/Student");

module.exports = {
    type: "line",
    options: {
        tooltips: {
            enabled: true,
        },
        legend: false,
    },
    title: "שיחות לפי שעות ביממה",
    getData: async function (filter) {
        const { user, klass, fromDate, toDate } = filter;

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
            query.push({ EnterId: { $in: studentIds.map((item) => item.identityNumber) } });
        }

        const days = getDateList(fromDate, toDate);
        if (days.length === 0) {
            return { datasets: [], labels: [] };
        }
        query.push({ EnterDate: { $gte: days[0].toDate(), $lte: days[days.length - 1].toDate() } });

        const data = await YemotPlayback.aggregate()
            .match({ $and: query })
            .group({ _id: { $hour: "$EnterTime" }, count: { $sum: 1 } })
            .sort({ _id: 1 });

        const hours = [...Array(24).keys()];

        return {
            datasets: [
                {
                    data: hours
                        .map((hour) => data.find((item) => item._id === hour))
                        .map((item) => (item ? item.count : 0)),
                    borderColor: "#563d7cd1",
                    fill: false,
                },
            ],
            labels: hours.map((hour) => (hour < 10 ? "0" + hour : hour)),
        };
    },
};
