const express = require("express");
const router = express.Router();
const db = require("../helpers/db");
const constants = require("../helpers/constants");
const { Listening } = require("../models/Listening");

router.post("/data", async function (req, res) {
    console.log(req.body);
    const { page, fromDate, toDate, klass, lesson, teacher, fromSeconds, toSeconds } = req.body;

    const query = {};
    if (fromDate) query.date = { $gte: moment(fromDate).toDate() };
    if (toDate) query.date = { ...query.date, $lte: moment(toDate).toDate() };
    if (fromSeconds) query.seconds = { $gte: Number(fromSeconds) };
    if (toSeconds) query.seconds = { ...query.seconds, $lte: Number(toSeconds) };
    if (lesson) query.extension = Array.isArray(lesson) ? { $in: lesson } : lesson;
    if (klass) query.name = new RegExp(`/^${klass}/`);
    console.log(query);

    const listeningData = Listening.find(query)
        .skip(constants.pageSize * (page - 1))
        .limit(constants.pageSize)
        .toArray();

    const data = {
        title: "נתוני האזנה",
        results: listeningData,
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
