const express = require("express");
const router = express.Router();
const validation = require("./../helpers/validation");
const db = require("../helpers/db");
const parsing = require("../helpers/parsing");
const files = require("../helpers/files");
const { Listening } = require("../models/Listening");

// router.get("/upload", function (req, res) {
//     res.render("upload", { title: "העלאת קובץ" });
// });

router.post("/data/upload", async function (req, res) {
    if (req.files && req.files.fileUpload) {
        const content = await files.readFile(req.files.fileUpload.tempFilePath);
        if (validation.fileIsUnique(content)) {
            console.log('valid')
            const parsed = parsing.parseListening(content);
            await Listening.insertMany(parsed);
            console.log('saved')
        }
    }
    res.send({success:true});
});

module.exports = router;
