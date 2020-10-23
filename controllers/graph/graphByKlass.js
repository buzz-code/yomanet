module.exports = {
    url: "/graphByKlass",
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
    ],
};
