import { TableBody } from "@mui/material";
import React, { useState } from "react";
import useTable from "../../../hooks/useTable";
import TableCollapsible from "../../TableRow/TableCollapsible";
import {
  headCellsPrescription,
  headCollapseCellsPrescription,
} from "../../../utils/HeadCells";
import { useSelector } from "react-redux";

function Prescription() {
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const { historyMedicine } = useSelector((state) => state.currentPatient);
  console.log(historyMedicine);
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(historyMedicine, headCellsPrescription, filterFn);
  return (
    <>
      <TblContainer>
        <TblHead />
        <TableBody
          style={{ overflowY: "scroll", height: "440px", display: "block" }}
        >
          {recordsAfterPagingAndSorting().map((item) => {
            return (
              <TableCollapsible
                key={item.id}
                item={item}
                headCells={headCellsPrescription}
                headCollapseCells={headCollapseCellsPrescription}
              />
            );
          })}
        </TableBody>
      </TblContainer>
      <TblPagination />
    </>
  );
}

export default Prescription;
