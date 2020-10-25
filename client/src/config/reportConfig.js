export default [
    {
        url: "listeningByKlass",
        title: "נתוני האזנה לפי כיתה - שיעורים",
        filterFields: ["singleKlass", "lesson", "dateRange"],
        isAdmin: false,
    },
    {
        url: "listeningByMegama",
        title: "נתוני האזנה לפי מגמה - שיעורים",
        filterFields: ["singleMegama", "lesson", "dateRange"],
        isAdmin: false,
    },
    {
        url: "listeningByKlassAndLesson",
        title: "נתוני האזנה לפי כיתה ומקצוע - שלוחות",
        filterFields: ["singleKlass", "singleLesson", "dateRange"],
        isAdmin: false,
    },
    {
        url: "listeningByKlassPerStudent",
        title: "נתוני האזנה לפי כיתה - תלמידות",
        filterFields: ["singleKlass", "dateRange"],
        isAdmin: false,
    },
    {
        url: "confByKlass",
        title: "נתוני ועידה לפי כיתה",
        filterFields: ["singleKlass", "dateRange"],
        isAdmin: false,
    },
];
