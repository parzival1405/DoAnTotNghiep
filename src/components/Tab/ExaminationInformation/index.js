import { Grid } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { resolve } from "../../../utils/Calc";
import InputLabel from "../../Form/ControlsLabel/InputLabel";

function ExaminationInformation() {
  const { currentPatient } = useSelector((state) => state.currentPatient);

  return (
    <>
      <Grid container rowSpacing={1}>
        <InputLabel
          label="Bệnh nhân"
          value={resolve(currentPatient, "patient.fullName")}
          require={true}
          size={[2, 3]}
        />
        <Grid item xs={2} />
        <InputLabel
          label="Tuổi"
          value={resolve(currentPatient, "patient.dateOfBirth")}
          size={[2, 3]}
        />
        <InputLabel
          label="Nhân viên tiếp đón"
          value={resolve(currentPatient, "reception.fullName")}
          require={true}
          size={[2, 3]}
        />
        <Grid item xs={2} />
        <InputLabel
          label="Điện thoại"
          value={resolve(currentPatient, "patient.phoneNumber")}
          size={[2, 3]}
        />
        <InputLabel
          label="Loại khám"
          value={resolve(currentPatient, "patient.fullName")}
          require={true}
          size={[2, 3]}
        />
        <Grid item xs={2} />
        <InputLabel
          label="Ngày lập"
          value={resolve(currentPatient, "patient.createdDate")}
          require={true}
          size={[2, 3]}
        />
        <InputLabel
          label="Bác sĩ khám"
          value={resolve(currentPatient, "doctor.fullName")}
          require={true}
          size={[2, 3]}
        />
        <Grid item xs={2} />
        <InputLabel
          label="Tổng tiền"
          value={resolve(currentPatient, "totalPrice")}
          size={[2, 3]}
        />
        <InputLabel
          label="Ghi chú"
          value={resolve(currentPatient, "medicalExaminationDetailsResponses")}
          size={[2, 10]}
        />
        <InputLabel
          label="Cân nặng"
          value={resolve(currentPatient, "patient.weight")}
          size={[2, 2]}
        />
        <InputLabel
          label="Chiều cao"
          value={resolve(currentPatient, "patient.height")}
          size={[2, 2]}
        />
        <InputLabel
          label="Mạch"
          value={resolve(currentPatient, "pulse")}
          size={[2, 2]}
        />
        <InputLabel
          label="Huyết áp"
          value={resolve(currentPatient, "bloodPressure")}
          size={[2, 2]}
        />
        <InputLabel
          label="Nhiệt độ"
          value={resolve(currentPatient, "temperature")}
          size={[2, 2]}
        />
        <InputLabel
          label="Para"
          value={resolve(currentPatient, "para")}
          size={[2, 2]}
        />
        <InputLabel
          label="Dấu hiệu lâm sàng"
          value={resolve(currentPatient, "patient.medicalExaminationDetailsResponses")}
          size={[2, 10]}
        />
        <InputLabel
          label="Mã bệnh ICD10"
          value={resolve(currentPatient, "patient.medicalExaminationDetailsResponses")}
          size={[2, 10]}
        />
        <InputLabel
          label="Chuẩn đoán lâm sàng"
          value={resolve(currentPatient, "patient.medicalExaminationDetailsResponses")}
          size={[2, 10]}
        />
        <InputLabel
          label="Bệnh lý"
          value={resolve(currentPatient, "patient.medicalExaminationDetailsResponses")}
          size={[2, 3]}
        />
        <Grid item xs={2} />
        <InputLabel
          label="Kết luận"
          value={resolve(currentPatient, "patient.medicalExaminationDetailsResponses")}
          size={[2, 3]}
        />
        <InputLabel
          label="Dấu hiệu lâm sàng"
          value={resolve(currentPatient, "patient.medicalExaminationDetailsResponses")}
          size={[2, 10]}
        />
      </Grid>
    </>
  );
}

export default ExaminationInformation;
