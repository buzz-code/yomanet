const express = require("express");
const router = express.Router();
const validation = require("./../helpers/validation");
const parsing = require("../helpers/parsing");
const files = require("../helpers/files");
const { Listening } = require("../models/Listening");
const { Lesson } = require("../models/Lesson");
const { Student } = require("../models/Student");
const { auth } = require("../middleware/auth");

router.post("/data/upload/listening", auth, async function (req, res) {
    if (req.files && req.files.fileUpload) {
        const content = await files.readFile(req.files.fileUpload.tempFilePath);
        if (validation.fileIsUnique(content)) {
            const parsed = parsing.parseListening(content);
            await Listening.insertMany(parsed);
            console.log("saved");
        }
    }
    res.send({ success: true });
});

router.post("/data/upload/lesson", auth, async function (req, res) {
    if (req.files && req.files.fileUpload) {
        const parsed = parsing.parseLesson(req.files.fileUpload.tempFilePath);
        await Lesson.deleteMany();
        await Lesson.insertMany(parsed);
        console.log("saved");
    }
    res.send({ success: true });
});

router.post("/data/upload/student", auth, async function (req, res) {
    if (req.files && req.files.fileUpload) {
        const parsed = parsing.parseStudent(req.files.fileUpload.tempFilePath);
        await Student.deleteMany();
        await Student.insertMany(parsed);
        console.log("saved");
    }
    res.send({ success: true });
});

module.exports = router;
