const express = require("express");
const router = express.Router();
const prettyBytes = require("pretty-bytes");
const { auth } = require("../../middleware/auth");
const { getTableDataResponse } = require("../../helpers/utils");
const { YemotFile } = require("../../models/YemotFile");
const { doYemotAction } = require("../../helpers/yemot");
const processYemotFile = require("../../helpers/process-yemot-file");

function registerHook(hook) {
    router.get(hook.url, auth, async function (req, res) {
        if (!req.user.yemotUsername || !req.user.yemotPassword) {
            res.send({ error: true, errorMessage: "לא ניתן לשאוב קבצים מכיוון שלא מוגדר חיבור לימות המשיח" });
            return;
        }

        const filter = JSON.parse(req.query.filter);
        const { subPath } = filter;

        try {
            const { data } = await doYemotAction(
                req.user.yemotUsername,
                req.user.yemotPassword,
                req.user.yemotIsPrivate,
                "GetIvrTree",
                { path: hook.yemotPath + "/" + (subPath || "") }
            );
            const loadedFiles = await YemotFile.find({ user: req.user.name }).lean();

            require("fs").writeFileSync("data.json", JSON.stringify(data.items, null, "\t"));
            const results = data.items
                .filter((item) => (item.exists && hook.dirRegex.test(item.name)) || hook.fileRegex.test(item.name))
                .map((item) => {
                    const isFile = item.fileType !== "DIR";
                    const resItem = {
                        name: item.name,
                        fullPath: item.what,
                        isFile,
                    };
                    if (isFile) {
                        const loadedFile = isFile && loadedFiles.find((file) => file.fullPath === item.what);
                        resItem.size = prettyBytes(item.size);
                        resItem.mtime = item.mtime;
                        resItem.status = loadedFile ? loadedFile.status : "טרם נטען";
                    }
                    return resItem;
                })
                .reverse();

            getTableDataResponse(res, results, 0, [], { subPath });
        } catch (err) {
            console.log("yemot file list error", req.user.name, err);
            res.send({ error: true, errorMessage: "ארעה שגיאה: " + err });
        }
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
