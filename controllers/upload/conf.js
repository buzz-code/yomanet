const moment = require("moment");
const parsing = require("../../helpers/parsing");
const { Conf } = require("../../models/Conf");

module.exports = {
    url: "/conf",
    upload: async function (buffer, user) {
        const parsed = parsing.parseConf(buffer);
        parsed.forEach((item) => {
            const date = item.date;
            item.date = moment.utc(item.date, "DD/MM/YYYY").toDate();
            item.startTime = moment(date + " " + item.startTime, "DD/MM/YYYY HH:mm:ss").toDate();
            item.endTime = moment(date + " " + item.endTime, "DD/MM/YYYY HH:mm:ss").toDate();
            if (Number.isNaN(item.endTime - item.startTime)) {
                console.log("skip conf row save", date, item.endTime, item.startTime);
                item.skip = true;
            }
            item.seconds = (item.endTime - item.startTime) / 1000;
            item.user = user.name;
        });
        await Conf.insertMany(parsed.filter((item) => !item.skip));
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
