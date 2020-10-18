module.exports = {
    listeningHeaders: [
        { label: "שלוחה", value: "extension", order: 5 },
        { label: "השמעה", value: "listening", order: 6 },
        { label: "טלפון", value: "phone", order: 7 },
        { label: "סוג זיהוי", value: "identityType", order: 8 },
        { label: "מספר זיהוי", value: "identityNumber", order: 3 },
        { label: "שם", value: "name", order: 4 },
        { label: "עברי", value: "hebrew", order: 2 },
        { label: "תאריך", value: "date", order: 1, format: "date" },
        { label: "התחלה שעה", value: "startTime", order: 9 },
        { label: "נקודת התחלה", value: "startPoint", order: 11 },
        { label: "נקודת יציאה", value: "endPoint", order: 12 },
        { label: "יציאה זמן", value: "endTime", order: 10 },
        { label: "סה''כ דקות", value: "seconds", order: 13, format: "sec2min" },
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
