const parsing = require("../../helpers/parsing");
const { Student } = require("../../models/Student");

module.exports = {
    url: "/student",
    upload: async function (buffer, user) {
        const parsed = parsing.parseStudent(buffer);
        parsed.forEach((item) => {
            item.user = user.name;
        });
        await Student.deleteMany({ user: user.name });
        await Student.insertMany(parsed);
    },
    validate: null,
};
