const { YemotFile } = require("../../../models/YemotFile");
const processKolKasherFile = require("../process-file/process-kol-kasher-file");
const { getFtpClient } = require("../../../helpers/data-providers/ftp");
const prettyBytes = require("pretty-bytes");

module.exports = {
    listFiles: async (hook, user, subPath) => {
        if (!user.providerUsername || !user.providerPassword) {
            return { error: true, errorMessage: "לא ניתן לשאוב קבצים מכיוון שלא מוגדר חיבור למערכת של קול כשר" };
        }

        if (!user.isPaid) {
            return { error: true, errorMessage: "לא ניתן לשאוב קבצים מכיוון שעדיין לא הוסדר תשלום" };
        }

        try {
            const client = await getFtpClient("kol-kasher", user.providerUsername, user.providerPassword);
            const files = await client.list();
            const loadedFiles = await YemotFile.find({ user: user.name }).lean();
            const results = files
                .filter((item) => hook.dirRegex.test(item.name) || hook.fileRegex.test(item.name))
                .map((item) => {
                    const loadedFile = loadedFiles.find((file) => file.fullPath === item.name);
                    const resItem = {
                        name: item.name,
                        fullPath: item.name,
                        isFile: true,
                        size: prettyBytes(item.size),
                        mtime: item.rawModifiedAt,
                        status: loadedFile ? loadedFile.status : "טרם נטען",
                    };
                    return resItem;
                });
            client.close();
            return { error: false, results };
        } catch (err) {
            console.log("gis file list error", user.name, err);
            return { error: true, errorMessage: "ארעה שגיאה: " + err };
        }
    },
    processFile: async (hook, user, fullPath) => {
        if (!user.providerUsername || !user.providerPassword) {
            return { error: true, errorMessage: "לא ניתן לשאוב קבצים מכיוון שלא מוגדר חיבור למערכת של קול כשר" };
        }
        const currentlyProcessing = await YemotFile.countDocuments({ user: user.name, status: "בטעינה" });
        if (currentlyProcessing >= 3) {
            return { error: true, errorMessage: "לא ניתן לשאוב יותר מ3 קבצים בו זמנית" };
        }

        processKolKasherFile.uploadFile(user, fullPath, hook.fileType);
        return { error: false };
    },
};
