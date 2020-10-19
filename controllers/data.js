const express = require("express");
const moment = require("moment");
const router = express.Router();
const constants = require("../helpers/constants");
const { Listening } = require("../models/Listening");
const { Lesson } = require("../models/Lesson");
const { Student } = require("../models/Student");
const { Conf } = require("../models/Conf");
const { User } = require("../models/User");
const { auth } = require("../middleware/auth");
const { getTableDataResponse } = require("../helpers/normalizer");

router.post("/listening", auth, async function (req, res) {
    const { results, totalCount } = await getListeningData(req);

    const extensions = new Set(results.map((item) => item.extension));
    const lessons = await Lesson.find({ extension: { $in: [...extensions] } });
    const lessonByExt = {};
    lessons.forEach((item) => (lessonByExt[item.extension] = item.messageName));
    results.forEach((item) => (item.extension = lessonByExt[item.extension]));

    const headers = constants.listeningHeaders
        .filter((item) => item.value !== "identityType")
        .sort((item1, item2) => item1.order - item2.order);
    res.send(getTableDataResponse(results, totalCount, headers, req.body));
});

async function getListeningData(req) {
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
    });
    const totalCount = await Listening.count(query);

    return {
        results,
        totalCount,
    };
}

router.post("/lesson", auth, async function (req, res) {
    const { results, totalCount } = await getLessonData(req);

    res.send(getTableDataResponse(results, totalCount, constants.lessonHeaders, req.body));
});

async function getLessonData(req) {
    console.log(req.body);
    const { page, extension, messageName } = req.body;

    const query = { user: req.user.name };
    if (extension) query.extension = new RegExp(`${extension}`);
    if (messageName) query.messageName = new RegExp(`${messageName}`);
    console.log(query);

    const results = await Lesson.find(query, null, {
        skip: constants.pageSize * (page - 1),
        limit: constants.pageSize,
    });
    const totalCount = await Lesson.count(query);

    return {
        results,
        totalCount,
    };
}

router.post("/student", auth, async function (req, res) {
    const { results, totalCount } = await getStudentData(req);

    res.send(getTableDataResponse(results, totalCount, constants.studentHeaders, req.body));
});

async function getStudentData(req) {
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
    });
    const totalCount = await Student.count(query);

    return { results, totalCount };
}

router.post("/conf", auth, async function (req, res) {
    const { results, totalCount } = await getConfData(req);

    const extensions = new Set(results.map((item) => item.extension));
    const lessons = await Lesson.find({ extension: { $in: [...extensions] } });
    const lessonByExt = {};
    lessons.forEach((item) => (lessonByExt[item.extension] = item.messageName));
    results.forEach((item) => (item.extension = lessonByExt[item.extension]));

    res.send(getTableDataResponse(results, totalCount, constants.confHeaders, req.body));
});

async function getConfData(req) {
    console.log(req.body);
    const { page } = req.body;

    const query = { user: req.user.name };
    console.log(query);

    const results = await Conf.find(query, null, {
        skip: constants.pageSize * (page - 1),
        limit: constants.pageSize,
    });

    const totalCount = await Conf.count(query);

    return {
        results,
        totalCount,
    };
}

router.post("/user", auth, async function (req, res) {
    if (req.user.role === 0) {
        res.send(getTableDataResponse([], 0, [], {}));
    }

    const { results, totalCount } = await getUserData(req);

    const items = await Promise.all(
        results.map(async (user) => {
            const query = { user: user.name };

            user.isAdmin = user.role !== 0 ? "כן" : "לא";
            user.listening = await Listening.countDocuments(query);
            user.conf = await Conf.countDocuments(query);
            user.lesson = await Lesson.countDocuments(query);
            user.student = await Student.countDocuments(query);
            return { ...user, name: user.name, email: user.email };
        })
    );

    res.send(getTableDataResponse(items, totalCount, constants.userHeaders, req.body));
});

async function getUserData(req) {
    console.log(req.body);

    const results = await User.find();
    const totalCount = 0;

    return {
        results,
        totalCount,
    };
}

module.exports = router;
