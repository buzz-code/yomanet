const express = require("express");
const moment = require("moment");
const router = express.Router();
const db = require("../helpers/db");
const constants = require("../helpers/constants");
const { Listening } = require("../models/Listening");
const { Lesson } = require("../models/Lesson");
const { Student } = require("../models/Student");
const { auth } = require("../middleware/auth");

router.post("/data/listening", auth, async function (req, res) {
    console.log(req.body);
    const { page, fromDate, toDate, klass, lesson, teacher, fromSeconds, toSeconds } = req.body;

    const query = {};
    if (fromDate) query.date = { $gte: moment(fromDate).toDate() };
    if (toDate) query.date = { ...query.date, $lte: moment(toDate).toDate() };
    if (fromSeconds) query.seconds = { $gte: Number(fromSeconds) };
    if (toSeconds) query.seconds = { ...query.seconds, $lte: Number(toSeconds) };
    if (lesson) query.extension = Array.isArray(lesson) ? { $in: lesson } : lesson;
    if (klass) query.name = new RegExp(`^${klass}.*`);
    console.log(query);

    const results = await Listening.find(query, null, {
        skip: constants.pageSize * (page - 1),
        limit: constants.pageSize,
    });

    const totalCount = await Listening.count(query);

    const data = {
        title: "נתוני האזנה",
        results,
        totalCount,
        headers: constants.listeningTableHeaders,
        params: req.body,
    };
    res.send(data);
});

router.post("/data/lesson", auth, async function (req, res) {
    console.log(req.body);
    const { page, extension, messageName } = req.body;

    const query = {};
    if (extension) query.extension = new RegExp(`${extension}`);
    if (messageName) query.messageName = new RegExp(`${messageName}`);
    console.log(query);

    const results = await Lesson.find(query, null, {
        skip: constants.pageSize * (page - 1),
        limit: constants.pageSize,
    });

    const totalCount = await Lesson.count(query);

    const data = {
        title: "נתוני השיעורים",
        results,
        totalCount,
        headers: constants.lessonHeaders,
        params: req.body,
    };
    res.send(data);
});

router.post("/data/student", auth, async function (req, res) {
    console.log(req.body);
    const { page, identityNumber, name, grade, classNum } = req.body;

    const query = {};
    if (identityNumber) query.identityNumber = new RegExp(`${identityNumber}`);
    if (name) query.name = new RegExp(`${name}`);
    if (grade) query.grade = new RegExp(`${grade}`);
    if (classNum) query.classNum = new RegExp(`${classNum}`);
    console.log(query);

    const results = await Student.find(query, null, {
        skip: constants.pageSize * (page - 1),
        limit: constants.pageSize,
    });

    const totalCount = await Student.count(query);

    const data = {
        title: "נתוני הבנות",
        results,
        totalCount,
        headers: constants.studentHeaders,
        params: req.body,
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
