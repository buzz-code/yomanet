export default [
    {
        url: "dataByKlassOrMegama",
        title: "כיתה או מגמה",
        filterFields: ["singleKlass", "singleMegama", "lessonWithAll", "dateRange"],
        isAdmin: false,
        reportTypes: ["listening", "conf", "record"],
    },
    // {
    //     url: "dataByKlassAndLesson",
    //     title: "כיתה או מגמה ומקצוע",
    //     filterFields: ["singleKlass", "singleMegama", "singleLesson", "singleStudent", "dateRange"],
    //     isAdmin: false,
    //     reportTypes: ["listening", "conf", "record"],
    // },
    {
        url: "multipleDataByKlassAndLesson",
        title: "כיתה או מגמה ומקצוע - שיעורים מרובים",
        filterFields: ["singleKlass", "singleMegama", "lessonWithAll", "singleStudent", "dateRange"],
        isAdmin: false,
        reportTypes: ["listening", "conf", "record", "listeningPercent", "confPercent", "recordPercent"],
        filterProps: {
            isHideEmailButton: true,
        },
    },
    {
        url: "diploma",
        title: "הנפקת תעודות לתלמידות",
        filterFields: ["singleKlass", "singleMegama", "lessonWithAll", "singleStudent", "dateRange"],
        isAdmin: false,
        reportTypes: ["listening", "conf", "record"],
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
];
