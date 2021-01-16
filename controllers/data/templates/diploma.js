const { Student } = require("../../../models/Student");
const titleUtil = require("../../../helpers/dataUtils/titleUtil");
const queryUtil = require("../../../helpers/dataUtils/queryUtil");
const {
    getLessonByExt,
    getExtensions,
    getDataById,
    getLessonInstancesForDiploma,
} = require("../../../helpers/dataUtils/utils");
const { getAggregateForDiploma } = require("../../../helpers/dataUtils/aggregateUtil");

module.exports = (model, url, title, reportType) => ({
    url,
    title: function (filter) {
        return titleUtil.getTitle(
            title,
            filter,
            titleUtil.singleKlass,
            titleUtil.singleMegama,
            titleUtil.lesson,
            titleUtil.dates
        );
    },
    query: async function (filter, user) {
        const query = queryUtil.getQuery(user, filter, queryUtil.dates, queryUtil.lesson);
        const studentQuery = queryUtil.getQuery(user, filter, queryUtil.klass, queryUtil.megama, queryUtil.student);
        const lessonQuery = queryUtil.getQuery(user, filter, queryUtil.allLessons);

        const extensions = await queryUtil.filterLessons(query, lessonQuery);

        return { query, studentQuery, extensions };
    },
    validate: async function (query, user, filter) {
        if ((filter.klass && filter.klass.length) || (filter.megama && filter.megama.length)) {
            // if (filter.klass && filter.klass.length && filter.megama && filter.megama.length) {
            //     return { isValid: false, errorMessage: "ניתן לסנן לפי כיתה או לפי מגמה, אך לא שניהם" };
            // }
            if (filter.format !== "PDF") {
                return { isValid: false, errorMessage: "להנפקת תעודות לחצו על הכפתור Pdf" };
            }
            return { isValid: true, errorMessage: null };
        }
        return { isValid: false, errorMessage: "חובה לבחור כיתה או מגמה" };
    },
    data: async function (queries, page, filter, user) {
        const { query, students } = await queryUtil.getQueryWithStudentIds(queries, page);

        const dataById = await getDataById(model, getAggregateForDiploma(query, reportType));

        const listeningData = students.map((item) => ({
            name: item.name,
            ...getDataForStudent(dataById, item),
        }));

        const lessonIds = queries.extensions
            ? queries.extensions.map((item) => item.extension)
            : new Set(
                  Object.values(dataById).flatMap((item) =>
                      Object.keys(item).filter((item) => item !== "name" && item !== "EnterId")
                  )
              );
        const lessonInstances = await getLessonInstancesForDiploma(lessonIds, user, filter, reportType);

        return { listeningData, lessonInstances };
    },
    headers: async function ({ lessonInstances }, query, filter, user) {
        const extensions = Object.keys(lessonInstances);
        const lessonByExt = await getLessonByExt(user, extensions);

        if (filter.lesson && filter.lesson.length) {
            filter.lesson.forEach((item) => (lessonByExt[item.value] = item.label));
        }

        const headers = [...extensions]
            .filter((item) => item !== "name" && item !== "EnterId")
            .sort()
            .map((item) => ({ value: item, label: lessonByExt[item] || item, format: "sec2min" }));

        return headers;
    },
    count: async function (queries) {
        const { studentQuery } = queries;
        return await Student.countDocuments({ $and: studentQuery });
    },
});

const getDataForStudent = (dataById, student) => {
    const studentData = dataById[student.identityNumber];
    if (student.lessons && student.lessons.length) {
        const keys = Object.keys(studentData);
        for (const key of keys) {
            if (student.lessons.indexOf(key) == -1) {
                studentData[key] = "none";
            }
        }
    }
    return studentData;
};
