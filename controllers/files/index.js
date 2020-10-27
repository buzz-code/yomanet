const express = require("express");
const router = express.Router();
const path = require("path");
const { auth } = require("../../middleware/auth");
const { getTableDataResponse } = require("../../helpers/utils");
const constants = require("../../helpers/constants");
const { YemotFile } = require("../../models/YemotFile");
const yemotApi = require("./../../helpers/yemot");
const parsing = require("../../helpers/parsing");

function registerHook(hook) {
    router.get(hook.url, auth, async function (req, res) {
        if (!req.user.yemotUsername || !req.user.yemotPassword) {
            res.send({ error: true, errorMessage: "לא ניתן לשאוב קבצים מכיוון שלא מוגדר חיבור לימות המשיח" });
            return;
        }

        const yemot = new yemotApi(req.user.yemotUsername, req.user.yemotPassword);
        const { data } = await yemot.exec("GetIVR2Dir", { path: hook.yemotPath });
        const loadedFiles = await YemotFile.find({ user: req.user.name }).lean();

        const results = [];
        data.files.forEach((item) => {
            const loadedFile = loadedFiles.find((file) => file.fullPath === item.what);
            results.push({
                fileName: item.name,
                fullPath: item.what,
                status: loadedFile ? loadedFile.status : "טרם נטען",
            });
        });

        const headers = constants.yemotFilesHeaders;

        getTableDataResponse(res, results, 0, headers, {});
    });

    router.post(hook.url, auth, async function (req, res) {
        if (!req.user.yemotUsername || !req.user.yemotPassword) {
            res.send({ error: true, errorMessage: "לא ניתן לשאוב קבצים מכיוון שלא מוגדר חיבור לימות המשיח" });
            return;
        }

        const { fullPath } = req.body;

        try {
            const arr = await parsing.parseYemotFile(req.user, fullPath);
            //todo: add transaction here
            // await hook.model.deleteMany({ user: req.user.name, fileName: fullPath });
            await hook.model.insertMany(arr);

            await YemotFile.deleteMany({ user: req.user.name, fullPath });
            await YemotFile.create({
                user: req.user.name,
                fileName: path.basename(fullPath),
                fullPath,
                status: "נטען",
            });
        } catch (e) {
            console.log(e);

            await YemotFile.deleteMany({ user: req.user.name, fullPath });
            await YemotFile.create({
                user: req.user.name,
                fileName: path.basename(fullPath),
                fullPath,
                status: "נכשל",
            });
        }

        res.send({ error: false, success: true });
    });
}

registerHook(require("./listening"));
registerHook(require("./conf"));

module.exports = router;
