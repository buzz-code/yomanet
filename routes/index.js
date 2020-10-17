const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
    res.render("index", { title: "Home" });
});

const usersController = require("../controllers/users");
router.use(usersController);

const dataController = require("../controllers/data");
router.use(dataController);

const uploadController = require("../controllers/upload");
router.use(uploadController);

module.exports = router;
