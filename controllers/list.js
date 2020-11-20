const express = require("express");
const router = express.Router();
const { Lesson } = require("../models/Lesson");
const { Student } = require("../models/Student");
const { auth } = require("../middleware/auth");

router.post("/lesson", auth, async function (req, res) {
    const { term, klass } = req.body;

    const query = [{ user: req.user.name }];
    if (term) query.push({ messageName: new RegExp(term) });
    // if (klass) query.push({ messageName: new RegExp(klass) });
    console.log("list query for url: /lesson", query);

    const results = await Lesson.find({ $and: query }, ["extension", "messageName"], {
        sort: { messageName: 1 },
    }).lean();

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
    console.log("list query for url: /klass", query);

    const results = await Student.aggregate([
        { $match: query },
        { $group: { _id: { grade: "$grade", classNum: "$classNum" } } },
        { $project: { _id: 0, grade: "$_id.grade", classNum: "$_id.classNum" } },
        { $sort: { grade: 1, classNum: 1 } },
    ]);
    const items = results.map((item) => ({
        value: `${item.grade} - ${item.classNum} `,
        label: `${item.grade}${item.classNum}`,
    }));
    res.send({ results: items });
});

router.post("/megama", auth, async function (req, res) {
    const { term } = req.body;

    const query = { user: req.user.name };
    if (term) query.megama = new RegExp(term);
    console.log("list query for url: /megama", query);

    const results = await Student.aggregate([
        { $match: query },
        { $project: { megama: "$megama" } },
        { $unwind: "$megama" },
        { $group: { _id: "$megama" } },
        { $project: { _id: 0, megama: "$_id" } },
        { $sort: { megame: 1 } },
    ]);

    const items = results.map((item) => ({
        value: item.megama,
        label: item.megama,
    }));
    res.send({ results: items });
});

router.post("/student", auth, async function (req, res) {
    const { term } = req.body;
    const klassRegex = /[א-ת]\d/;

    const query = { user: req.user.name };
    if (term) {
        const klass = term.match(klassRegex);
        const name = term.replace(klassRegex, "").replace(/^ /, "^");
        if (name !== "^") query.name = new RegExp(name);
        if (klass) query.fullKlassName = new RegExp(klass[0]);
    }
    console.log("list query for url: /student", query);

    const results = await Student.aggregate([
        { $match: query },
        { $project: { fullKlassName: "$fullKlassName", name: "$name", identityNumber: "$identityNumber" } },
        { $project: { _id: 0, fullKlassName: "$fullKlassName", name: "$name", identityNumber: "$identityNumber" } },
        { $sort: { fullKlassName: 1, name: 1, identityNumber: 1 } },
        { $limit: 15 },
    ]);

    const items = results.map((item) => ({
        value: item.identityNumber,
        label: `${item.fullKlassName} ${item.name} ${item.identityNumber}`,
    }));
    res.send({ results: items });
});

module.exports = router;
