const { getYedaController } = require("../../../helpers/data-providers/yeda");
const prettyBytes = require("pretty-bytes");
const { YemotFile } = require("../../../models/YemotFile");
const processYedaFile = require("../process-file/process-yeda-file");

module.exports = {
    listFiles: async (hook, user, subPath) => {
        if (!user.providerUsername || !user.providerPassword) {
            return { error: true, errorMessage: "לא ניתן לשאוב קבצים מכיוון שלא מוגדר חיבור לידע פון" };
        }

        if (!user.isPaid) {
            return { error: true, errorMessage: "לא ניתן לשאוב קבצים מכיוון שעדיין לא הוסדר תשלום" };
        }

        try {
            const controller = await getYedaController(user.providerUsername, user.providerPassword);
            const files = await controller.listFiles(hook.yedaUrl);

            const loadedFiles = await YemotFile.find({ user: user.name }).lean();

            const results = files.map(([name, size]) => {
                const loadedFile = loadedFiles.find((file) => file.fullPath === name + hook.url);
                const resItem = {
                    name,
                    fullPath: name,
                    isFile: true,
                    size: prettyBytes(size * 500),
                    status: loadedFile ? loadedFile.status : "טרם נטען",
                };
                return resItem;
            });

            return { error: false, results };
        } catch (err) {
            console.log("yeda file list error", user.name, err);
            return { error: true, errorMessage: "ארעה שגיאה: " + err };
        }
    },
    processFile: async (hook, user, fullPath) => {
        if (!user.providerUsername || !user.providerPassword) {
            return { error: true, errorMessage: "לא ניתן לשאוב קבצים מכיוון שלא מוגדר חיבור לידע פון" };
        }
        const currentlyProcessing = await YemotFile.countDocuments({ user: user.name, status: "בטעינה" });
        if (currentlyProcessing >= 3) {
            return { error: true, errorMessage: "לא ניתן לשאוב יותר מ3 קבצים בו זמנית" };
        }

        processYedaFile.uploadFile(user, hook, fullPath);
        return { error: false };
    },
};
