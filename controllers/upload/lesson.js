const parsing = require("../../helpers/parsing");
const { Lesson } = require("../../models/Lesson");

module.exports = {
    url: "/lesson",
    upload: async function uploadLesson(buffer, user) {
        const parsed = parsing.parseLesson(buffer);
        parsed.forEach((item) => {
            item.user = user.name;
        });
        await Lesson.deleteMany({ user: user.name });
        await Lesson.insertMany(parsed);
    },
    validate: null,
};
