const express = require("express");
const router = express.Router();
const db = require("../helpers/db");
const constants = require("../helpers/constants");

router.get("/data", async function (req, res) {
    console.log(req.query);
    const { page, fromDate, toDate, klass, lesson, teacher, fromSeconds, toSeconds } = req.query;
    const listeningData = await db.getListeningData(
        Number(page),
        fromDate,
        toDate,
        klass,
        lesson,
        teacher,
        fromSeconds,
        toSeconds
    );
    const data = {
        title: "נתוני האזנה",
        data: listeningData,
        headers: constants.listeningTableHeaders,
        query: req.query,
    };
    res.render("data", data);
});

router.get("/getLessonList", async function (req, res) {
    const { term } = req.query;
    const data = await db.getLessonList(term);
    const items = data.map((item) => ({ id: item.extension, text: item.messageName }));
    res.send({ results: items });
});

router.get("/getTeacherList", async function (req, res) {
    const { term } = req.query;
    const data = await db.getTeacherList(term);
    const items = data.map((item) => ({ id: item.extension, text: item.messageName }));
    res.send({ results: items });
});

router.get("/getKlassList", async function (req, res) {
    const { term } = req.query;
    const data = await db.getKlassList(term);
    const items = data.map((item) => ({ id: item.extension, text: item.messageName }));
    res.send({ results: items });
});

module.exports = router;
