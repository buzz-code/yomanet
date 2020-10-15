const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
    res.render("index", { title: "Home" });
});

const userController = require("../controllers/user");
router.use(userController);

const dataController = require("../controllers/data");
router.use(dataController);

const uploadController = require("../controllers/upload");
router.use(uploadController);

module.exports = router;
