const express = require("express");
const router = express.Router();
const { User } = require("../../models/User");

const charts = [
    require("./listeningByDays"),
    require("./listeningByLessons"), 
    require("./listeningByStudent"),
];

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

module.exports = router;
