export default [
    {
        url: "listeningByKlassOrMegama",
        title: "דוח האזנה לפי כיתה או מגמה",
        filterFields: ["singleKlass", "singleMegama", "lessonWithAll", "dateRange"],
        isAdmin: false,
    },
    {
        url: "listeningByKlassAndLesson",
        title: "דוח האזנה לפי כיתה או מגמה ומקצוע",
        filterFields: ["singleKlass", "singleMegama", "singleLesson", "singleStudent", "dateRange"],
        isAdmin: false,
    },
    {
        url: "listeningByKlassPerStudent",
        title: "דוח האזנה כללי לכיתה",
        filterFields: ["singleKlass", "dateRange"],
        isAdmin: false,
    },
    {
        url: "listeningDiploma",
        title: "הנפקת תעודות האזנה לתלמידות",
        filterFields: ["singleKlass", "singleMegama", "lessonWithAll", "singleStudent", "dateRange"],
        isAdmin: false,
        filterProps: {
            isHideEmailButton: true,
            isHideExcelButton: true,
        },
    },
    {
        url: "confByKlassOrMegama",
        title: "דוח ועידה לפי כיתה או מגמה",
        filterFields: ["singleKlass", "singleMegama", "lessonWithAll", "dateRange"],
        isAdmin: false,
    },
    {
        url: "confByKlassAndLesson",
        title: "דוח ועידה לפי כיתה או מגמה ומקצוע",
        filterFields: ["singleKlass", "singleMegama", "singleLesson", "singleStudent", "dateRange"],
        isAdmin: false,
    },
    {
        url: "confDiploma",
        title: "הנפקת תעודות ועידה לתלמידות",
        filterFields: ["singleKlass", "singleMegama", "lessonWithAll", "singleStudent", "dateRange"],
        isAdmin: false,
        filterProps: {
            isHideEmailButton: true,
            isHideExcelButton: true,
        },
    },
];
