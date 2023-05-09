import { Fade, Grid, Paper, Typography, TableBody } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ShowUpdateServiceCLSModal,
  hideModal,
} from "../../../redux/actions/modal";
import BaseModal from "../BaseModal";

import { makeStyles } from "@mui/styles";
import dayjs from "dayjs";
import ModalHeader from "../ModalHeader";
import { resolve } from "../../../utils/Calc";
import useTable from "../../../hooks/useTable";
import {
  headCellsClinicalServiceCurrentPatient,
  headCellsPrescriptionDetail,
} from "../../../utils/HeadCells";
import { GLOBALTYPES } from "../../../redux/actionType";
import TableRow from "../../TableRow/TableContextMenu";

const useStyle = makeStyles((theme) => ({
  mediaItem: {
    marginRight: "20px",
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    "& img": {
      borderRadius: ".5rem",
    },
    "& span": {
      position: "absolute",
      right: "-10px",
      top: "-10px",
      color: "#d32f2f",
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
  paper: {
    width: "100%",
    padding: "20px",
    width: "70%",
    height: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    overflowY: "scroll",
  },
  table: {
    margin: "0",
    "& th,& td": {
      padding: "10px",
    },
    "& .MuiRadio-root": {
      padding: "2px",
    },
    "& .MuiFormControlLabel-root": {
      margin: "0",
    },
  },
}));

function DetailedMedicalHistory() {
  const [hoveredRow, setHoveredRow] = useState(null);
  const isShowDetailedMedicalHistoryModal = useSelector(
    (state) => state.modal.isShowDetailedMedicalHistoryModal
  );
  const { open, typeOpenModal, data } = isShowDetailedMedicalHistoryModal;
  const classes = useStyle();
  const dispatch = useDispatch();
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const handleViewResult = (item) => {
    dispatch(ShowUpdateServiceCLSModal(GLOBALTYPES.DOCTOR_VIEW, item));
  };

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(
      data?.medicalExaminationDetailsResponses.filter(
        (item, index) => index !== 0
      ),
      headCellsClinicalServiceCurrentPatient,
      filterFn
    );

  const {
    TblContainer: TblContainer2,
    TblHead: TblHead2,
    TblPagination: TblPagination2,
    recordsAfterPagingAndSorting: recordsAfterPagingAndSorting2,
  } = useTable(
    data?.detailMedicineResponses,
    headCellsPrescriptionDetail,
    filterFn
  );

  const handleHideModal = () => {
    dispatch(hideModal("isShowDetailedMedicalHistoryModal"));
  };

  const body = (
    <Fade in={open}>
      <Paper className={classes.paper} id="modal-patient-reception">
        <ModalHeader
          title={"Chi tiết lịch sử khám"}
          onClose={handleHideModal}
        />

        {data && (
          <>
            <Grid container rowSpacing={1}>
              <Field
                variant={"body2"}
                label={"Tên bệnh nhân"}
                value={data["patient"]?.fullName}
                size={4}
              />
              <Field
                variant={"body2"}
                label="Tuổi"
                value={dayjs().diff(data["patient"]?.dateOfBirth, "year")}
                size={4}
              />
              <Field
                variant={"body2"}
                label="Điện thoại"
                value={data["patient"]?.phoneNumber}
                size={4}
              />
              <Field
                variant={"body2"}
                label="Nhân viên tiếp đón"
                value={data["reception"]?.fullName}
                size={12}
              />
              <Field
                variant={"body2"}
                label="Loại khám"
                value={
                  data["medicalExaminationDetailsResponses"][0]?.service?.name
                }
                size={6}
              />
              <Field
                variant={"body2"}
                label="Ngày lập"
                value={dayjs(resolve(data, "createdDate")).format("DD/MM/YYYY")}
                size={6}
              />
              <Field
                label="Bác sĩ khám"
                value={data["doctor"]?.fullName}
                variant={"body2"}
                size={6}
              />
              <Field
                label="Tổng tiền"
                value={data.totalPrice}
                variant={"body2"}
                size={12}
              />
              <Field
                label="Ghi chú"
                value={data?.note}
                variant={"body2"}
                size={12}
              />
              <Field
                label="Cân nặng"
                value={data?.weight}
                variant={"body2"}
                size={4}
              />
              <Field
                label="Chiều cao"
                value={data?.height}
                variant={"body2"}
                size={4}
              />
              <Field
                label="Mạch"
                value={data?.heartbeat}
                variant={"body2"}
                size={4}
              />
              <Field
                label="Huyết áp"
                value={data?.bloodPressure}
                variant={"body2"}
                size={4}
              />
              <Field
                label="Nhiệt độ"
                value={data?.temperature}
                variant={"body2"}
                size={4}
              />
              <Field
                label="Para"
                value={data?.para}
                variant={"body2"}
                size={4}
              />
              <Field
                label="Dấu hiệu lâm sàng"
                value={data?.clinicalSign}
                variant={"body2"}
                size={12}
              />
              <Field
                label="Mã bệnh ICD10"
                value={data?.codeicd}
                variant={"body2"}
                size={4}
              />
              <Field
                label="Chuẩn đoán lâm sàng"
                value={data?.diagnose}
                variant={"body2"}
                size={12}
              />
              <Field
                label="Bệnh lý"
                value={
                  data?.pathological}
                variant={"body2"}
                size={12}
              />
              <Field
                label="Kết luận"
                value={data?.result}
                variant={"body2"}
                size={12}
              />
            </Grid>
            <Grid container rowSpacing={1} mt={1}>
              <Typography variant="h5" gutterBottom>
                Dịch vụ cận lâm sàng
              </Typography>
            </Grid>
            {data?.medicalExaminationDetailsResponses.length > 0 && (
              <TblContainer>
                <TblHead />
                <TableBody
                  style={{
                    overflowY: "scroll",
                    height: "340px",
                    display: "block",
                  }}
                >
                  {recordsAfterPagingAndSorting().map((item) => {
                    return (
                      <TableRow
                        handleDoubleClick={() => handleViewResult(item)}
                        key={item.id}
                        item={item}
                        headCells={headCellsClinicalServiceCurrentPatient}
                        listItemMenu={[
                          {
                            title: "Xem kết quả",
                            onClick: () => handleViewResult(item),
                          },
                        ]}
                      />
                    );
                  })}
                </TableBody>
              </TblContainer>
            )}
            <Grid container rowSpacing={1} mt={1}>
              <Typography variant="h5" gutterBottom>
                Đơn thuốc
              </Typography>
            </Grid>
            {data?.detailMedicineResponses.length > 0 && (
              <TblContainer2>
                <TblHead2 />
                <TableBody
                  style={{
                    overflowY: "scroll",
                    height: "340px",
                    display: "block",
                  }}
                >
                  {recordsAfterPagingAndSorting2().map((item) => {
                    return (
                      <TableRow
                        key={item.id}
                        item={item}
                        headCells={headCellsPrescriptionDetail}
                      />
                    );
                  })}
                </TableBody>
              </TblContainer2>
            )}
          </>
        )}
      </Paper>
    </Fade>
  );
  return <BaseModal body={body} isShow={open} />;
}

function Field({ variant, label, value, size }) {
  return (
    <Grid item xs={size}>
      <Typography
        style={{
          display: "inline-block",
          maxWidth: "100%",
          wordWrap: "break-word",
        }}
        variant={variant}
        gutterBottom
      >
        {label} : {value}
      </Typography>
    </Grid>
  );
}

export default React.memo(DetailedMedicalHistory);
