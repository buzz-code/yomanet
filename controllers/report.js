const express = require("express");
const moment = require("moment");
const router = express.Router();
const constants = require("../helpers/constants");
const { Listening } = require("../models/Listening");
const { Lesson } = require("../models/Lesson");
const { Student } = require("../models/Student");
const { auth } = require("../middleware/auth");
const { createHtml } = require("../helpers/normalizer");
const puppeteer = require("puppeteer");

router.get("/pdf/listeningByKlassAndLesson", auth, async function (req, res) {
    console.log(req.query);
    const { klass, lesson, fromDate, toDate } = req.query;

    const query = {};
    if (lesson) query.extension = new RegExp(lesson);
    if (klass) query.name = new RegExp(`^${klass}.*`);
    if (fromDate) query.date = { $gte: moment(fromDate).toDate() };
    if (toDate) query.date = { ...query.date, $lte: moment(toDate).toDate() };
    console.log(query);

    if (JSON.stringify(query) == JSON.stringify({})) {
        res.send("חובה לבצע סינון לנתונים");
        return;
    }

    const results = await Listening.aggregate([
        { $match: query },
        {
            $group: {
                _id: { name: "$name", extension: "$extension" },
                items: { $addToSet: { listening: "$listening", seconds: { $sum: "$seconds" } } },
            },
        },
        { $project: { tmp: { $arrayToObject: { $zip: { inputs: ["$items.listening", "$items.seconds"] } } } } },
        { $addFields: { "tmp.name": "$_id.name", "tmp.extension": "$_id.extension" } },
        { $replaceRoot: { newRoot: "$tmp" } },
    ]);
    const extensions = new Set(results.map((item) => item.extension));

    const lessons = await Lesson.find({ extension: { $in: [...extensions] } });
    const lessonByExt = {};
    lessons.forEach((item) => (lessonByExt[item.extension] = item.messageName));
    results.forEach((item) => (item.extension = lessonByExt[item.extension]));

    const keys = new Set();
    results.forEach((item) => {
        for (const key in item) {
            keys.add(key);
        }
    });
    const headers = [
        { label: "שם התלמידה", value: "name", width: 125 },
        { label: "שם השיעור", value: "extension", width: 125 },
        ...[...keys]
            .filter((item) => item !== "name" && item !== "extension")
            .map((item) => ({ value: item, label: item, format: "sec2min", width: 40 })),
    ];

    let title = "נתונים";
    if (klass) title += ` לכיתה ${klass}`;
    if (lesson) title += ` לשיעור ${lesson}`;

    const html = createHtml(title, results, headers);
    const browser = await puppeteer.launch({ headless: true });
    const pdf = await browser.newPage();
    await pdf.setContent(html);
    const buffer = await pdf.pdf({
        format: "A4",
        printBackground: true,
        landscape: true,
        margin: {
            left: "0px",
            top: "0px",
            right: "0px",
            bottom: "0px",
        },
    });
    await browser.close();
    res.end(buffer);
});

module.exports = router;
