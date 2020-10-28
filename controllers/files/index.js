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
        data.files
            .filter((item) => hook.fileRegex.test(item.name))
            .forEach((item) => {
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
        const arr = await parsing.parseYemotFile(req.user, fullPath);
        console.log(hook.url, 'got', arr.length);
     
        const session = await hook.model.startSession();
        session.startTransaction();
        try {
            const opts = { session };
            await hook.model.deleteMany({ user: req.user.name, fileName: fullPath }, opts);
            await hook.model.insertMany(arr, opts);
            await YemotFile.deleteMany({ user: req.user.name, fullPath }, opts);
            await YemotFile.create(
                [
                    {
                        user: req.user.name,
                        fileName: path.basename(fullPath),
                        fullPath,
                        status: "נטען",
                    },
                ],
                opts
            );
            await session.commitTransaction();
            session.endSession();
        } catch (e) {
            console.log(e);
            await session.abortTransaction();
            session.endSession();

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
