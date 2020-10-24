const moment = require("moment");
const constants = require("./constants");
const { getTableCellValue } = require("./format");
const { getPdfReportObject } = require("./pdfReport");
const { getExcelReportObject } = require("./excelReport");
const { sendReportByEmail } = require("./mailer");

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

const createReport = async (res, format, title, results, headers) => {
    let report = null;
    if (format === "PDF") {
        report = await getPdfReportObject(title, results, headers);
    } else if (format === "EXCEL") {
        report = await getExcelReportObject(title, results, headers);
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

function getListOfPreviosDays(count) {
    const today = moment.utc().startOf("day");
    let firstDay = moment(today).subtract(count, "day");
    const days = [];
    while (firstDay.isSameOrBefore(today)) {
        days.push(firstDay);
        firstDay = moment(firstDay).add(1, "day");
    }
    return days;
}

module.exports = {
    getTableCellValue,
    getTableDataResponse,
    createReport,
    sendReportByMail,
    getPagingConfig,
    getListOfPreviosDays,
};
