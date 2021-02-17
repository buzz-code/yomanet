const queryUtil = require("../../helpers/dataUtils/queryUtil");
const { promiseAllSerial } = require("../../helpers/utils");
const { getLessonInstancesForKlassAndLesson, getHeaderTitle } = require("../../helpers/dataUtils/utils");
const { Lesson } = require("../../models/Lesson");
const titleUtil = require("../../helpers/dataUtils/titleUtil");
const { YemotPlayback } = require("../../models/YemotPlayback");
const { YemotConfBridge } = require("../../models/YemotConfBridge");
const { YemotPlayDir } = require("../../models/YemotPlayDir");
const dataByKlassAndLesson = require("./dataByKlassAndLesson");

module.exports = {
    specialReportType: function (params) {
        const { specialReportType } = moduleMapping[params.type];
        return specialReportType;
    },
    url: "/multipleDataByKlassAndLesson/:type",
    title: function (filter, query, params) {
        const { title } = moduleMapping[params.type];
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
            lessonQuery.push({ extension: { $in: filter.lesson.map((item) => item.value) } });
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
    data: async function (queries, page, filter, user, params) {
        const { query, studentQuery, lessons } = queries;
        const reportTypes = params.type.replace(/Percent|Grade/g, "").split("_And_");
        const dataPromises = [];
        reportTypes.forEach(type => {
            lessons.forEach(async (item) => {
                const dataQuery = [...query, { Folder: item.extension }];
                const filter = { lesson: [{ label: item.extension }] };
                dataPromises.push(dataByKlassAndLesson.data({ query: dataQuery, studentQuery }, page, filter, user, {
                    type,
                }));
            });
        });
        const data = await promiseAllSerial(dataPromises);
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
    headers: async function (data, { lessons, ...queries }, filter, user, params) {
        const { groupField } = moduleMapping[params.type];
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
            const {
                fileLengthByKey,
                lessonTitleByKey,
                firstListeningByKey,
            } = await getLessonInstancesForKlassAndLesson(lesson, currents, user, groupField);

            const lessonObj = lessons.filter((item) => item.extension === lesson)[0];

            headers.splice(
                headers.length,
                0,
                ...[...currents].sort().map((item) => ({
                    value: lesson + "--" + item,
                    label: getHeaderTitle(
                        item,
                        groupField,
                        lessonObj,
                        fileLengthByKey,
                        lessonTitleByKey,
                        firstListeningByKey
                    ),
                    format: "sec2min",
                }))
            );
        }

        return headers;
    },
    count: async function (query) {
        return 0;
    },
};

const moduleMapping = {
    listening: {
        model: YemotPlayback,
        title: "דוח האזנה",
        groupField: "current",
    },
    conf: {
        model: YemotConfBridge,
        title: "דוח ועידה",
        groupField: "enterDate",
    },
    record: {
        model: YemotPlayDir,
        title: "דוח שיעורים מוקלטים",
        groupField: "enterDate",
    },
    listening_And_conf: {
        model: YemotPlayback,
        title: "דוח משולב האזנה וועידה",
        groupField: "current_And_enterDate",
    },
    listeningByDate: {
        model: YemotPlayback,
        title: "דוח האזנה",
        groupField: "enterDate",
    },
    listeningPercent: {
        model: YemotPlayback,
        title: "דוח האזנה - אחוזים",
        groupField: "current",
        specialReportType: "percent",
    },
    confPercent: {
        model: YemotConfBridge,
        title: "דוח ועידה - אחוזים",
        groupField: "enterDate",
        specialReportType: "percent",
    },
    recordPercent: {
        model: YemotPlayDir,
        title: "דוח שיעורים מוקלטים - אחוזים",
        groupField: "enterDate",
        specialReportType: "percent",
    },
    listening_And_confPercent: {
        model: YemotPlayback,
        title: "דוח משולב האזנה וועידה - אחוזים",
        groupField: "current_And_enterDate",
        specialReportType: "percent",
    },
    listeningByDatePercent: {
        model: YemotPlayback,
        title: "דוח האזנה - אחוזים",
        groupField: "enterDate",
        specialReportType: "percent",
    },
    listeningGrade: {
        model: YemotPlayback,
        title: "דוח האזנה - ציונים",
        groupField: "current",
        specialReportType: "grade",
    },
    confGrade: {
        model: YemotConfBridge,
        title: "דוח ועידה - ציונים",
        groupField: "enterDate",
        specialReportType: "grade",
    },
    recordGrade: {
        model: YemotPlayDir,
        title: "דוח שיעורים מוקלטים - ציונים",
        groupField: "enterDate",
        specialReportType: "grade",
    },
    listening_And_confGrade: {
        model: YemotPlayback,
        title: "דוח משולב האזנה וועידה - ציונים",
        groupField: "current_And_enterDate",
        specialReportType: "grade",
    },
    listeningByDateGrade: {
        model: YemotPlayback,
        title: "דוח האזנה - ציונים",
        groupField: "enterDate",
        specialReportType: "grade",
    },
};
