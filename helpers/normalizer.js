const constants = require("./constants");
const puppeteer = require("puppeteer");
const moment = require("moment");
const { getTableCellValue } = require("./format");
const { createPdfReport } = require("./pdfReport");
const { createExcelReport } = require("./excelReport");

const normalizeListening = (data) => {
    return data;
};

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

module.exports = {
    normalizeListening,
    getTableCellValue,
    getTableDataResponse,
    createReport,
    getPagingConfig,
};
