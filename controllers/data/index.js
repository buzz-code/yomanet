const express = require("express");
const router = express.Router();
const { auth } = require("../../middleware/auth");
const { getTableDataResponse, createReport } = require("../../helpers/normalizer");

function registerHook(hook) {
    router.post(hook.url, auth, async function (req, res) {
        const filter = JSON.parse(req.body.filter);
        const query = await hook.query(filter, req.user);
        console.log(filter, query);

        const isValid = await hook.validate(query, req.user, filter);
        if (!isValid) {
            res.send({ error: true });
            return;
        }

        const results = await hook.data(query, filter.page, filter);
        const count = await hook.count(query);
        const headers = await hook.headers(results, query, filter);

        getTableDataResponse(res, results, count, headers, filter);
    });
    router.get(hook.url, auth, async function (req, res) {
        const filter = JSON.parse(req.query.filter);
        const query = await hook.query(filter, req.user);
        console.log(filter, query);

        const isValid = await hook.validate(query, req.user, filter);
        if (!isValid) {
            res.send({ error: true, errorMessage: "invalid filter" });
            return;
        }

        const results = await hook.data(query, -1, filter);
        const headers = await hook.headers(results, query, filter);
        const title = hook.title(filter);

        createReport(res, filter.format, title, results, headers);
    });
}

registerHook(require("./listening"));
registerHook(require("./lesson"));
registerHook(require("./student"));
registerHook(require("./conf"));
registerHook(require("./user"));
registerHook(require("./listeningByKlass"));
registerHook(require("./listeningByKlassAndLesson"));
registerHook(require("./confByKlass"));
registerHook(require("./listeningByKlassPerStudent"));

module.exports = router;
