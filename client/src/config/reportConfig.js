export default [
    {
        url: "listeningByKlassOrMegama",
        title: "דוח האזנה לפי כיתה או מגמה",
        filterFields: ["singleKlass", "singleMegama", "lessonWithAll", "dateRange"],
        isAdmin: false,
    },
    {
        url: "listeningByKlassAndLesson",
        title: "דוח האזנה לפי כיתה ומקצוע",
        filterFields: ["singleKlass", "singleLesson", "singleStudent", "dateRange"],
        isAdmin: false,
    },
    {
        url: "confByKlassAndLesson",
        title: "דוח ועידה לפי כיתה ומקצוע",
        filterFields: ["singleKlass", "singleLesson", "singleStudent", "dateRange"],
        isAdmin: false,
    },
    {
        url: "listeningByKlassPerStudent",
        title: "דוח האזנה כללי לכיתה",
        filterFields: ["singleKlass", "dateRange"],
        isAdmin: false,
    },
    {
        url: "confByKlassOrMegama",
        title: "דוח ועידה לפי כיתה או מגמה",
        filterFields: ["singleKlass", "singleMegama", "lessonWithAll", "dateRange"],
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
];
