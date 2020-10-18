const express = require("express");
const moment = require("moment");
const router = express.Router();
const constants = require("../helpers/constants");
const { Listening } = require("../models/Listening");
const { Lesson } = require("../models/Lesson");
const { Student } = require("../models/Student");
const { Conf } = require("../models/Conf");
const { auth } = require("../middleware/auth");
const { getTableDataResponse } = require("../helpers/normalizer");

router.post("/listening", auth, async function (req, res) {
    console.log(req.body);
    const { page, fromDate, toDate, klass, lesson, teacher, fromSeconds, toSeconds } = req.body;

    const query = { user: req.user.name };
    if (fromDate) query.date = { $gte: moment.utc(fromDate).toDate() };
    if (toDate) query.date = { ...query.date, $lte: moment.utc(toDate).toDate() };
    if (fromSeconds) query.seconds = { $gte: Number(fromSeconds) };
    if (toSeconds) query.seconds = { ...query.seconds, $lte: Number(toSeconds) };
    if (lesson && lesson.length) query.extension = new RegExp(lesson.map((item) => item.value).join("|"));
    if (klass && klass.length) query.name = new RegExp(`^${klass.map((item) => item.value).join("|")}.*`);
    console.log(query);

    const results = await Listening.find(query, null, {
        skip: constants.pageSize * (page - 1),
        limit: constants.pageSize,
    }).lean();
    const extensions = new Set(results.map((item) => item.extension));

    const lessons = await Lesson.find({ extension: { $in: [...extensions] } });
    const lessonByExt = {};
    lessons.forEach((item) => (lessonByExt[item.extension] = item.messageName));
    results.forEach((item) => (item.extension = lessonByExt[item.extension]));

    const totalCount = await Listening.count(query);

    const headers = constants.listeningHeaders
        .filter((item) => item.value !== "identityType")
        .sort((item1, item2) => item1.order - item2.order);
    res.send(getTableDataResponse(results, totalCount, headers, req.body));
});

router.post("/lesson", auth, async function (req, res) {
    console.log(req.body);
    const { page, extension, messageName } = req.body;

    const query = { user: req.user.name };
    if (extension) query.extension = new RegExp(`${extension}`);
    if (messageName) query.messageName = new RegExp(`${messageName}`);
    console.log(query);

    const results = await Lesson.find(query, null, {
        skip: constants.pageSize * (page - 1),
        limit: constants.pageSize,
    }).lean();

    const totalCount = await Lesson.count(query);

    res.send(getTableDataResponse(results, totalCount, constants.lessonHeaders, req.body));
});

router.post("/student", auth, async function (req, res) {
    console.log(req.body);
    const { page, identityNumber, name, klass } = req.body;

    const query = { user: req.user.name };
    if (identityNumber) query.identityNumber = new RegExp(`${identityNumber}`);
    if (name) query.name = new RegExp(`${name}`);
    if (klass && klass.length) query.fullName = new RegExp(`^${klass.map((item) => item.value).join("|")}.*`);
    console.log(query);

    const results = await Student.find(query, null, {
        skip: constants.pageSize * (page - 1),
        limit: constants.pageSize,
    }).lean();

    const totalCount = await Student.count(query);

    res.send(getTableDataResponse(results, totalCount, constants.studentHeaders, req.body));
});

router.post("/conf", auth, async function (req, res) {
    console.log(req.body);
    const { page } = req.body;

    const query = { user: req.user.name };
    console.log(query);

    const results = await Conf.find(query, null, {
        skip: constants.pageSize * (page - 1),
        limit: constants.pageSize,
    }).lean();

    const totalCount = await Conf.count(query);

    res.send(getTableDataResponse(results, totalCount, constants.confHeaders, req.body));
});

module.exports = router;
