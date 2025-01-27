const constants = require("../../helpers/constants");
const { User } = require("../../models/User");
const { YemotPlayback } = require("../../models/YemotPlayback");
const { Lesson } = require("../../models/Lesson");
const { Student } = require("../../models/Student");
const { YemotConfBridge } = require("../../models/YemotConfBridge");
const { YemotPlayDir } = require("../../models/YemotPlayDir");
const { getPagingConfig } = require("../../helpers/utils");

module.exports = {
    url: "/user",
    title: function () {
        "נתוני משתמשים";
    },
    query: async function (body, user) {
        return {};
    },
    validate: async function (query, user) {
        if (user.role !== 0) {
            return { isValid: true, errorMessage: null };
        }
        return { isValid: false, errorMessage: "אין לך הרשאה לצפות בדף זה" };
    },
    data: async function (query, page) {
        const results = await User.find(query).lean();

        const items = await Promise.all(
            results.map(async (user) => {
                const query = { user: user.name };

                const isAdmin = user.role !== 0 ? "כן" : "לא";
                const listening = await YemotPlayback.countDocuments(query);
                const conf = await YemotConfBridge.countDocuments(query);
                const record = await YemotPlayDir.countDocuments(query);
                const lesson = await Lesson.countDocuments(query);
                const student = await Student.countDocuments(query);

                return {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    providerUsername: user.providerUsername,
                    providerPassword: user.providerPassword,
                    providerIsPrivate: String(user.providerIsPrivate),
                    isPaid: String(user.isPaid),
                    isAdmin,
                    listening,
                    conf,
                    record,
                    lesson,
                    student,
                };
            })
        );

        return items;
    },
    headers: async function (data) {
        return constants.userHeaders;
    },
    count: async function (query) {
        return 0;
    },
};
