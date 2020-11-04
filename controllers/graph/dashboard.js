module.exports = {
    url: "/",
    title: function (filter) {
        const { fromDate, toDate } = filter;
        let title = "גרפים כלליים ";
        if (fromDate) title += " מתאריך " + moment.utc(fromDate).format("DD-MM-YYYY");
        if (toDate) title += " עד תאריך " + moment.utc(toDate).format("DD-MM-YYYY");
        return title;
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
