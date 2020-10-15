const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
    res.render("index", { title: "Home" });
});

router.get("/login", function (req, res) {
    res.render("index", { title: "Login" });
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
