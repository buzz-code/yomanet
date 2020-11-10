const moment = require("moment");
const titleUtil = require("../../helpers/titleUtil");

module.exports = {
    url: "/graphByKlass",
    title: function (filter) {
        return titleUtil.getTitle("גרפים כללים", filter, titleUtil.singleKlass, titleUtil.dates);
    },
    validate: function (filter) {
        const { klass } = filter;
        if (!klass || !klass.length) {
            return {
                isValid: false,
                errorMessage: "יש לבחור כיתה",
            };
        }
        return {
            isValid: true,
            errorMessage: "",
        };
    },
    charts: [
        require("./charts/listeningByDays"),
        require("./charts/listeningByLessons"),
        require("./charts/listeningByStudent"),
        require("./charts/listeningByHours"),
    ],
};
