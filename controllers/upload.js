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
const { File } = require("../models/File");
const { auth } = require("../middleware/auth");

function registerHook(url, callback) {
    router.post(url, auth, async function (req, res) {
        try {
            if (req.files && req.files.fileUpload) {
                const content = await files.readFile(req.files.fileUpload.tempFilePath);
                const { isValid, md5 } = await validation.fileIsUnique(req.user, content);
                if (isValid) {
                    await callback(content, req.user);
                    console.log("saved", url);
                    await File.create({
                        user: req.user.name,
                        fileName: req.files.fileUpload.name,
                        md5,
                    });
                    res.send({ success: true });
                    return;
                } else {
                    res.send({ error: true, errorMessage: "הקובץ כבר הועלה באתר" });
                    return;
                }
            }
        } catch (e) {
            console.log(e);
        }
        res.send({ error: true, errorMessage: "ארעה שגיאה, נסה שנית" });
    });
}

registerHook("/listening", uploadListening);
registerHook("/conf", uploadConf);
registerHook("/lesson", uploadLesson);
registerHook("/student", uploadStudent);

async function uploadListening(buffer, user) {
    const parsed = parsing.parseListening(buffer);
    parsed.forEach((item) => {
        item.date = moment.utc(item.date, "DD/MM/YYYY").toDate();
        item.seconds = Number(item.seconds);
        item.user = user.name;
    });
    await Listening.insertMany(parsed);
}
async function uploadConf(buffer, user) {
    const parsed = parsing.parseConf(buffer);
    parsed.forEach((item) => {
        const date = item.date;
        item.date = moment.utc(item.date, "DD/MM/YYYY").toDate();
        item.startTime = moment(date + " " + item.startTime, "DD/MM/YYYY HH:mm:ss").toDate();
        item.endTime = moment(date + " " + item.endTime, "DD/MM/YYYY HH:mm:ss").toDate();
        item.seconds = (item.endTime - item.startTime) / 1000;
        item.user = user.name;
    });
    await Conf.insertMany(parsed);
}
async function uploadLesson(buffer, user) {
    const parsed = parsing.parseLesson(buffer);
    parsed.forEach((item) => {
        item.user = user.name;
    });
    await Lesson.deleteMany({ user: user.name });
    await Lesson.insertMany(parsed);
}
async function uploadStudent(buffer, user) {
    const parsed = parsing.parseStudent(buffer);
    parsed.forEach((item) => {
        item.user = user.name;
    });
    await Student.deleteMany({ user: user.name });
    await Student.insertMany(parsed);
}

module.exports = router;
