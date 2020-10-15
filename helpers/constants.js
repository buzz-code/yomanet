const moment = require("moment");

module.exports = {
    listeningTableHeaders: [
        { label: "שלוחה", value: "extension" },
        { label: "השמעה", value: "listening" },
        { label: "טלפון", value: "phone" },
        { label: "סוג זיהוי", value: "identityType" },
        { label: "מספר זיהוי", value: "identityNumber" },
        { label: "שם", value: "name" },
        { label: "עברי", value: "hebrew" },
        { label: "תאריך", value: "date", format: (text) => moment(text, "dd/MM/yyyy").toDate() },
        { label: "התחלה שעה", value: "startTime" },
        { label: "נקודת התחלה", value: "startPoint" },
        { label: "נקודת יציאה", value: "endPoint" },
        { label: "יציאה זמן", value: "endTime" },
        { label: "סה''כ שניות", value: "seconds", format: (text) => Number(text) },
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
    pageSize: 20,
};
