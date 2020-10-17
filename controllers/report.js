const express = require("express");
const moment = require("moment");
const router = express.Router();
const constants = require("../helpers/constants");
const { Listening } = require("../models/Listening");
const { Lesson } = require("../models/Lesson");
const { Student } = require("../models/Student");
const { auth } = require("../middleware/auth");

router.post("/listeningByKlassAndLesson", auth, async function (req, res) {
    console.log(req.body);
    const { page, klass, lesson } = req.body;

    const query = {};
    if (lesson && lesson.length) query.extension = new RegExp(lesson.map((item) => item.value).join("|"));
    if (klass && klass.length) query.name = new RegExp(`^${klass.map((item) => item.value).join("|")}.*`);
    console.log(query);

    const results = await Listening.find(query, null, {
        skip: constants.pageSize * (page - 1),
        limit: constants.pageSize,
    });

    const totalCount = await Listening.count(query);

    const data = {
        title: "נתוני האזנה לפי כיתה ומקצוע",
        results,
        totalCount,
        headers: constants.listeningTableHeaders,
        params: req.body,
    };
    res.send(data);
});

module.exports = router;
