import { TableBody } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import useTable from "../../../hooks/useTable";
import TableRow from "../../TableRow/TableContextMenu";
import {headCellsMedicalExaminationHistory} from "../../../utils/HeadCells"

function ExaminationHistory() {
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const {historyMedicalExamination} = useSelector((state) => state.currentPatient);

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(historyMedicalExamination, headCellsMedicalExaminationHistory, filterFn);

  return (
    <>
      <TblContainer>
        <TblHead />
        <TableBody
          style={{ overflowY: "scroll", height: "420px", display: "block" }}
        >
          {recordsAfterPagingAndSorting().map((item) => {
            return (
              <TableRow
                key={item.id}
                item={item}
                headCells={headCellsMedicalExaminationHistory}
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
