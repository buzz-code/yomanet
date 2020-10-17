const express = require("express");
const moment = require("moment");
const router = express.Router();
const constants = require("../helpers/constants");
const { Listening } = require("../models/Listening");
const { Lesson } = require("../models/Lesson");
const { Student } = require("../models/Student");
const { auth } = require("../middleware/auth");
const { getTableDataResponse } = require("../helpers/normalizer");

router.post("/listeningByKlassAndLesson", auth, async function (req, res) {
    console.log(req.body);
    const { page, klass, lesson, fromDate, toDate } = req.body;

    const query = {};
    if (lesson && lesson.length) query.extension = new RegExp(lesson.map((item) => item.value).join("|"));
    if (klass && klass.length) query.name = new RegExp(`^${klass.map((item) => item.value).join("|")}.*`);
    if (fromDate) query.date = { $gte: moment(fromDate).toDate() };
    if (toDate) query.date = { ...query.date, $lte: moment(toDate).toDate() };
    console.log(query);

    if (JSON.stringify(query) == JSON.stringify({})) {
        res.send(getTableDataResponse([], 0, [], req.body));
        return;
    }

    const results = await Listening.aggregate([
        { $match: query },
        {
            $group: {
                _id: { name: "$name", lesson: "$lesson" },
                items: { $addToSet: { listening: "$listening", seconds: { $sum: "$seconds" } } },
            },
        },
        { $project: { tmp: { $arrayToObject: { $zip: { inputs: ["$items.listening", "$items.seconds"] } } } } },
        { $addFields: { "tmp.name": "$_id.name", "tmp.lesson": "$_id.lesson" } },
        { $replaceRoot: { newRoot: "$tmp" } },
    ]);

    const keys = new Set();
    results.forEach((item) => {
        for (const key in item) {
            keys.add(key);
        }
    });
    const headers = [
        { label: "שם התלמידה", value: "name" },
        { label: "שם השיעור", value: "extension" },
        ...[...keys].filter((item) => item !== "name").map((item) => ({ value: item, label: item, format: "sec2min" })),
    ];

    res.send(getTableDataResponse(results, 0, headers, req.body));
});

module.exports = router;
