import { Box, Button, Grid, Ite } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import InputLabel from "../../Form/controls/InputLabel";
import { makeStyles } from "@mui/styles";


const useStyles = makeStyles((theme) => ({
  box: {},
}));

function ExaminationInformation() {
  const patient = useSelector((state) => state.patient);

  return (
    <>
      <Grid container rowSpacing={1}>
        <InputLabel label="Bệnh nhân" require={true} size={[2, 3]} />
        <Grid item xs={2} />
        <InputLabel label="Tuổi" size={[2, 3]} />
        <InputLabel label="Nhân viên tiếp đón" require={true} size={[2, 3]} />
        <Grid item xs={2} />
        <InputLabel label="Điện thoại" size={[2, 3]} />
        <InputLabel label="Loại khám" require={true} size={[2, 3]} />
        <Grid item xs={2} />
        <InputLabel label="Ngày lập" require={true} size={[2, 3]} />
        <InputLabel label="Bác sĩ khám" require={true} size={[2, 3]} />
        <Grid item xs={2} />
        <InputLabel label="Tổng tiền" size={[2, 3]} />
        <InputLabel label="Ghi chú" size={[2, 10]} />
        <InputLabel label="Cân nặng" size={[2, 2]} />
        <InputLabel label="Chiều cao" size={[2, 2]} />
        <InputLabel label="Mạch" size={[2, 2]} />
        <InputLabel label="Huyết áp" size={[2, 2]} />
        <InputLabel label="Nhiệt độ" size={[2, 2]} />
        <InputLabel label="Para" size={[2, 2]} />
        <InputLabel label="Dấu hiệu lâm sàng" size={[2, 10]} />
        <InputLabel label="Mã bệnh ICD10" size={[2, 10]} />
        <InputLabel label="Chuẩn đoán lâm sàng" size={[2, 10]} />
        <InputLabel label="Bệnh lý" size={[2, 3]} />
        <Grid item xs={2} />
        <InputLabel label="Kết luận" size={[2, 3]} />
        <InputLabel label="Dấu hiệu lâm sàng" size={[2, 10]} />
      </Grid>
    </>
  );
}

export default ExaminationInformation;
