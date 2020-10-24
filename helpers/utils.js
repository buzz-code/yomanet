const moment = require("moment");
const constants = require("./constants");
const { getTableCellValue } = require("./format");
const { createPdfReport } = require("./pdfReport");
const { createExcelReport } = require("./excelReport");

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

const createReport = (res, format, title, results, headers) => {
    if (format === "PDF") {
        createPdfReport(res, title, results, headers);
    } else if (format === "EXCEL") {
        createExcelReport(res, title, results, headers);
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
    getPagingConfig,
    getListOfPreviosDays,
};
