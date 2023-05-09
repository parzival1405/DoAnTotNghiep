import React, { useState } from "react";
import { useSelector } from "react-redux";
import useStyles from "./style";
import { Grid, TableBody } from "@mui/material";
import { headCellsClinicalServiceCurrentPatientPrint } from "../../utils/HeadCells";
import TableRow from "../TableRow/TableContextMenu";
import useTable from "../../hooks/useTable";
export const MedicalExaminationPrint = React.forwardRef((props, ref) => {
  const { currentPatient, clinicalService } = useSelector(
    (state) => state.currentPatient
  );
  const classes = useStyles();
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(clinicalService, headCellsClinicalServiceCurrentPatientPrint, filterFn);
  return (
    currentPatient && (
      <div ref={ref} className={classes.wrap}>
        <p>Phiếu khám bệnh</p>
        <h3>Phòng khám đa khoa Hidro</h3>
        <p className={classes.inf}>
          Địa chỉ:12 Nguyễn Văn Bảo, Phường 4, Gò Vấp, Thành phố Hồ Chí Minh
        </p>
        <p className={classes.inf}>Điện thoại: 0975247624</p>
        <div>
          <p>Thông tin bệnh nhân</p>
          <div>
            <Grid container gridTemplateRows={"repeat(12, 0.1fr)"}>
              <Grid item xs={4}>
                <p className={classes.inf}>
                  Mã bệnh nhân: {currentPatient.patient.id}
                </p>
              </Grid>
              <Grid item xs={4}>
                <p className={classes.inf}>
                  Tuổi: {currentPatient.patient.dayOfBirth}
                </p>
              </Grid>
              <Grid item xs={4}>
                <p className={classes.inf}>
                  Giới tính: {currentPatient.patient.sex ? "Nam" : "Nữ"}
                </p>
              </Grid>
              <Grid item xs={12}>
                <p className={classes.inf}>
                  Tên bệnh nhân: {currentPatient.patient.fullName}
                </p>
              </Grid>
              <Grid item xs={12}>
                <p className={classes.inf}>
                  Điện thoại: {currentPatient.patient.phoneNumber}
                </p>
              </Grid>
              <Grid item xs={12}>
                <p className={classes.inf}>Ghi chú: {currentPatient.note}</p>
              </Grid>
              <Grid item xs={4}>
                <p className={classes.inf}>Cân nặng: {currentPatient.weight}</p>
              </Grid>
              <Grid item xs={4}>
                <p className={classes.inf}>
                  Chiều cao: {currentPatient.height}
                </p>
              </Grid>
              <Grid item xs={4}>
                <p className={classes.inf}>Mạch: {currentPatient.heartbeat}</p>
              </Grid>
              <Grid item xs={4}>
                <p className={classes.inf}>
                  Huyết áp: {currentPatient.bloodPressure}
                </p>
              </Grid>
              <Grid item xs={4}>
                <p className={classes.inf}>
                  Nhiệt độ: {currentPatient.temperature}
                </p>
              </Grid>
              <Grid item xs={4}>
                <p className={classes.inf}>Para: {currentPatient.para}</p>
              </Grid>
              <Grid item xs={12}>
                <p className={classes.inf}>
                  Dấu hiệu Lâm sàng: {currentPatient.clinicalSign}
                </p>
              </Grid>
              <Grid item xs={12}>
                <p className={classes.inf}>Mã bệnh: {currentPatient.codeicd}</p>
              </Grid>
              <Grid item xs={12}>
                <p className={classes.inf}>Bệnh lý: ....</p>
              </Grid>
              <Grid item xs={12}>
                <p className={classes.inf}>
                  Chuẩn đoán Lâm sàng: {currentPatient.diagnose}
                </p>
              </Grid>
              <Grid item xs={12}>
                <p className={classes.inf}>kết luận: {currentPatient.result}</p>
              </Grid>
            </Grid>
          </div>

          {clinicalService && (
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
                      key={item.id}
                      item={item}
                      headCells={headCellsClinicalServiceCurrentPatientPrint}
                    />
                  );
                })}
              </TableBody>
            </TblContainer>
          )}
        </div>
        <p>Ghi chú:{currentPatient.note ? "không có" : currentPatient.note}</p>
      </div>
    )
  );
});
