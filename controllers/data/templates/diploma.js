const { Student } = require("../../../models/Student");
const titleUtil = require("../../../helpers/dataUtils/titleUtil");
const queryUtil = require("../../../helpers/dataUtils/queryUtil");
const { getLessonByExt, getExtensions, getDataById } = require("../../../helpers/dataUtils/utils");
const { getAggregateForDiploma } = require("../../../helpers/dataUtils/aggregateUtil");

module.exports = (model, url, title) => ({
    url,
    title: function (filter) {
        return titleUtil.getTitle(title, filter, titleUtil.singleKlass, titleUtil.lesson, titleUtil.dates);
    },
    query: async function (filter, user) {
        const query = queryUtil.getQuery(user, filter, queryUtil.dates, queryUtil.lesson);
        const studentQuery = queryUtil.getQuery(user, filter, queryUtil.klass, queryUtil.name);

        return { query, studentQuery };
    },
    validate: async function (query, user, filter) {
        if (filter.klass && filter.klass.length) {
            if (filter.format !== "PDF") {
                return { isValid: false, errorMessage: "להנפקת תעודות לחצו על הכפתור Pdf" };
            }
            return { isValid: true, errorMessage: null };
        }
        return { isValid: false, errorMessage: "חובה לבחור כיתה" };
    },
    data: async function (queries, page) {
        const { query, students } = await queryUtil.getQueryWithStudentIds(queries, page);

        const dataById = await getDataById(model, getAggregateForDiploma(query));

        return students.map((item) => ({
            name: item.name,
            ...dataById[item.identityNumber],
        }));
    },
    headers: async function (data, query, filter, user) {
        const extensions = getExtensions(data);
        const lessonByExt = await getLessonByExt(user, extensions);

        if (filter.lesson && filter.lesson.length) {
            filter.lesson.forEach((item) => (lessonByExt[item.value] = item.label));
        }

        const headers = [...extensions]
            .filter((item) => item !== "name")
            .sort()
            .map((item) => ({ value: item, label: lessonByExt[item] || item, format: "sec2min" }));

        return headers;
    },
    count: async function (queries) {
        const { studentQuery } = queries;
        return await Student.countDocuments({ $and: studentQuery });
    },
});
