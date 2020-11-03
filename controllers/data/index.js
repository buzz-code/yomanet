const express = require("express");
const router = express.Router();
const { auth } = require("../../middleware/auth");
const { getTableDataResponse, createReport, sendReportByMail } = require("../../helpers/utils");

function registerHook(hook) {
    router.post(hook.url, auth, async function (req, res) {
        const filter = JSON.parse(req.body.filter);
        const query = await hook.query(filter, req.user);
        console.log("data query for url:", hook.url, filter, query);

        const { isValid, errorMessage } = await hook.validate(query, req.user, filter);
        if (!isValid) {
            res.send({ error: true, errorMessage: errorMessage || "ארעה שגיאה", params: filter });
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
        console.log("report query for url:", hook.url, filter, query);

        const { isValid, errorMessage } = await hook.validate(query, req.user, filter);
        if (!isValid) {
            res.send({ error: true, errorMessage: errorMessage || "ארעה שגיאה" });
            return;
        }

        const results = await hook.data(query, -1, filter);
        const headers = await hook.headers(results, query, filter);
        const title = hook.title(filter);

        createReport(res, hook.url, filter.format, title, results, headers);
    });
    router.put(hook.url, auth, async function (req, res) {
        const filter = JSON.parse(req.body.filter);
        const query = await hook.query(filter, req.user);
        console.log("email query for url:", hook.url, filter, query);

        const { isValid, errorMessage } = await hook.validate(query, req.user, filter);
        if (!isValid) {
            res.send({ error: true, errorMessage: errorMessage || "ארעה שגיאה" });
            return;
        }

        const results = await hook.data(query, -1, filter);
        const headers = await hook.headers(results, query, filter);
        const title = hook.title(filter);

        sendReportByMail(res, req.body.recipient, filter.format, title, results, headers);
    });
}

registerHook(require("./listening"));
registerHook(require("./lesson"));
registerHook(require("./student"));
registerHook(require("./conf"));
registerHook(require("./user"));
registerHook(require("./file"));
registerHook(require("./listeningByKlass"));
registerHook(require("./listeningByKlassAndLesson"));
registerHook(require("./confByKlass"));
registerHook(require("./listeningByKlassPerStudent"));
registerHook(require("./listeningByMegama"));
registerHook(require("./confByMegama"));
registerHook(require("./diploma"));

module.exports = router;
