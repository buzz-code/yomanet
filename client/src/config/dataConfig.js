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
        filterFields: ["klass", "singleMegama", "lessonWithAll", "singleStudent", "dateRange", "secondRange"],
        isAdmin: false,
    },
    {
        url: "lesson",
        title: "נתוני שיעורים",
        filterFields: ["extension", "messageName", "klass", "megama"],
        isAdmin: false,
    },
    {
        url: "student",
        title: "נתוני תלמידים",
        filterFields: ["identityNumber", "name", "klass", "singleMegama"],
        isAdmin: false,
    },
    {
        url: "conf",
        title: "נתוני ועידה",
        filterFields: ["klass", "singleMegama", "lessonWithAll", "singleStudent", "dateRange"],
        isAdmin: false,
    },
    {
        url: "record",
        title: "נתוני שיעורים מוקלטים",
        filterFields: ["klass", "singleMegama", "lessonWithAll", "singleStudent", "dateRange"],
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
        isEditable: true,
    },
];
