const ExcelJS = require("exceljs");
const contentDisposition = require("content-disposition");
const { getTableCellValue } = require("./data");

const createExcelReport = async (res, title, results, headers) => {
    res.writeHead(200, {
        "Content-Disposition": contentDisposition(title + ".xlsx"),
        "Transfer-Encoding": "chunked",
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    var workbook = new ExcelJS.stream.xlsx.WorkbookWriter({ stream: res, useStyles: true });
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
    workbook.commit();
};

module.exports = {
    createExcelReport,
};
