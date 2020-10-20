const express = require("express");
const router = express.Router();
const moment = require("moment");
const { User } = require("../models/User");
const { Listening } = require("../models/Listening");
const { Lesson } = require("../models/Lesson");
const { Student } = require("../models/Student");
const { dashboardNumberOfDays } = require("../helpers/constants");

const listeningByDays = {
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
const listeningByLessons = {
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
const listeningByStudent = {
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

const charts = [listeningByDays, listeningByLessons, listeningByStudent];

router.get("/", function (req, res) {
    let token = req.cookies.w_auth;
    User.findByToken(token, async (err, user) => {
        if (err) throw err;
        const userName = user ? user.name : undefined;
        const dashboardData = await getDashboardData(userName);
        res.send(dashboardData);
    });
});

function getDashboardData(user) {
    console.log(user);
    return Promise.all(
        charts.map(async (item) => {
            const data = await item.getData(user ? { user } : {});
            return {
                ...item,
                data,
            };
        })
    );
}

function getListOfPreviosDays(count) {
    const today = moment.utc().startOf("day");
    let firstDay = moment(today).subtract(count, "day");
    const days = [];
    while (firstDay.isSameOrBefore(today)) {
        days.push(firstDay);
        firstDay = moment(firstDay).add(1, "day");
    }
    return days;
}

module.exports = router;
