import { TableBody } from "@mui/material";
import React, { useState } from "react";
import useTable from "../../../hooks/useTable";
import TableRow from "../../TableRow/TableContextMenu";

const headCells = [
  { id: "date", numeric: false, label: "Ngày khám" },
  { id: "doctorExamines", numeric: false, label: "Bác sĩ khám" },
  { id: "note", numeric: false, label: "Ghi chú" },
  { id: "diagnostic", numeric: false, label: "Chuẩn đoán" },
  { id: "conclude", numeric: false, label: "Kết luận" },
];
const records = [
  {
    id:1,
    date: new Date().toDateString(),
    doctorExamines: "bui quang huu",
    note: "kham bth",
    conclude: "trang thai",
    diagnostic: "trang thai",
  },
  {
    id:2,
    date: new Date().toDateString(),
    doctorExamines: "bui quang huu",
    note: "kham bth",
    diagnostic: "trang thai",
    conclude: "trang thai",
  },
  {
    id:3,
    date: new Date().toDateString(),
    doctorExamines: "bui quang huu",
    note: "kham bth",
    conclude: "trang thai",
    diagnostic: "trang thai",
  },
];
function ExaminationHistory() {
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, headCells, filterFn);
  return (
    <>
      <TblContainer>
        <TblHead />
        <TableBody
          style={{ overflowY: "scroll", height: "440px", display: "block" }}
        >
          {recordsAfterPagingAndSorting().map((item) => {
            return (
              <TableRow
                key={item.id}
                item={item}
                headCells={headCells}
                listItemMenu={[{ title: "Xóa" }]}
              />
            );
          })}
        </TableBody>
      </TblContainer>
      <TblPagination />
    </>
  );
}

export default ExaminationHistory;
