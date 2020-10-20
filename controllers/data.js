const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { getTableDataResponse, createReport } = require("../helpers/normalizer");

function registerHook(hook) {
    router.post(hook.url, auth, async function (req, res) {
        const filter = JSON.parse(req.body.filter);
        const query = await hook.query(filter, req.user);
        console.log(filter, query);

        const isValid = await hook.validate(query, req.user);
        if (!isValid) {
            res.send({ error: true });
            return;
        }

        const results = await hook.data(query, filter.page);
        const count = await hook.count(query);
        const headers = await hook.headers(results, query, filter);

        getTableDataResponse(res, results, count, headers, filter);
    });
    router.get(hook.url, auth, async function (req, res) {
        const filter = JSON.parse(req.query.filter);
        const query = await hook.query(filter, req.user);
        console.log(filter, query);

        const isValid = await hook.validate(query, req.user);
        if (!isValid) {
            res.send({ error: true, errorMessage: "invalid filter" });
            return;
        }

        const results = await hook.data(query, -1);
        const headers = await hook.headers(results, query, filter);
        //todo: make title more correct
        const title = hook.title();

        createReport(res, filter.format, title, results, headers);
    });
}

registerHook(require("./data/listening"));
registerHook(require("./data/lesson"));
registerHook(require("./data/student"));
registerHook(require("./data/conf"));
registerHook(require("./data/user"));
registerHook(require("./data/listeningByKlass"));
registerHook(require("./data/listeningByKlassAndLesson"));
registerHook(require("./data/confByKlass"));

module.exports = router;
