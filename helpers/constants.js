module.exports = {
    lessonHeaders: [
        { label: "שלוחה", value: "extension" },
        { label: "שם הודעה", value: "messageName" },
        { label: "כיתה/ מגמה/ התמחות", value: "megama", format: "array" },
        { label: "השם לתעודה", value: "displayName" },
    ],
    studentHeaders: [
        { label: "תעודת זהות", value: "identityNumber" },
        { label: "שם", value: "name" },
        { label: "מחזור", value: "grade" },
        { label: "מספר כיתה", value: "classNum" },
        { label: "מגמה/ התמחות", value: "megama", format: "array" },
    ],
    userHeaders: [
        { value: "name", label: "שם משתמש" },
        { value: "email", label: "דוא''ל", editable: true },
        { value: "password", label: "סיסמא", editable: true, hidden: true },
        { value: "providerUsername", label: "שם משתמש למערכת חיצונית", editable: true, hidden: true },
        { value: "providerPassword", label: "סיסמא למערכת חיצונית", editable: true, hidden: true },
        { value: "providerIsPrivate", label: "חיבור פרטי למערכת חיצונית", editable: true, hidden: true },
        { value: "isPaid", label: "האם שילם?", editable: true, hidden: true },
        { value: "isAdmin", label: "מנהל" },
        { value: "listening", label: "האזנה" },
        { value: "conf", label: "ועידה" },
        { value: "record", label: "שיעורים מוקלטים" },
        { value: "lesson", label: "שיעורים" },
        { value: "student", label: "תלמידות" },
    ],
    fileHeaders: [
        { value: "fileName", label: "שם הקובץ" },
        { value: "createdAt", label: "הועלה בתאריך", format: "datetime" },
    ],
    yemotPlaybackHeaders: [
        { value: "Folder", label: "שלוחה" },
        { value: "Current", label: "השמעה" },
        { value: "Phone", label: "טלפון" },
        { value: "IdType", label: "סוג זיהוי" },
        { value: "EnterId", label: "מספר זיהוי" },
        { value: "ValName", label: "שם" },
        { value: "EnterHebrewDate", label: "עברי" },
        { value: "EnterDate", label: "תאריך", format: "date" },
        { value: "EnterTime", label: "שעת התחלה", format: "time" },
        { value: "ExitTime", label: "שעת סיום", format: "time" },
        { value: "PositionPlay", label: "נקודת התחלה" },
        { value: "PositionStop", label: "נקודת יציאה" },
        { value: "TimeTotal", label: "סה''כ שניות", format: "sec2min" },
        { value: "FileLength", label: "אורך השיעור", format: "sec2min" },
    ],
    yemotConfBridgeHeaders: [
        { value: "Folder", label: "שלוחה" },
        { value: "title", label: "שם השלוחה" },
        { value: "Phone", label: "טלפון" },
        { value: "IdType", label: "סוג זיהוי" },
        { value: "EnterId", label: "מספר זיהוי" },
        { value: "ValName", label: "שם" },
        { value: "EnterHebrewDate", label: "תאריך עברי" },
        { value: "EnterDate", label: "תאריך", format: "date" },
        { value: "EnterTime", label: "שעת כניסה", format: "time" },
        { value: "ExitTime", label: "שעת יציאה", format: "time" },
        { value: "ConfBridge", label: "חדר ועידה" },
        { value: "Type", label: "סוג כניסה" },
        { value: "TimeTotal", label: "סך הכל זמן", format: "sec2min" },
    ],
    yemotPlayDirHeaders: [
        { value: "Folder", label: "שלוחה" },
        { value: "Current", label: "קובץ" },
        { value: "Phone", label: "טלפון" },
        { value: "IdType", label: "סוג זיהוי" },
        { value: "EnterId", label: "מספר זיהוי" },
        { value: "ValName", label: "שם" },
        { value: "EnterHebrewDate", label: "תאריך עברי" },
        { value: "EnterDate", label: "תאריך", format: "date" },
        { value: "EnterTime", label: "שעת כניסה", format: "time" },
        { value: "ExitTime", label: "שעת יציאה", format: "time" },
        { value: "TimeTotal", label: "סך הכל זמן", format: "sec2min" },
    ],
    pageSize: 10,
    graphNumberOfDays: 14,
};
