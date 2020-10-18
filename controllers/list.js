const express = require("express");
const moment = require("moment");
const router = express.Router();
const constants = require("../helpers/constants");
const { Listening } = require("../models/Listening");
const { Lesson } = require("../models/Lesson");
const { Student } = require("../models/Student");
const { auth } = require("../middleware/auth");

router.post("/lesson", auth, async function (req, res) {
    const { term, klass } = req.body;

    const query = { user: req.user.name };
    if (term) query.messageName = new RegExp(term);
    if (klass) {
        if (term) {
            delete query.messageName;
            query.$and = [{ messageName: new RegExp(term) }, { messageName: new RegExp(klass) }];
        } else {
            query.messageName = new RegExp(klass);
        }
    }
    console.log(query);

    const results = await Lesson.find(query, ["extension", "messageName"], { limit: 10 });

    const items = results.map((item) => ({
        value: item.extension,
        label: item.messageName,
    }));

    res.send({ results: items });
});

router.post("/klass", auth, async function (req, res) {
    const { term } = req.body;

    const query = { user: req.user.name };
    if (term) query.fullKlassName = new RegExp(term);
    console.log(query);

    const results = await Student.aggregate([
        { $match: query },
        { $group: { _id: { grade: "$grade", classNum: "$classNum" } } },
        { $project: { _id: 0, grade: "$_id.grade", classNum: "$_id.classNum" } },
    ]);
    const items = results.map((item) => ({
        value: `${item.grade} - ${item.classNum}`,
        label: `${item.grade}${item.classNum}`,
    }));
    res.send({ results: items });
});

module.exports = router;
