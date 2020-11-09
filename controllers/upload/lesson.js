const parsing = require("../../helpers/parsing");
const { Lesson } = require("../../models/Lesson");

module.exports = {
    url: "/lesson",
    upload: async function uploadLesson(buffer, user) {
        const parsed = parsing.parseLesson(buffer);
        parsed.forEach((item) => {
            item.user = user.name;
            item.megama = item.megama ? item.megama.split(",") : [];
        });
        await Lesson.deleteMany({ user: user.name });
        await Lesson.insertMany(parsed);
    },
    validate: function (user) {
        if (user.name === "דוגמא") {
            return {
                isValid: false,
                errorMessage: "לא ניתן להעלות קבצים למערכת ההדגמה, היא נועדה לקריאה בלבד",
            };
        }
        return { isValid: true, errorMessage: "" };
    },
};
