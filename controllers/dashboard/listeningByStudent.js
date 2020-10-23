const { getListOfPreviosDays } = require("../../helpers/utils");
const { dashboardNumberOfDays } = require("../../helpers/constants");
const { Listening } = require("../../models/Listening");
const { Student } = require("../../models/Student");

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
            .group({ _id: "$identityNumber", count: { $sum: "$seconds" } })
            .sort({ count: -1 })
            .limit(10);

        const students = await Student.find({ identityNumber: { $in: data.map((item) => item._id) } });
        const studentsById = {};
        students.forEach((item) => (studentsById[item.identityNumber] = item.name));

        return {
            datasets: [
                {
                    data: data.map((item) => item.count).map((item) => Math.floor(item / 60)),
                    label: "התלמידות החרוצות ביותר",
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
