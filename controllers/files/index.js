const express = require("express");
const router = express.Router();
const path = require("path");
const prettyBytes = require("pretty-bytes");
const { auth } = require("../../middleware/auth");
const { getTableDataResponse } = require("../../helpers/utils");
const { YemotFile } = require("../../models/YemotFile");
const yemotApi = require("../../helpers/sandbox/yemot");
const parsing = require("../../helpers/parsing");
const processYemotFile = require("../../helpers/process-yemot-file");

function registerHook(hook) {
    router.get(hook.url, auth, async function (req, res) {
        if (!req.user.yemotUsername || !req.user.yemotPassword) {
            res.send({ error: true, errorMessage: "לא ניתן לשאוב קבצים מכיוון שלא מוגדר חיבור לימות המשיח" });
            return;
        }

        const filter = JSON.parse(req.query.filter);
        const { subPath } = filter;

        const yemot = new yemotApi(req.user.yemotUsername, req.user.yemotPassword, req.user.yemotIsPrivate);
        const { data } = await yemot.exec("GetIVR2Dir", { path: hook.yemotPath + "/" + (subPath || "") });
        const loadedFiles = await YemotFile.find({ user: req.user.name }).lean();

        const results = [];
        data.dirs
            .filter((item) => hook.dirRegex.test(item.name))
            .forEach((item) => {
                results.push({
                    name: item.name,
                    fullPath: item.what,
                    status: null,
                    isFile: false,
                });
            });
        data.files
            .filter((item) => hook.fileRegex.test(item.name))
            .forEach((item) => {
                const loadedFile = loadedFiles.find((file) => file.fullPath === item.what);
                results.push({
                    name: item.name,
                    fullPath: item.what,
                    size: prettyBytes(item.size),
                    mtime: item.mtime,
                    status: loadedFile ? loadedFile.status : "טרם נטען",
                    isFile: true,
                });
            });

        getTableDataResponse(res, results, 0, [], { subPath });
    });

    router.post(hook.url, auth, async function (req, res) {
        if (!req.user.yemotUsername || !req.user.yemotPassword) {
            res.send({ error: true, errorMessage: "לא ניתן לשאוב קבצים מכיוון שלא מוגדר חיבור לימות המשיח" });
            return;
        }
        const currentlyProcessing = await YemotFile.countDocuments({ user: req.user.name, status: "בטעינה" });
        if (currentlyProcessing >= 3) {
            res.send({ error: true, errorMessage: "לא ניתן לשאוב יותר מ3 קבצים בו זמנית" });
            return;
        }

        const { fullPath } = req.body;
        processYemotFile.uploadFile(req.user, fullPath, hook.fileType);

        res.send({ error: false, success: true });
    });
}

registerHook(require("./listening"));
registerHook(require("./conf"));

module.exports = router;
