const express = require("express");
const router = express.Router();
const db = require("../helpers/db");
const constants = require("../helpers/constants");
const { Listening } = require("../models/Listening");
const { Lesson } = require("../models/Lesson");
const { Student } = require("../models/Student");

router.post("/data/listening", async function (req, res) {
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

    const listeningData = await Listening.find(query, null, {
        skip: constants.pageSize * (page - 1),
        limit: constants.pageSize,
    });

    const data = {
        title: "נתוני האזנה",
        results: listeningData,
        headers: constants.listeningTableHeaders,
        query: req.body,
    };
    res.send(data);
});
router.post("/data/lesson", async function (req, res) {
    console.log(req.body);
    const { page, fromDate, toDate, klass, lesson, teacher, fromSeconds, toSeconds } = req.body;

    const query = {};
    // if (fromDate) query.date = { $gte: moment(fromDate).toDate() };
    // if (toDate) query.date = { ...query.date, $lte: moment(toDate).toDate() };
    // if (fromSeconds) query.seconds = { $gte: Number(fromSeconds) };
    // if (toSeconds) query.seconds = { ...query.seconds, $lte: Number(toSeconds) };
    // if (lesson) query.extension = Array.isArray(lesson) ? { $in: lesson } : lesson;
    // if (klass) query.name = new RegExp(`/^${klass}/`);
    // console.log(query);

    const lessonData = await Lesson.find(query, null, {
        skip: constants.pageSize * (page - 1),
        limit: constants.pageSize,
    });

    const data = {
        title: "נתוני השיעורים",
        results: lessonData,
        headers: constants.lessonHeaders,
        query: req.body,
    };
    res.send(data);
});
router.post("/data/student", async function (req, res) {
    console.log(req.body);
    const { page, fromDate, toDate, klass, lesson, teacher, fromSeconds, toSeconds } = req.body;

    const query = {};
    // if (fromDate) query.date = { $gte: moment(fromDate).toDate() };
    // if (toDate) query.date = { ...query.date, $lte: moment(toDate).toDate() };
    // if (fromSeconds) query.seconds = { $gte: Number(fromSeconds) };
    // if (toSeconds) query.seconds = { ...query.seconds, $lte: Number(toSeconds) };
    // if (lesson) query.extension = Array.isArray(lesson) ? { $in: lesson } : lesson;
    // if (klass) query.name = new RegExp(`/^${klass}/`);
    // console.log(query);

    const studentData = await Student.find(query, null, {
        skip: constants.pageSize * (page - 1),
        limit: constants.pageSize,
    });

    const data = {
        title: "נתוני הבנות",
        results: studentData,
        headers: constants.studentHeaders,
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
