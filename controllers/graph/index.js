const express = require("express");
const { createGraphReport } = require("../../helpers/utils");
const router = express.Router();
const { User } = require("../../models/User");

function registerHook(hook) {
    router.post(hook.url, function (req, res) {
        let token = req.cookies.w_auth;
        User.findByToken(token, async (err, user) => {
            if (err) throw err;
            const params = JSON.parse(req.body.filter);
            params.user = user && user.name;

            const { isValid, errorMessage } = hook.validate(params);
            if (!isValid) {
                res.send({ isValid, errorMessage, params });
                return;
            }

            const data = await Promise.all(
                hook.charts.map(async (item) => {
                    const data = await item.getData(params);
                    return {
                        ...item,
                        data,
                    };
                })
            );
            res.send({ params, charts: data });
        });
    });
    router.get(hook.url, function (req, res) {
        let token = req.cookies.w_auth;
        User.findByToken(token, async (err, user) => {
            if (err) throw err;
            const params = JSON.parse(req.query.filter);
            params.user = user && user.name;

            const { isValid, errorMessage } = hook.validate(params);
            if (!isValid) {
                res.send({ isValid, errorMessage, params });
                return;
            }

            const data = await Promise.all(
                hook.charts.map(async (item) => {
                    const data = await item.getData(params);
                    return {
                        ...item,
                        data,
                    };
                })
            );
            createGraphReport(res, "PDF", hook.title(params), data);
        });
    });
}

registerHook(require("./dashboard"));
registerHook(require("./graphByKlass"));

module.exports = router;
