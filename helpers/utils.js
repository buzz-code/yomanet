const moment = require("moment");
const constants = require("./constants");
const { getTableCellValue } = require("./format");
const { getPdfReportObject } = require("./pdfReport");
const { getExcelReportObject } = require("./excelReport");
const { getDiplomaReportObject } = require("./diplomaReport");
const { sendReportByEmail } = require("./mailer");
const { getGraphReportObject } = require("./graphReport");

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

const createReport = async (res, url, format, title, results, headers) => {
    let report = null;
    if (format === "PDF") {
        if (url !== "/diploma") {
            report = await getPdfReportObject(title, results, headers);
        } else {
            report = await getDiplomaReportObject(title, results, headers);
        }
    } else if (format === "EXCEL") {
        report = await getExcelReportObject(title, results, headers);
    }
    res.attachment(report.fileName);
    res.end(report.buffer);
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

module.exports = {
    getTableCellValue,
    getTableDataResponse,
    createReport,
    createGraphReport,
    sendReportByMail,
    getPagingConfig,
    getDateList,
};
