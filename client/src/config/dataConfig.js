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
        url: "file",
        title: "קבצים שהועלו",
        filterFields: [],
        isAdmin: false,
    },
    {
        url: "user",
        title: "נתוני משתמשים",
        filterFields: [],
        isAdmin: true,
    },
];
