const { doYemotAction } = require("../../../helpers/data-providers/yemot");
const prettyBytes = require("pretty-bytes");
const { YemotFile } = require("../../../models/YemotFile");
const processYemotFile = require("../process-file/process-yemot-file");

module.exports = {
    listFiles: async (hook, user, subPath) => {
        if (!user.providerUsername || !user.providerPassword) {
            return { error: true, errorMessage: "לא ניתן לשאוב קבצים מכיוון שלא מוגדר חיבור לימות המשיח" };
        }

        if (!user.isPaid) {
            return { error: true, errorMessage: "לא ניתן לשאוב קבצים מכיוון שעדיין לא הוסדר תשלום" };
        }

        try {
            const { data } = await doYemotAction(
                user.providerUsername,
                user.providerPassword,
                user.providerIsPrivate,
                "GetIvrTree",
                { path: hook.yemotPath + "/" + (subPath || "") }
            );
            const loadedFiles = await YemotFile.find({ user: user.name }).lean();

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

            return { error: false, results };
        } catch (err) {
            console.log("yemot file list error", user.name, err);
            return { error: true, errorMessage: "ארעה שגיאה: " + err };
        }
    },
    processFile: async (hook, user, fullPath) => {
        if (!user.providerUsername || !user.providerPassword) {
            return { error: true, errorMessage: "לא ניתן לשאוב קבצים מכיוון שלא מוגדר חיבור לימות המשיח" };
        }
        const currentlyProcessing = await YemotFile.countDocuments({ user: user.name, status: "בטעינה" });
        if (currentlyProcessing >= 3) {
            return { error: true, errorMessage: "לא ניתן לשאוב יותר מ3 קבצים בו זמנית" };
        }

        processYemotFile.uploadFile(user, fullPath, hook.fileType);
        return { error: false };
    },
};
