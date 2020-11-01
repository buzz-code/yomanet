const { getListOfPreviosDays } = require("../../../helpers/utils");
const { graphNumberOfDays } = require("../../../helpers/constants");
const { YemotPlayback } = require("../../../models/YemotPlayback");
const { Student } = require("../../../models/Student");

module.exports = {
    type: "bar",
    options: {
        tooltips: {
            enabled: true,
        },
        legend: false,
    },
    title: "התלמידות החרוצות ביותר",
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
            query.push({ EnterId: { $in: studentIds.map((item) => item.identityNumber) } });
        }

        const days = getListOfPreviosDays(graphNumberOfDays);
        query.push({ EnterDate: { $gte: days[0].toDate(), $lte: days[days.length - 1].toDate() } });

        const data = await Listening.aggregate()
            .match({ $and: query })
            .group({ _id: "$EnterId", count: { $sum: "$TimeTotal" } })
            .sort({ count: -1 })
            .limit(10);

        const students = await Student.find({ identityNumber: { $in: data.map((item) => item._id) } });
        const studentsById = {};
        students.forEach((item) => (studentsById[item.identityNumber] = item.name));

        return {
            datasets: [
                {
                    data: data.map((item) => item.count).map((item) => Math.floor(item / 60)),
                    lineTension: 0.1,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(75,192,192,1)",
                    borderCapStyle: "butt",
                    borderJoinStyle: "miter",
                    pointBorderColor: "rgba(75,192,192,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                },
            ],
            labels: data.map((item) => item._id).map((item) => studentsById[item] || item),
        };
    },
};
