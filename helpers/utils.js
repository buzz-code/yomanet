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
    } else {
        if (format === "PDF") {
            if (specialType === "diploma") {
                return getDiplomaReportObject(title, results, headers);
            } else {
                return getPdfReportObject(title, results, headers);
            }
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
    for (const res of results) {
        for (const key of headers) {
            const [x, length] = key.label.split(" - ");
            if (length) {
                const timeParts = length.split(":").reverse().map(Number);
                let sec = 0;
                while (timeParts.length) {
                    sec = sec * 60 + timeParts.pop();
                }
                const score = Math.floor(Math.min(1, (res[key.value] || 0) / sec) * 100);
                res[key.value] = score;
            }
        }
    }
    headers.filter((item) => item.format === "sec2min").forEach((item) => (item.format = "percent"));
    return getReport(url, format, title, results, headers);
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
    getTableCellValue,
    getTableDataResponse,
    createReport,
    createGraphReport,
    sendReportByMail,
    getPagingConfig,
    getDateList,
    promiseAllSerial,
};
