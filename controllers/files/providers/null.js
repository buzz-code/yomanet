module.exports = {
    listFiles: async (hook, user, subPath) => {
        return { error: true, errorMessage: "לא ניתן לשאוב קבצים מכיוון שלא מוגדר חיבור למערכת" };
    },
    processFile: async (hook, user, fullPath) => {
        return { error: true, errorMessage: "לא ניתן לשאוב קבצים מכיוון שלא מוגדר חיבור למערכת" };
    },
};
