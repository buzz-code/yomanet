const moment = require("moment");
const parsing = require("../../helpers/parsing");
const { Listening } = require("../../models/Listening");

module.exports = {
    url: "/listening",
    upload: async function (buffer, user) {
        const parsed = parsing.parseListening(buffer, user);
        parsed.forEach((item) => {
            const date = item.date;
            item.date = moment.utc(item.date, "DD/MM/YYYY").toDate();
            item.startTime = moment(date + " " + item.startTime, "DD/MM/YYYY HH:mm:ss").toDate();
            item.endTime = moment(date + " " + item.endTime, "DD/MM/YYYY HH:mm:ss").toDate();
            item.seconds = Number(item.seconds);
            item.user = user.name;
        });
        await Listening.insertMany(parsed);
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
