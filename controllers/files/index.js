const express = require("express");
const router = express.Router();
const { auth } = require("../../middleware/auth");
const { getTableDataResponse } = require("../../helpers/utils");

const providers = {
    ["yemot"]: require("./providers/yemot"),
    [null]: require("./providers/null"),
    [undefined]: require("./providers/null"),
};

function registerHook(hook) {
    router.get(hook.url, auth, async function (req, res) {
        const filter = JSON.parse(req.query.filter);
        const { subPath } = filter;

        console.log(req.user.provider);
        const { error, errorMessage, results } = await providers[req.user.provider].listFiles(hook, req.user, subPath);
        if (error) {
            res.send({ error, errorMessage });
            return;
        }
        getTableDataResponse(res, results, 0, [], { subPath });
    });

    router.post(hook.url, auth, async function (req, res) {
        const { fullPath } = req.body;

        console.log(req.user.provider);
        const { error, errorMessage } = await providers[req.user.provider].processFile(hook, req.user, fullPath);
        if (error) {
            res.send({ error, errorMessage });
            return;
        }
        res.send({ error: false, success: true });
    });
}

registerHook(require("./hooks/listening"));
registerHook(require("./hooks/conf"));

module.exports = router;
