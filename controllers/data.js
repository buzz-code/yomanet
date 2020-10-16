const express = require("express");
const router = express.Router();
const db = require("../helpers/db");
const constants = require("../helpers/constants");

router.post("/data", async function (req, res) {
    console.log(req.body);
    const { page, fromDate, toDate, klass, lesson, teacher, fromSeconds, toSeconds } = req.body;
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
        listeningData,
        headers: constants.listeningTableHeaders,
        query: req.body,
    };
    res.send(data);
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
