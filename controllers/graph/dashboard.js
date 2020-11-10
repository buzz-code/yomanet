const moment = require("moment");
const titleUtil = require("../../helpers/dataUtils/titleUtil");

module.exports = {
    url: "/",
    title: function (filter) {
        return titleUtil.getTitle("גרפים כללים", filter, titleUtil.dates);
    },
    validate: function (filter) {
        return { isValid: true, errorMessage: "" };
    },
    charts: [
        require("./charts/listeningByDays"),
        require("./charts/listeningByLessons"),
        require("./charts/listeningByStudent"),
        require("./charts/listeningByHours"),
    ],
};
