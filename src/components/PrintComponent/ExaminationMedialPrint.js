import React from "react";
import { useSelector } from "react-redux";
import useStyles from "./style";
import { Grid } from "@mui/material";
export const MedicalExaminationPrint = React.forwardRef((props, ref) => {
  const { currentPatient } = useSelector((state) => state.currentPatient);
  const classes = useStyles();
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
            </Grid>
          </div>
        </div>
        <p>Ghi chú:{currentPatient.note ? "không có" : currentPatient.note}</p>
      </div>
    )
  );
});
