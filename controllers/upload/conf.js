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
            item.seconds = (item.endTime - item.startTime) / 1000;
            item.user = user.name;
        });
        await Conf.insertMany(parsed);
    },
    validate: null,
};
