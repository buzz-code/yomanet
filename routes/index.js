const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
    res.render("index", { title: "Home" });
});

const usersController = require("../controllers/users");
router.use("/user", usersController);

const dataController = require("../controllers/data");
router.use("/data", dataController);

const uploadController = require("../controllers/upload");
router.use("/upload", uploadController);

const listController = require("../controllers/list");
router.use("/list", listController);

const filesController = require("../controllers/files");
router.use("/files", filesController);

const graphController = require("../controllers/graph");
router.use("/graph", graphController);

module.exports = router;
