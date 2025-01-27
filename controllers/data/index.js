const express = require("express");
const router = express.Router();
const { auth } = require("../../middleware/auth");
const { getTableDataResponse, createReport, sendReportByMail } = require("../../helpers/utils");

function registerHook(hook) {
    router.post(hook.url, auth, async function (req, res) {
        const filter = JSON.parse(req.body.filter);
        const params = req.params;
        const query = await hook.query(filter, req.user);
        console.log("data query for url:", hook.url, filter, query);

        const { isValid, errorMessage } = await hook.validate(query, req.user, filter);
        if (!isValid) {
            res.send({ error: true, errorMessage: errorMessage || "ארעה שגיאה", params: filter });
            return;
        }

        const results = await hook.data(query, filter.page, filter, req.user, params);
        const count = await hook.count(query);
        const headers = await hook.headers(results, query, filter, req.user, params);

        getTableDataResponse(res, results, count, headers, filter);
    });
    router.get(hook.url, auth, async function (req, res) {
        const filter = JSON.parse(req.query.filter);
        const params = req.params;
        const query = await hook.query(filter, req.user);
        console.log("report query for url:", hook.url, filter, query);

        const { isValid, errorMessage } = await hook.validate(query, req.user, filter);
        if (!isValid) {
            res.send({ error: true, errorMessage: errorMessage || "ארעה שגיאה" });
            return;
        }

        const results = await hook.data(query, -1, filter, req.user, params);
        const headers = await hook.headers(results, query, filter, req.user, params);
        const title = hook.title(filter, query, params);
        const specialReportType = hook.specialReportType && hook.specialReportType(params);

        createReport(res, hook.url, filter.format, title, results, headers, specialReportType);
    });
    router.put(hook.url, auth, async function (req, res) {
        const filter = JSON.parse(req.body.filter);
        const params = req.params;
        const query = await hook.query(filter, req.user);
        console.log("email query for url:", hook.url, filter, query);

        const { isValid, errorMessage } = await hook.validate(query, req.user, filter);
        if (!isValid) {
            res.send({ error: true, errorMessage: errorMessage || "ארעה שגיאה" });
            return;
        }

        const results = await hook.data(query, -1, filter, req.user, params);
        const headers = await hook.headers(results, query, filter, req.user, params);
        const title = hook.title(filter, query, params);

        sendReportByMail(res, req.body.recipient, filter.format, title, results, headers);
    });
}

registerHook(require("./lesson"));
registerHook(require("./student"));
registerHook(require("./listening"));
registerHook(require("./conf"));
registerHook(require("./record"));
registerHook(require("./user"));
registerHook(require("./file"));
registerHook(require("./dataByKlassOrMegama"));
registerHook(require("./dataByKlassAndLesson"));
registerHook(require("./multipleDataByKlassAndLesson"));
registerHook(require("./listeningByKlassPerStudent"));
registerHook(require("./diploma"));

module.exports = router;
