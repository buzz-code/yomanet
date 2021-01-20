export default [
    { isHeader: true, title: "האזנה" },
    {
        url: "dataByKlassOrMegama/listening",
        title: "כיתה או מגמה",
        filterFields: ["singleKlass", "singleMegama", "lessonWithAll", "dateRange"],
        isAdmin: false,
    },
    {
        url: "dataByKlassAndLesson/listening",
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
        url: "diploma/listening",
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
        url: "dataByKlassOrMegama/conf",
        title: "כיתה או מגמה",
        filterFields: ["singleKlass", "singleMegama", "lessonWithAll", "dateRange"],
        isAdmin: false,
    },
    {
        url: "dataByKlassAndLesson/conf",
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
        url: "diploma/conf",
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
        url: "dataByKlassOrMegama/record",
        title: "כיתה או מגמה",
        filterFields: ["singleKlass", "singleMegama", "lessonWithAll", "dateRange"],
        isAdmin: false,
    },
    {
        url: "dataByKlassAndLesson/record",
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
        url: "diploma/record",
        title: "הנפקת תעודות לתלמידות",
        filterFields: ["singleKlass", "singleMegama", "lessonWithAll", "singleStudent", "dateRange"],
        isAdmin: false,
        filterProps: {
            isHideEmailButton: true,
            isHideExcelButton: true,
        },
    },
];
