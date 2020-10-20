export default [
    // {
    //     url: "sample",
    //     title: "sample",
    //     filterFields: ["dateRange"],
    //     isAdmin: false,
    // },
    {
        url: "listening",
        title: "נתוני האזנה",
        filterFields: ["klass", "lesson", "name", "dateRange", "secondRange"],
        isAdmin: false,
    },
    {
        url: "lesson",
        title: "נתוני שיעורים",
        filterFields: ["extension", "messageName"],
        isAdmin: false,
    },
    {
        url: "student",
        title: "נתוני תלמידים",
        filterFields: ["identityNumber", "name", "klass"],
        isAdmin: false,
    },
    {
        url: "conf",
        title: "נתוני ועידה",
        filterFields: ["name", "dateRange"],
        isAdmin: false,
    },
    {
        url: "user",
        title: "נתוני משתמשים",
        filterFields: [],
        isAdmin: true,
    },
    {
        url: "listeningByKlass",
        title: "נתוני האזנה לפי כיתה",
        filterFields: ["singleKlass", "dateRange"],
        isAdmin: false,
    },
    {
        url: "listeningByKlassAndLesson",
        title: "נתוני האזנה לפי כיתה ומקצוע",
        filterFields: ["singleKlass", "singleLesson", "dateRange"],
        isAdmin: false,
    },
    {
        url: "confByKlass",
        title: "נתוני ועידה לפי כיתה",
        filterFields: ["singleKlass", "dateRange"],
        isAdmin: false,
    },
];
