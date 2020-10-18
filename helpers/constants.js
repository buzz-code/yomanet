module.exports = {
    listeningHeaders: [
        { label: "תאריך", value: "date", format: "date" },
        { label: "עברי", value: "hebrew" },
        { label: "מספר זיהוי", value: "identityNumber" },
        { label: "שם", value: "name" },
        { label: "שלוחה", value: "extension" },
        { label: "השמעה", value: "listening" },
        { label: "טלפון", value: "phone" },
        { label: "סוג זיהוי", value: "identityType" },
        { label: "התחלה שעה", value: "startTime" },
        { label: "יציאה זמן", value: "endTime" },
        { label: "נקודת התחלה", value: "startPoint" },
        { label: "נקודת יציאה", value: "endPoint" },
        { label: "סה''כ דקות", value: "seconds", format: "sec2min" },
    ],
    lessonHeaders: [
        { label: "שלוחה", value: "extension" },
        { label: "שם הודעה", value: "messageName" },
    ],
    studentHeaders: [
        { label: "תעודת זהות", value: "identityNumber" },
        { label: "שם", value: "name" },
        { label: "", value: "" },
        { label: "מחזור", value: "grade" },
        { label: "מספר כיתה", value: "classNum" },
    ],
    pageSize: 10,
};
