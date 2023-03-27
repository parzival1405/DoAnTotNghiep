import { Grid } from "@mui/material";
import { Form, Formik } from "formik";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPatient } from "../../../redux/actions/currentPatient";
import { resolve } from "../../../utils/Calc";
import InputLabel from "../../Form/ControlsLabel/InputLabel";

const initialValues = {
};

function ExaminationInformation() {
  const { currentPatient } = useSelector((state) => state.currentPatient);
  const dispatch = useDispatch();
  const isMountedFormRef = useRef();
 
  const handleChangeValues=(e,handleChange)=>{
    handleChange(e)
    dispatch(updateCurrentPatient(e.target.name,e.target.value))
  }

  return (
    <>
      <Formik
        initialValues={currentPatient || initialValues}
        //   validationSchema={validateionChangeGroupName}
        innerRef={isMountedFormRef}
      >
        {({
          values,
          errors,
          touched,
          resetForm,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => (
          <Form action="" noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Grid container rowSpacing={1}>
              <InputLabel
                label="Bệnh nhân"
                name="patient.fullName"
                value={values["patient"]?.fullName}
                require={true}
                size={[2, 3]}
                onChange={(e) => handleChangeValues(e,handleChange)}
              />
              <Grid item xs={2} />
              <InputLabel
                label="Tuổi"
                // value={resolve(currentPatient, "patient.dateOfBirth")}
                name="patient.dateOfBirth"
                value={values["patient"]?.dateOfBirth}
                size={[2, 3]}
                onChange={handleChange}
              />
              <InputLabel
                label="Nhân viên tiếp đón"
                // value={resolve(currentPatient, "reception.fullName")}
                name="reception.fullName"
                value={values["reception"]?.fullName}
                require={true}
                size={[2, 3]}
                onChange={handleChange}
              />
              <Grid item xs={2} />
              <InputLabel
                label="Điện thoại"
                // value={resolve(currentPatient, "patient.phoneNumber")}
                name="patient.phoneNumber"
                value={values["patient"]?.phoneNumber}
                size={[2, 3]}
                onChange={handleChange}
              />
              <InputLabel
                label="Loại khám"
                value={resolve(currentPatient, "patient.fullName")}
                // name="patient.phoneNumber"
                // value={values["patient"]?.phoneNumber}
                require={true}
                size={[2, 3]}
                onChange={handleChange}
              />
              <Grid item xs={2} />
              <InputLabel
                label="Ngày lập"
                value={resolve(currentPatient, "patient.createdDate")}
                // name="patient.phoneNumber"
                // value={values["patient"]?.phoneNumber}
                require={true}
                size={[2, 3]}
                onChange={handleChange}
              />
              <InputLabel
                label="Bác sĩ khám"
                // value={resolve(currentPatient, "doctor.fullName")}
                name="doctor.fullName"
                value={values["doctor"]?.fullName}
                require={true}
                size={[2, 3]}
                onChange={handleChange}
              />
              <Grid item xs={2} />
              <InputLabel
                label="Tổng tiền"
                // value={resolve(currentPatient, "totalPrice")}
                name="totalPrice"
                value={values.totalPrice}
                size={[2, 3]}
                onChange={handleChange}
              />
              <InputLabel
                label="Ghi chú"
                // value={resolve(
                //   currentPatient,
                //   "medicalExaminationDetailsResponses"
                // )}
                name="note"
                value={values?.note}
                size={[2, 10]}
                onChange={(e) => handleChangeValues(e,handleChange)}
              />
              <InputLabel
                label="Cân nặng"
                // value={resolve(currentPatient, "patient.weight")}
                name="weight"
                value={values?.weight}
                size={[2, 2]}
                onChange={(e) => handleChangeValues(e,handleChange)}
              />
              <InputLabel
                label="Chiều cao"
                // value={resolve(currentPatient, "patient.height")}
                name="height"
                value={values?.height}
                size={[2, 2]}
                onChange={(e) => handleChangeValues(e,handleChange)}
              />
              <InputLabel
                label="Mạch"
                // value={resolve(currentPatient, "pulse")}
                name="heartbeat"
                value={values?.heartbeat}
                size={[2, 2]}
                onChange={(e) => handleChangeValues(e,handleChange)}
              />
              <InputLabel
                label="Huyết áp"
                // value={resolve(currentPatient, "bloodPressure")}
                name="bloodPressure"
                value={values?.bloodPressure}
                size={[2, 2]}
                 onChange={(e) => handleChangeValues(e,handleChange)}
              />
              <InputLabel
                label="Nhiệt độ"
                // value={resolve(currentPatient, "temperature")}
                name="temperature"
                value={values?.temperature}
                size={[2, 2]}
                 onChange={(e) => handleChangeValues(e,handleChange)}
              />
              <InputLabel
                label="Para"
                // value={resolve(currentPatient, "para")}
                name="para"
                value={values?.para}
                size={[2, 2]}
                 onChange={(e) => handleChangeValues(e,handleChange)}
              />
              <InputLabel
                label="Dấu hiệu lâm sàng"
                // value={resolve(
                //   currentPatient,
                //   "patient.medicalExaminationDetailsResponses"
                // )}
                name="diagnose"
                value={values?.diagnose}
                size={[2, 10]}
                 onChange={(e) => handleChangeValues(e,handleChange)}
              />
              <InputLabel
                label="Mã bệnh ICD10"
                value={resolve(
                  currentPatient,
                  "patient.medicalExaminationDetailsResponses"
                )}
                size={[2, 10]}
                 onChange={(e) => handleChangeValues(e,handleChange)}
              />
              <InputLabel
                label="Chuẩn đoán lâm sàng"
                value={resolve(
                  currentPatient,
                  "patient.medicalExaminationDetailsResponses"
                )}
                size={[2, 10]}
                 onChange={(e) => handleChangeValues(e,handleChange)}
              />
              <InputLabel
                label="Bệnh lý"
                value={resolve(
                  currentPatient,
                  "patient.medicalExaminationDetailsResponses"
                )}
                size={[2, 3]}
                 onChange={(e) => handleChangeValues(e,handleChange)}
              />
              <Grid item xs={2} />
              <InputLabel
                label="Kết luận"
                name="result"
                value={values?.result}
                size={[2, 3]}
                onChange={(e)=>handleChangeValues(e,handleChange)}
              />
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default ExaminationInformation;
