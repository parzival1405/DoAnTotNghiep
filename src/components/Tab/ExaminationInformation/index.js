import { Grid } from "@mui/material";
import { Form, Formik } from "formik";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPatient } from "../../../redux/actions/currentPatient";
import { resolve } from "../../../utils/Calc";
import InputLabel from "../../Form/ControlsLabel/InputLabel";
import dayjs, { Dayjs } from 'dayjs'
const initialValues = {};

function ExaminationInformation() {
  const { currentPatient } = useSelector((state) => state.currentPatient);
  const dispatch = useDispatch();
  const isMountedFormRef = useRef();
  const handleChangeValues = (e, handleChange) => {
    handleChange(e);
    dispatch(updateCurrentPatient(e.target.name, e.target.value));
  };

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
                onChange={(e) => handleChangeValues(e, handleChange)}
                disable={true}
              />
              <Grid item xs={2} />
              <InputLabel
                label="Tuổi"
                name="patient.dateOfBirth"
                value={dayjs().diff(values["patient"]?.dateOfBirth)}
                size={[2, 3]}
                onChange={handleChange}
                disable={true}
              />
              <InputLabel
                label="Nhân viên tiếp đón"
                name="reception.fullName"
                value={values["reception"]?.fullName}
                require={true}
                size={[2, 3]}
                onChange={handleChange}
                disable={true}
              />
              <Grid item xs={2} />
              <InputLabel
                label="Điện thoại"
                name="patient.phoneNumber"
                value={values["patient"]?.phoneNumber}
                size={[2, 3]}
                onChange={handleChange}
                disable={true}
              />
              <InputLabel
                label="Loại khám"
                // value={resolve(
                //   currentPatient?.medicalExaminationDetailsResponses[0],
                //   "serviceResponse.name"
                // )}
                value={values["medicalExaminationDetailsResponses"][0]?.service?.name}
                require={true}
                disable={true}
                size={[2, 3]}
                onChange={handleChange}
              />
              <Grid item xs={2} />
              <InputLabel
                label="Ngày lập"
                value={dayjs(resolve(currentPatient, "patient.createdDate")).format('DD/MM/YYYY')}
                require={true}
                size={[2, 3]}
                onChange={handleChange}
                disable={true}
              />
              <InputLabel
                label="Bác sĩ khám"
                name="doctor.fullName"
                value={values["doctor"]?.fullName}
                require={true}
                size={[2, 3]}
                onChange={handleChange}
                disable={true}
              />
              <Grid item xs={2} />
              <InputLabel
                label="Tổng tiền"
                name="totalPrice"
                value={values.totalPrice}
                size={[2, 3]}
                onChange={handleChange}
                disable={true}
              />
              <InputLabel
                label="Ghi chú"
                name="note"
                value={values?.note}
                size={[2, 10]}
                onChange={(e) => handleChangeValues(e, handleChange)}
                disable={true}
              />
              <InputLabel
                label="Cân nặng"
                name="weight"
                value={values?.weight}
                size={[2, 2]}
                onChange={(e) => handleChangeValues(e, handleChange)}
              />
              <InputLabel
                label="Chiều cao"
                name="height"
                value={values?.height}
                size={[2, 2]}
                onChange={(e) => handleChangeValues(e, handleChange)}
              />
              <InputLabel
                label="Mạch"
                name="heartbeat"
                value={values?.heartbeat}
                size={[2, 2]}
                onChange={(e) => handleChangeValues(e, handleChange)}
              />
              <InputLabel
                label="Huyết áp"
                name="bloodPressure"
                value={values?.bloodPressure}
                size={[2, 2]}
                onChange={(e) => handleChangeValues(e, handleChange)}
              />
              <InputLabel
                label="Nhiệt độ"
                name="temperature"
                value={values?.temperature}
                size={[2, 2]}
                onChange={(e) => handleChangeValues(e, handleChange)}
              />
              <InputLabel
                label="Para"
                name="para"
                value={values?.para}
                size={[2, 2]}
                onChange={(e) => handleChangeValues(e, handleChange)}
              />
              <InputLabel
                label="Dấu hiệu lâm sàng"
                name="clinicalSign"
                value={values?.clinicalSign}
                size={[2, 10]}
                onChange={(e) => handleChangeValues(e, handleChange)}
              />
              <InputLabel
                label="Mã bệnh ICD10"
                name="codeicd"
                value={values?.codeicd}
                size={[2, 10]}
                onChange={(e) => handleChangeValues(e, handleChange)}
              />
              <InputLabel
                label="Chuẩn đoán lâm sàng"
                name="diagnose"
                value={values?.diagnose}
                size={[2, 10]}
                onChange={(e) => handleChangeValues(e, handleChange)}
              />
              <InputLabel
                label="Bệnh lý"
                name="pathological"
                value={values?.pathological}
                size={[2, 3]}
                onChange={(e) => handleChangeValues(e, handleChange)}
              />
              <Grid item xs={2} />
              <InputLabel
                label="Kết luận"
                name="result"
                value={values?.result}
                size={[2, 3]}
                onChange={(e) => handleChangeValues(e, handleChange)}
              />
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default ExaminationInformation;
