const ExcelJS = require("exceljs");

export const exportExcel = (by,header,record) => {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = by;
  workbook.lastModifiedBy = by;
  workbook.created = new Date();
  workbook.modified = new Date();
  workbook.lastPrinted = new Date();
  const sheet = workbook.addWorksheet('Sheet1');

  sheet.columns=header

  record.array.forEach(element => {
    sheet.addRow()
  });
};
