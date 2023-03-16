import { Close, LabelOutlined, Save } from "@mui/icons-material";
import {
  Fade,
  Grid,
  InputAdornment,
  Paper,
  RadioGroup,
  TableBody,
  TextField,
} from "@mui/material";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideModal } from "../../../redux/actions/modal";
import InputLabel from "../../Form/ControlsLabel/InputLabel";
import BaseModal from "../BaseModal";

import { makeStyles } from "@mui/styles";
import ModalHeader from "../ModalHeader";
import Controls from "../../Form/controls/Controls";
import useTable from "../../../hooks/useTable";
import TableRow from "../../TableRow/TableContextMenu";
import SelectedLabel from "../../Form/ControlsLabel/SelectLabel";
import DateLabel from "../../Form/ControlsLabel/DateLabel";
import { type } from "../../../utils/TypeOpen";
import { GLOBALTYPES } from "../../../redux/actionType";
import * as api from "../../../api";
import { saveExaminationLetter } from "../../../redux/actions/medicalLetter";
const useStyle = makeStyles((theme) => ({
  paper: {
    width: "70%",
    padding: "20px",
  },
  action: {
    display: "flex",
    width: "100%",
    paddingTop: "10px",
    justifyContent: "flex-end",
  },
  table: {
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
  gridCustomInput: {
    "& .MuiInputBase-input": {
      padding: "6px",
    },
  },
}));

const optionsSex = [
  {
    id: "male",
    title: "Nam",
  },
  { id: "female", title: "Nữ" },
];

const optionsAppointment = [
  {
    id: "reExamination",
    title: "Tái khám",
  },
  { id: "newExamination", title: "Khám mới" },
];

const optionsTimeSlot = [
  {
    id: "1",
    title: "9h - 10h",
  },
  { id: "2", title: "10h - 11h" },
];

const optionsDoctor = [
  { id: 1, fullName: "BS 1" },
  {
    id: 2,
    fullName: "BS 2",
  },
  { id: 3, fullName: "BS 3" },
];

const initialValues = {
  patient: {
    phoneNumber: null,
    fullName: null,
    sex: null,
    address: null,
    email: null,
  },
  doctor: null,
  diagnose: "",
  status: "WAIT",
  reception: {
    id: 1,
    fullName: "reception",
  },
  service: null,
};

function AddScheduleModal() {
  const { isShowAddScheduleModal } = useSelector((state) => state.modal);
  const { open, typeOpenModal, data } = isShowAddScheduleModal;
  const { services } = useSelector((state) => state.service);
  const { user } = useSelector((state) => state.auth);
  const classes = useStyle();
  const dispatch = useDispatch();

  const handleHideModal = () => {
    dispatch(hideModal("isShowAddScheduleModal"));
  };

  const changeSdt = async (e, handleChange, setFieldValue) => {
    handleChange(e);
    const callApiGetInfoPatient = async (e) => {
      const patientResponse = await api.findPatientByPhonenumber(
        e.currentTarget.value
      );
      if (patientResponse) {
        setFieldValue("patient", patientResponse.data);
      }
    };
    if (e.currentTarget.value.length == 10) {
      callApiGetInfoPatient(e);
    }
  };

  const handleSubmitForm = (values) => {
    const data = {
      date:"2023-03-14",
      doctor_id: values.doctor.id,
      service_id: values.service.id,
      patientRequest: {
        phone_number: values.patient.phoneNumber,
        full_name: values.patient.phoneNumber,
        address: values.patient.phoneNumber,
        date_of_birth: "2001-07-20",
        sex: true,
      },
      creator_id: user.id,
      status: "WAIT",
      description: "Tai Kham",
    };
    dispatch(saveExaminationLetter(data));
    handleHideModal();
  };

  const body = (
    <Fade in={isShowAddScheduleModal.open}>
      <Paper className={classes.paper} id="modal-patient-reception">
        <ModalHeader title="Đặt lịch khám bệnh" onClose={handleHideModal} />
        <Formik
          initialValues={
            typeOpenModal == GLOBALTYPES.ADD ? initialValues : data
          }
          //   validationSchema={validateionChangeGroupName}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            handleSubmitForm(values);
            setSubmitting(true);
            resetForm();
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            resetForm,
            handleChange,
            handleSubmit,
            isSubmitting,
            setFieldValue,
          }) => (
            <Form
              action=""
              //   className={classes.form}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <Grid
                container
                rowSpacing={1}
                className={classes.gridCustomInput}
              >
                <InputLabel
                  disable={type(typeOpenModal)}
                  name="patient.fullName"
                  value={values["patient"]?.fullName}
                  label="Bệnh nhân"
                  onChange={handleChange}
                  require={true}
                  size={[2, 6]}
                />
                {/* <Grid item xs={2} /> */}
                <SelectedLabel
                  accessField="title"
                  disable={type(typeOpenModal)}
                  options={optionsSex}
                  setFieldValue={setFieldValue}
                  label="Giới tính"
                  name="patient.sex"
                  value={values["patient"]?.sex}
                  require={true}
                  size={[2, 2]}
                />
                <InputLabel
                  disable={type(typeOpenModal)}
                  label="Điện thoại liên hệ"
                  name="patient.phoneNumber"
                  require={true}
                  size={[2, 2]}
                  value={values["patient"]?.phoneNumber}
                  onChange={(e) => changeSdt(e, handleChange, setFieldValue)}
                />
                {/* <Grid item xs={2} /> */}
                <DateLabel
                  disable={type(typeOpenModal)}
                  value={values["patient"]?.dateOfBirth}
                  label="Ngày sinh"
                  onChange={handleChange}
                  size={[2, 2]}
                />
                <InputLabel
                  disable={type(typeOpenModal)}
                  onChange={handleChange}
                  name="patient.email"
                  label="Email"
                  value={values["patient"]?.email}
                  size={[2, 2]}
                />
                {/* <Grid item xs={2} /> */}
                <InputLabel
                  disable={type(typeOpenModal)}
                  name="patient.address"
                  onChange={handleChange}
                  value={values["patient"]?.address}
                  label="Địa chỉ"
                  size={[2, 10]}
                />
                <DateLabel
                  disable={type(typeOpenModal)}
                  currentDate={true}
                  label="Ngày Khám"
                  require={true}
                  size={[2, 3]}
                />
                <Grid item xs={3} />
                <SelectedLabel
                  disable={type(typeOpenModal)}
                  accessField="title"
                  options={optionsTimeSlot}
                  setFieldValue={setFieldValue}
                  label="Khung giờ"
                  size={[2, 2]}
                />
                <SelectedLabel
                  disable={type(typeOpenModal)}
                  options={services}
                  accessField={"name"}
                  setFieldValue={setFieldValue}
                  name="service"
                  value={values?.service}
                  label="Loại khám"
                  require={true}
                  size={[2, 2]}
                />
                <InputLabel
                  disable={true}
                  value={values.service?.price}
                  label="Tổng tiền"
                  size={[2, 2]}
                />
                <SelectedLabel
                  disable={type(typeOpenModal)}
                  value={values?.doctor}
                  options={optionsDoctor}
                  accessField={"fullName"}
                  setFieldValue={setFieldValue}
                  name="doctor"
                  label="Bác sĩ khám"
                  size={[2, 2]}
                />
                <SelectedLabel
                  disable={type(typeOpenModal)}
                  accessField="title"
                  setFieldValue={setFieldValue}
                  options={optionsAppointment}
                  label="Kiểu hẹn khám"
                  size={[2, 3]}
                />
              </Grid>

              {/* button -------------------- */}
              <div className={classes.action}>
                <Controls.Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  isSubmitting={isSubmitting}
                  text="Lưu"
                  startIcon={<Save />}
                  sx={{ mr: 1 }}
                />

                <Controls.Button
                  variant="contained"
                  text="Hủy"
                  color="error"
                  startIcon={<Close />}
                  onClick={handleHideModal}
                />
              </div>
            </Form>
          )}
        </Formik>
      </Paper>
    </Fade>
  );
  return <BaseModal body={body} isShow={isShowAddScheduleModal.open} />;
}

export default AddScheduleModal;
