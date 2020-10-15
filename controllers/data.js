const express = require("express");
const router = express.Router();
const db = require("../helpers/db");
const constants = require("../helpers/constants");

router.get("/data", async function (req, res) {
    const listeningData = await db.getListeningData();
    const data = {
        title: "Data",
        data: listeningData,
        headers: constants.listeningTableHeaders,
    };
    res.render("data", data);
});

module.exports = router;
