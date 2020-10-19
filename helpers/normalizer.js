const constants = require("./constants");
const puppeteer = require("puppeteer");
const moment = require("moment");
const { createHtml } = require("./report");
const { getTableCellValue } = require("./data");

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

const createReport = async (res, title, results, headers) => {
    const html = createHtml(title, results, headers);
    const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
    const pdf = await browser.newPage();
    await pdf.setContent(html);
    const buffer = await pdf.pdf({
        format: "A4",
        printBackground: true,
        landscape: true,
        margin: {
            left: "20px",
            top: "20px",
            right: "20px",
            bottom: "20px",
        },
    });
    await browser.close();
    res.attachment(title + ".pdf");
    res.end(buffer);
};

function getPagingConfig(page) {
    if (page === -1) {
        return {
            skip: 0,
            limit: Number.MAX_VALUE,
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
