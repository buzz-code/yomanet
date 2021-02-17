const moment = require("moment");
var JSZip = require("jszip");
const constants = require("./constants");
const { getTableCellValue } = require("./format");
const { getPdfReportObject } = require("./reports/pdfReport");
const { getExcelReportObject } = require("./reports/excelReport");
const { getDiplomaReportObject } = require("./reports/diplomaReport");
const { sendReportByEmail } = require("./mailer");
const { getGraphReportObject } = require("./reports/graphReport");

const getTableDataResponse = (res, results, totalCount, headers, params) => {
    results.forEach((item) => {
        headers.forEach((header) => {
            item[header.value] = getTableCellValue(item, header);
        });
    });

    const data = {
        results,
        pageCount: Math.ceil(totalCount / constants.pageSize),
        headers,
        params,
    };
    res.send(data);
};

const createReport = async (res, url, format, title, results, headers, specialType) => {
    let report = await getReport(url, format, title, results, headers, specialType);
    res.attachment(report.fileName);
    res.end(report.buffer);
};

const getReport = async (url, format, title, results, headers, specialType) => {
    if (specialType === "percent") {
        return getReportsPercentFile(url, format, title, results, headers);
    } else if (specialType === "grade") {
        return getReportsGradeFile(url, format, title, results, headers);
    } else if (specialType === "diploma") {
        return getReportsDiplomaFile(url, format, title, results, headers);
    } else {
        if (format === "PDF") {
            return getPdfReportObject(title, results, headers);
        } else if (format === "EXCEL") {
            return getExcelReportObject(title, results, headers);
        }
    }
};

const getReportsZipFile = async (url, format, title, results, headers) => {
    const reportPromise = results.map((item, index) =>
        getReport(url, format, title[index], results[index], headers[index])
    );
    const reports = await promiseAllSerial(reportPromise);

    var zip = new JSZip();
    reports.forEach((item) => zip.file(item.fileName, item.buffer));
    const buffer = await zip.generateAsync({ type: "nodebuffer" });
    return {
        fileName: "דוחות מקובצים.zip",
        buffer,
    };
};

const getReportsPercentFile = async (url, format, title, results, headers) => {
    for (const key of headers) {
        const parts = key.label.split(" - ");
        const length = parts.pop();
        if (length && length.indexOf(':') > -1) {
            const timeParts = length.split(":").reverse().map(Number);
            let sec = 0;
            while (timeParts.length) {
                sec = sec * 60 + timeParts.pop();
            }
            for (const res of results) {
                const score = Math.floor(Math.min(1, (res[key.value] || 0) / sec) * 100);
                res[key.value] = score;
            }
        }
    }
    headers.filter((item) => item.format === "sec2min").forEach((item) => (item.format = "percent"));
    return getReport(url, format, title, results, headers);
};

const getReportsGradeFile = async (url, format, title, results, headers) => {
    for (const key of headers) {
        const parts = key.label.split(" - ");
        const length = parts.pop();
        if (length && length.indexOf(':') > -1) {
            const timeParts = length.split(":").reverse().map(Number);
            let sec = 0;
            while (timeParts.length) {
                sec = sec * 60 + timeParts.pop();
            }
            for (const res of results) {
                const score = Math.floor(Math.min(1, (res[key.value] || 0) / sec) * 100);
                res[key.value] = getLabelForScore(score);
            }
        }
    }
    headers.filter((item) => item.format === "sec2min").forEach((item) => (item.format = null));
    return getReport(url, format, title, results, headers);
};

function getLabelForScore(score) {
    if (score >= 80) return 'נוכחות מלאה';
    if (score >= 60) return 'נוכחות';
    if (score >= 20) return 'נוכחות חסרה';
    return 'העדרות';
}

const getReportsDiplomaFile = async (url, format, title, results, headers) => {
    // if (format === "PDF") {
    //     return getDiplomaReportObject(title, results, headers);
    // } else if (format === "EXCEL") {
    const { listeningData, lessonInstances } = results;
    const data = [];
    listeningData.forEach(({ EnterId, name, klass, lessons, ...item }) => {
        headers
            .filter((item) => !lessons || !lessons.length || lessons.indexOf(item.value) > -1)
            .forEach((header) => {
                const lessonData = lessonInstances[header.value];
                const stats = item[header.value] || {};
                const percents = lessonData.map(([key, value]) => Math.min(1, (stats[key] || 0) / value));
                const avgPercent = percents.length ? percents.reduce((a, b) => a + b, 0) / percents.length : 0;
                const score = Math.floor(avgPercent * 100);
                const timeTotal = Object.values(stats).reduce((a, b) => a + b, 0);

                const line = {
                    EnterId,
                    name,
                    klass,
                    Folder: header.label,
                    count: lessonData.length,
                    timeTotal,
                    score,
                };
                data.push(line);
            });
    });

    headers = [
        { value: "EnterId", label: "מספר זיהוי" },
        { value: "name", label: "שם" },
        { value: "klass", label: "כיתה" },
        { value: "Folder", label: "שם השיעור" },
        { value: "count", label: "מספר שיעורים" },
        { value: "timeTotal", label: 'סה"כ האזנה', format: "sec2min" },
        { value: "score", label: "אחוז האזנה כולל", format: "percent" },
    ];

    return getReport(url, format, title, data, headers);
    // }
};

const createGraphReport = async (res, format, title, results) => {
    let report = null;
    if (format === "PDF") {
        report = await getGraphReportObject(title, results);
    }
    res.attachment(report.fileName);
    res.end(report.buffer);
};

const sendReportByMail = async (res, recipient, format, title, results, headers) => {
    let report = null;
    if (format === "PDF") {
        report = await getPdfReportObject(title, results, headers);
    } else if (format === "EXCEL") {
        report = await getExcelReportObject(title, results, headers);
    }
    try {
        await sendReportByEmail(recipient, title, report.buffer, report.fileName);
        res.send({ error: false, success: true });
    } catch (e) {
        res.send({ error: true, errorMessage: e });
    }
};

function getPagingConfig(page) {
    if (page === -1) {
        return {
            skip: 0,
            limit: Number.MAX_SAFE_INTEGER,
        };
    }

    return {
        skip: constants.pageSize * (page - 1),
        limit: constants.pageSize,
    };
}

function getDateList(fromDate, toDate) {
    const today = moment.utc().startOf("day");
    if (fromDate) {
        fromDate = moment.utc(fromDate);
    } else {
        fromDate = moment(today).subtract(constants.graphNumberOfDays, "day");
    }
    if (toDate) {
        toDate = moment.utc(toDate);
    } else {
        toDate = today;
    }
    const days = [];
    while (fromDate.isSameOrBefore(toDate)) {
        days.push(fromDate);
        fromDate = moment(fromDate).add(1, "day");
    }
    return days;
}

const promiseAllSerial = async (promises) => {
    const data = [];
    let index = 0;
    while (index < promises.length) {
        data.push(await promises[index]);
        index++;
    }

    return data;
};

module.exports = {
    getTableDataResponse,
    createReport,
    createGraphReport,
    sendReportByMail,
    getPagingConfig,
    getDateList,
    promiseAllSerial,
};
