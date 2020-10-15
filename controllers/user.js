const express = require("express");
const router = express.Router();

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

module.exports = router;
