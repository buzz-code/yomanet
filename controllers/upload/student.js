const parsing = require("../../helpers/parsing");
const { Student } = require("../../models/Student");

module.exports = {
    url: "/student",
    upload: async function (buffer, user) {
        const parsed = parsing.parseStudent(buffer);
        parsed.forEach((item) => {
            item.user = user.name;
            item.megama = item.megama.split(",");
        });
        await Student.deleteMany({ user: user.name });
        await Student.insertMany(parsed);
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
