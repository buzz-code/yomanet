const queryUtil = require("../../../helpers/dataUtils/queryUtil");
const { promiseAllSerial } = require("../../../helpers/utils");
const { getSec2Min } = require("../../../helpers/format");
const { getLessonInstancesForKlassAndLesson } = require("../../../helpers/dataUtils/utils");
const { Lesson } = require("../../../models/Lesson");
const titleUtil = require("../../../helpers/dataUtils/titleUtil");

module.exports = (url, title, dataTemplate, type, isPercent) => ({
    isPercent,
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
        const query = queryUtil.getQuery(user, filter, queryUtil.dates);
        const studentQuery = queryUtil.getQuery(user, filter, queryUtil.klass, queryUtil.megama, queryUtil.student);
        const lessonQuery = queryUtil.getQuery(user, filter, queryUtil.allLessons);
        if (!filter.allLessons && filter.lesson) {
            lessonQuery.push({ extension: new RegExp(`^(${filter.lesson.map((item) => item.value).join("|")})$`) });
        }
        const lessons = await Lesson.find({ $and: lessonQuery }, ["extension", "messageName", "displayName"]);

        return { query, studentQuery, lessons };
    },
    validate: async function (query, user, filter) {
        if (!(filter.klass && filter.klass.length) && !(filter.megama && filter.megama.length)) {
            return { isValid: false, errorMessage: "חובה לבחור כיתה או מגמה" };
        }
        if (!(filter.lesson && filter.lesson.length) && !filter.allLessons) {
            return { isValid: false, errorMessage: "חובה לבחור שיעור, או לסמן את כל השיעורים המתאימים" };
        }
        return { isValid: true, errorMessage: null };
    },
    data: async function (queries, page, filter, user) {
        const { query, studentQuery, lessons } = queries;
        const dataPromise = lessons.map(async (item) => {
            const dataQuery = [...query, { Folder: new RegExp(`^${item.extension}$`) }];
            const filter = { lesson: [{ label: item.extension }] };
            return dataTemplate.data({ query: dataQuery, studentQuery }, page, filter);
        });
        const data = await promiseAllSerial(dataPromise);
        if (data.length === 0) {
            return [];
        }
        const results = [];
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].length; j++) {
                let item = { ...results[j] };
                const { name, extension, EnterId, Folder, ...rest } = data[i][j];
                item.name = name;
                for (const key in rest) {
                    item[extension + "--" + key] = rest[key];
                }
                results[j] = item;
            }
        }
        return results;
    },
    headers: async function (data, { lessons, ...queries }, filter, user) {
        const keys = new Set(data.flatMap((item) => Object.keys(item)).filter((item) => item !== "name"));
        const lessonsAndCurrents = {};
        keys.forEach((item) => {
            const [lesson, current] = item.split("--");
            if (!lessonsAndCurrents[lesson]) {
                lessonsAndCurrents[lesson] = [];
            }
            lessonsAndCurrents[lesson].push(current);
        });

        const headers = [{ label: "שם התלמידה", value: "name", format: "nameWOKlass" }];

        for (const lesson in lessonsAndCurrents) {
            const currents = lessonsAndCurrents[lesson];
            const { fileLengthByKey, lessonTitleByKey } = await getLessonInstancesForKlassAndLesson(
                lesson,
                currents,
                user,
                type
            );

            const lessonObj = lessons.filter((item) => item.extension === lesson)[0];

            headers.splice(
                headers.length,
                0,
                ...[...currents].sort().map((item) => ({
                    value: lesson + "--" + item,
                    label: getHeaderTitle(item, lessonObj, fileLengthByKey, lessonTitleByKey),
                    format: "sec2min",
                }))
            );
        }

        return headers;
    },
    count: async function (query) {
        return 0;
    },
});

function getHeaderTitle(item, lessonObj, fileLengthByKey, lessonTitleByKey) {
    const lessonName = lessonObj ? (lessonObj.displayName || lessonObj.messageName) + " " : null;
    if (lessonTitleByKey[item]) {
        return `${lessonName}${lessonTitleByKey[item]} (${item}) - ${getSec2Min(fileLengthByKey[item])}`;
    }
    return `${lessonName}${item} - ${getSec2Min(fileLengthByKey[item])}`;
}
