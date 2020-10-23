const moment = require("moment");

function getListOfPreviosDays(count) {
    const today = moment.utc().startOf("day");
    let firstDay = moment(today).subtract(count, "day");
    const days = [];
    while (firstDay.isSameOrBefore(today)) {
        days.push(firstDay);
        firstDay = moment(firstDay).add(1, "day");
    }
    return days;
}

module.exports = {
    getListOfPreviosDays,
};
