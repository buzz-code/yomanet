const express = require("express");
const router = express.Router();
const validation = require("./../helpers/validation");
const db = require("../helpers/db");
const constants = require("../helpers/constants");
const parsing = require("../helpers/parsing");
const files = require("../helpers/files");

router.get("/", function (req, res) {
    res.render("index", { title: "Home" });
});

router.get("/login", function (req, res) {
    res.render("login", { title: "Login" });
});

router.post("/login", function (req, res) {
    const { username, password } = req.body;
    if (validation.login(username, password)) {
        res.redirect("data");
    } else {
        res.render("login", { title: "Login" });
    }
});

router.get("/data", async function (req, res) {
    const listeningData = await db.getListeningData();
    const data = {
        title: "Data",
        data: listeningData,
        headers: constants.listeningTableHeaders,
    };
    res.render("data", data);
});

router.get("/upload", function (req, res) {
    res.render("upload", { title: "Upload" });
});

router.post("/upload", async function (req, res) {
    if (req.files && req.files.fileUpload) {
        const content = await files.readFile(req.files.fileUpload.tempFilePath);
        if (validation.fileIsUnique(content)) {
            const parsed = parsing.parseListening(content);
            await db.saveListening(parsed);
        }
    }
    res.redirect("/");
});

// router.use("/form", express.static(__dirname + "/index.html"));

// router.post("/upload", function (req, res) {
//     let sampleFile;
//     let uploadPath;

//     if (!req.files || Object.keys(req.files).length === 0) {
//         res.status(400).send("No files were uploaded.");
//         return;
//     }

//     console.log("req.files >>>", req.files); // eslint-disable-line

//     sampleFile = req.files.sampleFile;

//     uploadPath = __dirname + "/uploads/" + sampleFile.name;

//     sampleFile.mv(uploadPath, function (err) {
//         if (err) {
//             return res.status(500).send(err);
//         }

//         res.send("File uploaded to " + uploadPath);
//     });
// });

// router.use("/form", express.static(__dirname + "/index.html"));

module.exports = router;
