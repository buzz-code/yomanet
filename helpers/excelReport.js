const ExcelJS = require("exceljs");
const contentDisposition = require("content-disposition");
const { getTableCellValue } = require("./data");

const createExcelReport = async (res, title, results, headers) => {
    res.writeHead(200, {
        "Content-Disposition": contentDisposition(title + ".xlsx"),
        "Transfer-Encoding": "chunked",
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    var workbook = new ExcelJS.stream.xlsx.WorkbookWriter({ stream: res });
    var worksheet = workbook.addWorksheet(title);
    worksheet.addRow(headers.map((item) => item.label));
    //todo: check why not working
    worksheet.getRow(1).font = { color: { argb: "563d7c00" } };
    worksheet.getRow(1).commit();
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
