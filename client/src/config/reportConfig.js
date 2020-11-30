export default [
    {
        url: "listeningByKlassOrMegama",
        title: "כיתה או מגמה - האזנה",
        filterFields: ["singleKlass", "singleMegama", "lessonWithAll", "dateRange"],
        isAdmin: false,
    },
    {
        url: "confByKlassOrMegama",
        title: "כיתה או מגמה - ועידה",
        filterFields: ["singleKlass", "singleMegama", "lessonWithAll", "dateRange"],
        isAdmin: false,
    },
    {
        url: "recordByKlassOrMegama",
        title: "כיתה או מגמה - שיעורים מוקלטים",
        filterFields: ["singleKlass", "singleMegama", "lessonWithAll", "dateRange"],
        isAdmin: false,
    },
    {
        url: "listeningByKlassAndLesson",
        title: "כיתה או מגמה ומקצוע - האזנה",
        filterFields: ["singleKlass", "singleMegama", "singleLesson", "singleStudent", "dateRange"],
        isAdmin: false,
    },
    {
        url: "confByKlassAndLesson",
        title: "כיתה או מגמה ומקצוע - ועידה",
        filterFields: ["singleKlass", "singleMegama", "singleLesson", "singleStudent", "dateRange"],
        isAdmin: false,
    },
    {
        url: "recordByKlassAndLesson",
        title: "כיתה או מגמה ומקצוע - שיעורים מוקלטים",
        filterFields: ["singleKlass", "singleMegama", "singleLesson", "singleStudent", "dateRange"],
        isAdmin: false,
    },
    {
        url: "multipleListeningByKlassAndLesson",
        title: "כיתה או מגמה ומקצוע - קבצים מרובים - האזנה",
        filterFields: ["singleKlass", "singleMegama", "lessonWithAll", "singleStudent", "dateRange"],
        isAdmin: false,
        filterProps: {
            isHideEmailButton: true,
        },
    },
    {
        url: "listeningByKlassPerStudent",
        title: "דוח כללי לכיתה - האזנה",
        filterFields: ["singleKlass", "dateRange"],
        isAdmin: false,
    },
    {
        url: "listeningDiploma",
        title: "הנפקת תעודות לתלמידות - האזנה",
        filterFields: ["singleKlass", "singleMegama", "lessonWithAll", "singleStudent", "dateRange"],
        isAdmin: false,
        filterProps: {
            isHideEmailButton: true,
            isHideExcelButton: true,
        },
    },
    {
        url: "confDiploma",
        title: "הנפקת תעודות לתלמידות - ועידה",
        filterFields: ["singleKlass", "singleMegama", "lessonWithAll", "singleStudent", "dateRange"],
        isAdmin: false,
        filterProps: {
            isHideEmailButton: true,
            isHideExcelButton: true,
        },
    },
    {
        url: "recordDiploma",
        title: "הנפקת תעודות לתלמידות - שיעורים מוקלטים",
        filterFields: ["singleKlass", "singleMegama", "lessonWithAll", "singleStudent", "dateRange"],
        isAdmin: false,
        filterProps: {
            isHideEmailButton: true,
            isHideExcelButton: true,
        },
    },
];
