module.exports = {
    url: "/",
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
