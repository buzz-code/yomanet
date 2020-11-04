module.exports = {
    url: "/graphByKlass",
    title: function (filter) {
        const { klass, fromDate, toDate } = filter;
        let title = "גרפים לכיתה ";
        title += klass.map((item) => item.label).join("");
        if (fromDate) title += " מתאריך " + moment.utc(fromDate).format("DD-MM-YYYY");
        if (toDate) title += " עד תאריך " + moment.utc(toDate).format("DD-MM-YYYY");
        return title;
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
