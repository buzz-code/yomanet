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
    title: "שיחות לפי שעות ביממה",
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
            .group({ _id: { $hour: "$startTime" }, count: { $sum: 1 } })
            .sort({ _id: 1 });

        console.log(data);
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
