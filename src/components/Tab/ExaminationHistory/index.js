import { TableBody } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useTable from "../../../hooks/useTable";
import { GLOBALTYPES } from "../../../redux/actionType";
import { ShowDetailedMedicalHistoryModal } from "../../../redux/actions/modal";
import { headCellsMedicalExaminationHistory } from "../../../utils/HeadCells";
import TableRow from "../../TableRow/TableContextMenu";

function ExaminationHistory() {
  const dispatch = useDispatch();
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const { historyMedicalExamination } = useSelector(
    (state) => state.currentPatient
  );

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(
      historyMedicalExamination,
      headCellsMedicalExaminationHistory,
      filterFn
    );

  const handleViewMedicalExaminationHistoryResult = (item) => {
    dispatch(ShowDetailedMedicalHistoryModal(GLOBALTYPES.ADD, item));
  };
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
                handleDoubleClick={() =>
                  handleViewMedicalExaminationHistoryResult(item)
                }
                key={item.id}
                item={item}
                headCells={headCellsMedicalExaminationHistory}
                listItemMenu={[
                  {
                    title: "Xem chi tiết",
                    onClick: () =>
                      handleViewMedicalExaminationHistoryResult(item),
                  },
                ]}
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
