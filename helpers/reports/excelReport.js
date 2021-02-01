const ExcelJS = require("exceljs");
const contentDisposition = require("content-disposition");
const { getTableCellValue } = require("../format");

const colFormat = {
    ["sec2minExcel"]: "HH:mm:ss",
    ["percentExcel"]: "0%",
};

const getExcelReportObject = async (title, results, headers) => {
    var workbook = new ExcelJS.stream.xlsx.WorkbookWriter({ useStyles: true });
    var worksheet = workbook.addWorksheet("גליון 1");
    headers.forEach((item) => (item.format === "sec2min" ? (item.format = "sec2minExcel") : null));
    headers.forEach((item) => (item.format === "percent" ? (item.format = "percentExcel") : null));
    worksheet.columns = headers.map((item) => ({
        header: item.label,
        key: item.value,
        style: {
            numFmt: colFormat[item.format],
        },
    }));
    const headerRow = worksheet.getRow(1);
    headerRow.height = 40;
    headerRow.eachCell((cell) => {
        cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "563d7c" },
        };
        cell.font = {
            size: 12,
            bold: true,
            color: { argb: "ffffff" },
        };
        cell.alignment = {
            wrapText: true,
        };
    });
    results.forEach((item) => {
        const row = {};
        headers.forEach((header) => (row[header.value] = getTableCellValue(item, header)));
        worksheet.addRow(row);
    });
    worksheet.commit();
    await workbook.commit();

    const stream = workbook.stream;
    const buffer = stream.read();

    return {
        fileName: title + ".xlsx",
        buffer,
    };
};

module.exports = {
    getExcelReportObject,
};
