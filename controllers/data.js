const express = require("express");
const router = express.Router();
const db = require("../helpers/db");
const constants = require("../helpers/constants");

router.get("/data", async function (req, res) {
    console.log(req.query);
    const { page, dateRange, klass, lesson, teacher, seconds } = req.query;
    const listeningData = await db.getListeningData(Number(page), dateRange, klass, lesson, teacher, seconds);
    const data = {
        title: "Data",
        data: listeningData,
        headers: constants.listeningTableHeaders,
    };
    res.render("data", data);
});

module.exports = router;
