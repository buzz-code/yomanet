export default [
    { isHeader: true, title: "האזנה" },
    {
        url: "listeningByKlassOrMegama",
        title: "כיתה או מגמה",
        filterFields: ["singleKlass", "singleMegama", "lessonWithAll", "dateRange"],
        isAdmin: false,
    },
    {
        url: "listeningByKlassAndLesson",
        title: "כיתה או מגמה ומקצוע",
        filterFields: ["singleKlass", "singleMegama", "singleLesson", "singleStudent", "dateRange"],
        isAdmin: false,
    },
    {
        url: "multipleListeningByKlassAndLesson",
        title: "כיתה או מגמה ומקצוע - שיעורים מרובים",
        filterFields: ["singleKlass", "singleMegama", "lessonWithAll", "singleStudent", "dateRange"],
        isAdmin: false,
        filterProps: {
            isHideEmailButton: true,
        },
    },
    {
        url: "multipleListeningPercentByKlassAndLesson",
        title: "כיתה או מגמה ומקצוע - שיעורים מרובים - אחוזים",
        filterFields: ["singleKlass", "singleMegama", "lessonWithAll", "singleStudent", "dateRange"],
        isAdmin: false,
        filterProps: {
            isHideEmailButton: true,
        },
    },
    {
        url: "listeningByKlassPerStudent",
        title: "דוח כללי לכיתה",
        filterFields: ["singleKlass", "dateRange"],
        isAdmin: false,
    },
    {
        url: "listeningDiploma",
        title: "הנפקת תעודות לתלמידות",
        filterFields: ["singleKlass", "singleMegama", "lessonWithAll", "singleStudent", "dateRange"],
        isAdmin: false,
        filterProps: {
            isHideEmailButton: true,
            isHideExcelButton: true,
        },
    },

    { isHeader: true, title: "ועידה" },
    {
        url: "confByKlassOrMegama",
        title: "כיתה או מגמה",
        filterFields: ["singleKlass", "singleMegama", "lessonWithAll", "dateRange"],
        isAdmin: false,
    },
    {
        url: "confByKlassAndLesson",
        title: "כיתה או מגמה ומקצוע",
        filterFields: ["singleKlass", "singleMegama", "singleLesson", "singleStudent", "dateRange"],
        isAdmin: false,
    },
    {
        url: "multipleConfByKlassAndLesson",
        title: "כיתה או מגמה ומקצוע - נתוני ועידה מרובים",
        filterFields: ["singleKlass", "singleMegama", "lessonWithAll", "singleStudent", "dateRange"],
        isAdmin: false,
        filterProps: {
            isHideEmailButton: true,
        },
    },
    {
        url: "multipleConfPercentByKlassAndLesson",
        title: "כיתה או מגמה ומקצוע - נתוני ועידה מרובים - אחוזים",
        filterFields: ["singleKlass", "singleMegama", "lessonWithAll", "singleStudent", "dateRange"],
        isAdmin: false,
        filterProps: {
            isHideEmailButton: true,
        },
    },
    {
        url: "confDiploma",
        title: "הנפקת תעודות לתלמידות",
        filterFields: ["singleKlass", "singleMegama", "lessonWithAll", "singleStudent", "dateRange"],
        isAdmin: false,
        filterProps: {
            isHideEmailButton: true,
            isHideExcelButton: true,
        },
    },
    { isHeader: true, title: "שיעורים מוקלטים" },
    {
        url: "recordByKlassOrMegama",
        title: "כיתה או מגמה",
        filterFields: ["singleKlass", "singleMegama", "lessonWithAll", "dateRange"],
        isAdmin: false,
    },
    {
        url: "recordByKlassAndLesson",
        title: "כיתה או מגמה ומקצוע",
        filterFields: ["singleKlass", "singleMegama", "singleLesson", "singleStudent", "dateRange"],
        isAdmin: false,
    },
    {
        url: "multipleRecordByKlassAndLesson",
        title: "כיתה או מגמה ומקצוע - שיעורים מרובים",
        filterFields: ["singleKlass", "singleMegama", "lessonWithAll", "singleStudent", "dateRange"],
        isAdmin: false,
        filterProps: {
            isHideEmailButton: true,
        },
    },
    {
        url: "multipleRecordPercentByKlassAndLesson",
        title: "כיתה או מגמה ומקצוע - שיעורים מרובים - אחוזים",
        filterFields: ["singleKlass", "singleMegama", "lessonWithAll", "singleStudent", "dateRange"],
        isAdmin: false,
        filterProps: {
            isHideEmailButton: true,
        },
    },
    {
        url: "recordDiploma",
        title: "הנפקת תעודות לתלמידות",
        filterFields: ["singleKlass", "singleMegama", "lessonWithAll", "singleStudent", "dateRange"],
        isAdmin: false,
        filterProps: {
            isHideEmailButton: true,
            isHideExcelButton: true,
        },
    },
];
