export default [
    {
        url: "listeningByKlass",
        title: "דוח האזנה לפי כיתה",
        filterFields: ["singleKlass", "lesson", "dateRange"],
        isAdmin: false,
    },
    {
        url: "listeningByMegama",
        title: "דוח האזנה לפי מגמה",
        filterFields: ["singleMegama", "lesson", "dateRange"],
        isAdmin: false,
    },
    {
        url: "listeningByKlassAndLesson",
        title: "דוח האזנה לפי כיתה ומקצוע",
        filterFields: ["singleKlass", "singleLesson", "dateRange"],
        isAdmin: false,
    },
    {
        url: "listeningByKlassPerStudent",
        title: "דוח האזנה כללי לכיתה",
        filterFields: ["singleKlass", "dateRange"],
        isAdmin: false,
    },
    {
        url: "confByKlass",
        title: "דוח ועידה לפי כיתה",
        filterFields: ["singleKlass", "lesson", "dateRange"],
        isAdmin: false,
    },
    {
        url: "confByMegama",
        title: "דוח ועידה לפי מגמה",
        filterFields: ["singleMegama", "lesson", "dateRange"],
        isAdmin: false,
    },
    {
        url: "diploma",
        title: "הנפקת תעודות לתלמידות",
        filterFields: ["singleKlass", "lesson", "dateRange"],
        isAdmin: false,
        filterProps: {
            isHideEmailButton: true,
            isHideExcelButton: true,
        },
    },
];
