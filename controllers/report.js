const express = require("express");
const moment = require("moment");
const router = express.Router();
const constants = require("../helpers/constants");
const { Listening } = require("../models/Listening");
const { Lesson } = require("../models/Lesson");
const { Student } = require("../models/Student");
const { Conf } = require("../models/Conf");
const { auth } = require("../middleware/auth");
const { createReport } = require("../helpers/normalizer");

router.get("/pdf/listeningByKlassAndLesson", auth, async function (req, res) {
    console.log(req.query);
    const { klass, lesson, fromDate, toDate } = req.query;

    const query = [{ user: req.user.name }];
    if (lesson) query.push({ extension: new RegExp(lesson) });
    if (klass) query.push({ name: new RegExp(`^${klass}.*`) });
    if (fromDate) query.push({ date: { $gte: moment.utc(fromDate).toDate() } });
    if (toDate) query.push({ date: { $lte: moment.utc(toDate).toDate() } });
    console.log(query);

    if (query.length === 1) {
        res.send("חובה לבצע סינון לנתונים");
        return;
    }

    const results = await Listening.aggregate([
        { $match: { $and: query } },
        {
            $group: {
                _id: { name: "$name", extension: "$extension", listening: "$listening" },
                seconds: { $sum: "$seconds" },
            },
        },
        {
            $group: {
                _id: { name: "$_id.name", extension: "$_id.extension" },
                items: { $addToSet: { listening: "$_id.listening", seconds: { $sum: "$seconds" } } },
            },
        },
        { $project: { tmp: { $arrayToObject: { $zip: { inputs: ["$items.listening", "$items.seconds"] } } } } },
        { $addFields: { "tmp.name": "$_id.name", "tmp.extension": "$_id.extension" } },
        { $replaceRoot: { newRoot: "$tmp" } },
        { $sort: { name: 1 } },
    ]);

    const extensions = new Set(results.map((item) => item.extension));
    extensions.add(lesson);
    const lessons = await Lesson.find({ extension: { $in: [...extensions] } });
    const lessonByExt = {};
    lessons.forEach((item) => (lessonByExt[item.extension] = item.messageName));
    results.forEach((item) => (item.extension = lessonByExt[item.extension] || item.extension));

    const keys = new Set();
    results.forEach((item) => {
        for (const key in item) {
            keys.add(key);
        }
    });
    const headers = [
        { label: "שם התלמידה", value: "name", format: klass ? "nameWOKlass" : null },
        { label: "שם השיעור", value: "extension" },
        ...[...keys]
            .filter((item) => item !== "name" && item !== "extension")
            .sort()
            .map((item) => ({ value: item, label: item, format: "sec2min" })),
    ];

    let title = "נתוני האזנה";
    if (klass) title += ` לכיתה ${klass}`;
    if (lesson) title += ` לשיעור ${lessonByExt[lesson]}`;

    createReport(res, title, results, headers);
});

router.get("/pdf/listeningByKlass", auth, async function (req, res) {
    console.log(req.query);
    const { klass, fromDate, toDate } = req.query;

    const query = [{ user: req.user.name }];
    if (klass) query.push({ name: new RegExp(`^${klass}.*`) });
    if (fromDate) query.push({ date: { $gte: moment.utc(fromDate).toDate() } });
    if (toDate) query.push({ date: { $lte: moment.utc(toDate).toDate() } });
    console.log(query);

    if (query.length === 1) {
        res.send("חובה לבצע סינון לנתונים");
        return;
    }

    const results = await Listening.aggregate([
        { $match: { $and: query } },
        {
            $group: {
                _id: { name: "$name", extension: "$extension" },
                seconds: { $sum: "$seconds" },
            },
        },
        {
            $group: {
                _id: { name: "$_id.name" },
                items: { $addToSet: { extension: "$_id.extension", seconds: { $sum: "$seconds" } } },
            },
        },
        { $project: { tmp: { $arrayToObject: { $zip: { inputs: ["$items.extension", "$items.seconds"] } } } } },
        { $addFields: { "tmp.name": "$_id.name" } },
        { $replaceRoot: { newRoot: "$tmp" } },
        { $sort: { name: 1 } },
    ]);
    const keys = new Set();
    results.forEach((item) => {
        for (const key in item) {
            keys.add(key);
        }
    });

    const lessons = await Lesson.find({ extension: { $in: [...keys] } });
    const lessonByExt = {};
    lessons.forEach((item) => (lessonByExt[item.extension] = item.messageName));

    const headers = [
        { label: "שם התלמידה", value: "name", format: "nameWOKlass" },
        ...[...keys]
            .filter((item) => item !== "name" && item !== "extension")
            .sort()
            .map((item) => ({ value: item, label: lessonByExt[item] || item, format: "sec2min" })),
    ];

    let title = "נתוני האזנה";
    if (klass) title += ` לכיתה ${klass}`;

    createReport(res, title, results, headers);
});

router.get("/pdf/confByKlass", auth, async function (req, res) {
    console.log(req.query);
    const { klass, fromDate, toDate } = req.query;

    const query = [{ user: req.user.name }];
    if (klass) query.push({ name: new RegExp(`^${klass}.*`) });
    if (fromDate) query.push({ date: { $gte: moment.utc(fromDate).toDate() } });
    if (toDate) query.push({ date: { $lte: moment.utc(toDate).toDate() } });
    console.log(query);

    if (query.length === 1) {
        res.send("חובה לבצע סינון לנתונים");
        return;
    }

    const results = await Conf.aggregate([
        { $match: { $and: query } },
        {
            $group: {
                _id: { name: "$name", extension: "$extension" },
                seconds: { $sum: "$seconds" },
            },
        },
        {
            $group: {
                _id: { name: "$_id.name" },
                items: { $addToSet: { extension: "$_id.extension", seconds: { $sum: "$seconds" } } },
            },
        },
        { $project: { tmp: { $arrayToObject: { $zip: { inputs: ["$items.extension", "$items.seconds"] } } } } },
        { $addFields: { "tmp.name": "$_id.name" } },
        { $replaceRoot: { newRoot: "$tmp" } },
        { $sort: { name: 1 } },
    ]);
    const keys = new Set();
    results.forEach((item) => {
        for (const key in item) {
            keys.add(key);
        }
    });

    const lessons = await Lesson.find({ extension: { $in: [...keys] } });
    const lessonByExt = {};
    lessons.forEach((item) => (lessonByExt[item.extension] = item.messageName));

    const headers = [
        { label: "שם התלמידה", value: "name", format: "nameWOKlass" },
        ...[...keys]
            .filter((item) => item !== "name")
            .sort()
            .map((item) => ({ value: item, label: lessonByExt[item] || item, format: "sec2min" })),
    ];

    let title = "נתוני ועידה";
    if (klass) title += ` לכיתה ${klass}`;

    createReport(res, title, results, headers);
});

module.exports = router;
