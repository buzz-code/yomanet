const express = require("express");
const router = express.Router();

const validation = require("../../helpers/validation");
const files = require("../../helpers/files");
const { File } = require("../../models/File");
const { auth } = require("../../middleware/auth");

function registerHook(hook) {
    router.post(hook.url, auth, async function (req, res) {
        try {
            if (req.files && req.files.fileUpload) {
                const content = await files.readFile(req.files.fileUpload.tempFilePath);
                const isValid = await validation.fileIsUnique(req.user, req.files.fileUpload.md5);
                if (!isValid) {
                    res.send({ error: true, errorMessage: "הקובץ כבר הועלה באתר" });
                    return;
                }
                const validateResponse = await hook.validate(req.user);
                if (!validateResponse.isValid) {
                    res.send({ error: true, errorMessage: validateResponse.errorMessage });
                    return;
                }
                await hook.upload(content, req.user);
                console.log("saved", hook.url);
                await File.create({
                    user: req.user.name,
                    fileName: req.files.fileUpload.name,
                    md5: req.files.fileUpload.md5,
                });
                res.send({ success: true });
                return;
            }
        } catch (e) {
            console.log(e);
        }
        res.send({ error: true, errorMessage: "ארעה שגיאה, נסה שנית" });
    });
}

registerHook(require("./lesson"));
registerHook(require("./student"));

module.exports = router;
