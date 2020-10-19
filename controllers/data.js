const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { getTableDataResponse } = require("../helpers/normalizer");

function registerHook(hook) {
    router.post(hook.url, auth, async function (req, res) {
        const query = await hook.query(req.body, req.user);
        console.log(req.body, query);

        const isValid = await hook.validate(query, req.user);
        if (!isValid) {
            res.send({ error: true });
            return;
        }

        const results = await hook.data(query, req.body.page);
        const count = await hook.count(query);
        const headers = await hook.headers(results);

        res.send(getTableDataResponse(results, count, headers, req.body));
    });
}

registerHook(require("./data/listening"));
registerHook(require("./data/lesson"));
registerHook(require("./data/student"));
registerHook(require("./data/conf"));
registerHook(require("./data/user"));

module.exports = router;
