const ExcelJS = require("exceljs");
const contentDisposition = require("content-disposition");
const { getTableCellValue } = require("../format");

const getExcelReportObject = async (title, results, headers) => {
    var workbook = new ExcelJS.stream.xlsx.WorkbookWriter({ useStyles: true });
    var worksheet = workbook.addWorksheet(title);
    const header = worksheet.addRow(headers.map((item) => item.label));
    header.eachCell((cell) => {
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
    });
    header.commit();
    results.forEach((item) => {
        const row = headers.map((header) => getTableCellValue(item, header));
        worksheet.addRow(row).commit();
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
