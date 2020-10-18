const express = require("express");
const router = express.Router();
const moment = require("moment");

const validation = require("./../helpers/validation");
const parsing = require("../helpers/parsing");
const files = require("../helpers/files");
const { Listening } = require("../models/Listening");
const { Lesson } = require("../models/Lesson");
const { Student } = require("../models/Student");
const { Conf } = require("../models/Conf");
const { auth } = require("../middleware/auth");

router.post("/listening", auth, async function (req, res) {
    if (req.files && req.files.fileUpload) {
        const content = await files.readFile(req.files.fileUpload.tempFilePath);
        if (validation.fileIsUnique(content)) {
            const parsed = parsing.parseListening(content);
            parsed.forEach((item) => {
                item.date = moment(item.date, "dd/MM/yyyy").toDate();
                item.seconds = Number(item.seconds);
                item.user = req.user.name;
            });
            await Listening.insertMany(parsed);
            console.log("saved");
        }
    }
    res.send({ success: true });
});

router.post("/conf", auth, async function (req, res) {
    if (req.files && req.files.fileUpload) {
        const content = await files.readFile(req.files.fileUpload.tempFilePath);
        if (validation.fileIsUnique(content)) {
            const parsed = parsing.parseConf(content);
            parsed.forEach((item) => {
                item.date = moment(item.date, "dd/MM/yyyy").toDate();
                item.user = req.user.name;
            });
            await Conf.insertMany(parsed);
            console.log("saved");
        }
    }
    res.send({ success: true });
});

router.post("/lesson", auth, async function (req, res) {
    if (req.files && req.files.fileUpload) {
        const parsed = parsing.parseLesson(req.files.fileUpload.tempFilePath);
        parsed.forEach((item) => (item.user = req.user.name));
        await Lesson.deleteMany();
        await Lesson.insertMany(parsed);
        console.log("saved");
    }
    res.send({ success: true });
});

router.post("/student", auth, async function (req, res) {
    if (req.files && req.files.fileUpload) {
        const parsed = parsing.parseStudent(req.files.fileUpload.tempFilePath);
        parsed.forEach((item) => (item.user = req.user.name));
        await Student.deleteMany();
        await Student.insertMany(parsed);
        console.log("saved");
    }
    res.send({ success: true });
});

module.exports = router;
