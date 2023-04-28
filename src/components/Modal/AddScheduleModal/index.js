import { Close, Save, Start } from "@mui/icons-material";
import { Fade, Grid, Paper } from "@mui/material";
import { Form, Formik } from "formik";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideModal } from "../../../redux/actions/modal";
import InputLabel from "../../Form/ControlsLabel/InputLabel";
import BaseModal from "../BaseModal";

import { makeStyles } from "@mui/styles";
import ModalHeader from "../ModalHeader";
import Controls from "../../Form/controls/Controls";
import SelectedLabel from "../../Form/ControlsLabel/SelectLabel";
import DateLabel from "../../Form/ControlsLabel/DateLabel";
import { type } from "../../../utils/TypeOpen";
import { GLOBALTYPES } from "../../../redux/actionType";
import * as api from "../../../api";
import {
  saveExaminationFromLetter,
  saveExaminationLetter,
  updateMedicalLetter,
} from "../../../redux/actions/medicalLetter";
import { getCurrentDateString } from "../../../utils/Calc";
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
    id: true,
    title: "Nam",
  },
  { id: false, title: "Nữ" },
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

const initialValues = {
  phoneNumber: "",
  patientName: "",
  sex: null,
  address: "",
  email: "",
  dateOfBirth: null,
  date: getCurrentDateString(),
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
  const isShowAddScheduleModal = useSelector(
    (state) => state.modal.isShowAddScheduleModal
  );
  const { open, typeOpenModal, data } = isShowAddScheduleModal;
  const { services } = useSelector((state) => state.service);
  const doctors = useSelector((state) => state.staff.doctors);
  const [servicesFilter, setServicesFilter] = useState(null);
  const { client } = useSelector((state) => state.stomp);
  const { socket } = useSelector((state) => state.socket);
  const { user } = useSelector((state) => state.auth);
  const classes = useStyle();
  const dispatch = useDispatch();

  const handleHideModal = () => {
    dispatch(hideModal("isShowAddScheduleModal"));
  };

  const doctorsFilter = useMemo(
    () =>
      doctors.filter((item) => {
        if (servicesFilter) {
          return (
            item?.room?.medicalDepartment?.id ==
            servicesFilter.medicalDepartment.id
          );
        } else {
          return doctors;
        }
      }),
    [servicesFilter]
  );

  const changeSdt = async (e, handleChange, setFieldValue) => {
    handleChange(e);
    const callApiGetInfoPatient = async (e) => {
      const patientResponse = await api.findPatientByPhonenumber(
        e.currentTarget.value
      );
      if (patientResponse) {
        // setFieldValue("patient", patientResponse.data);
      }
    };
    if (e.currentTarget.value.length == 10) {
      // callApiGetInfoPatient(e);
    }
  };

  const handleChangeService = (name, option, setFieldValue) => {
    setFieldValue(name, option);
    setServicesFilter(option);
  };

  const handleSubmitForm = (values) => {
    const data = {
      date: values.date,
      doctor_id: values.doctor?.id,
      service_id: values.service.id,
      phoneNumber: values.phoneNumber,
      patientName: values.patientName,
      address: values.address,
      dateOfBirth: values.dateOfBirth,
      sex: values.sex.id,
      email: values.email,
      creator_id: user.id,
      status: "WAIT",
      description: "Tai Kham",
    };
    dispatch(saveExaminationLetter(data));
    handleHideModal();
  };

  const handleChangeDate = (field, value, setFieldValue) => {
    setFieldValue(field, value);
  };

  const handleSaveMedicalExamination = (values) => {
    const sendData = {
      patient: {
        phoneNumber: values.phoneNumber,
        email: values.email,
        fullName: values.patientName,
        dateOfBirth: values.dateOfBirth,
        address: values.address,
        sex: values.sex instanceof Object ? values.sex.id : values.sex,
      },
      diagnose: values.diagnose,
      doctorId: values.doctor?.id,
      status: values.status,
      receptionId: user.id,
      description: values.description,
      note: values.note,
      medicalExaminationDetailsRequests: [
        { serviceId: values.service.id, status: "DOING" },
      ],
      letterId: values.id,
    };

    dispatch(saveExaminationFromLetter(sendData, client, socket.current));
    handleHideModal();
  };

  const handleUpdateOrSaveMedicalLetter = (values) => {
    if (typeOpenModal == GLOBALTYPES.ADD) {
      handleSubmitForm(values);
    } else {
      const formData = {
        date: values.date,
        doctor_id: values.doctor?.id,
        service_id: values.service.id,
        phoneNumber: values.phoneNumber,
        patientName: values.patientName,
        address: values.address,
        dateOfBirth: values.dateOfBirth,
        sex: values.sex.id,
        email: values.email,
        creator_id: user.id,
      };
      dispatch(updateMedicalLetter(formData, values.id));
      handleHideModal();
    }
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
                  name="patientName"
                  value={values.patientName}
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
                  name="sex"
                  value={
                    data
                      ? optionsSex.find((item) => item.id == data.sex)
                      : values.sex
                  }
                  require={true}
                  size={[2, 2]}
                />
                <InputLabel
                  disable={type(typeOpenModal)}
                  label="Điện thoại liên hệ"
                  name="phoneNumber"
                  require={true}
                  size={[2, 2]}
                  value={values.phoneNumber}
                  onChange={(e) => changeSdt(e, handleChange, setFieldValue)}
                />
                {/* <Grid item xs={2} /> */}
                <DateLabel
                  disable={type(typeOpenModal)}
                  value={values.dateOfBirth}
                  onChange={(value) =>
                    handleChangeDate("dateOfBirth", value, setFieldValue)
                  }
                  label="Ngày sinh"
                  size={[2, 2]}
                />
                <InputLabel
                  disable={type(typeOpenModal)}
                  onChange={handleChange}
                  name="email"
                  label="Email"
                  value={values.email}
                  size={[2, 2]}
                />
                {/* <Grid item xs={2} /> */}
                <InputLabel
                  disable={type(typeOpenModal)}
                  name="address"
                  onChange={handleChange}
                  value={values.address}
                  label="Địa chỉ"
                  size={[2, 10]}
                />
                <DateLabel
                  disable={type(typeOpenModal)}
                  onChange={(value) =>
                    handleChangeDate("date", value, setFieldValue)
                  }
                  value={values.date}
                  currentDate={true}
                  disablePast={true}
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
                  onChange={(e, option) =>
                    handleChangeService("service", option, setFieldValue)
                  }
                  name="service"
                  value={
                    data
                      ? services.find((item) => item?.id == data?.service?.id)
                      : values?.service
                  }
                  label="Loại khám"
                  require={true}
                  size={[2, 3]}
                />
                <Grid item xs={3} />
                <InputLabel
                  disable={true}
                  value={values.service?.price}
                  label="Tổng tiền"
                  size={[2, 2]}
                />
                <SelectedLabel
                  disable={type(typeOpenModal)}
                  value={
                    data?.doctor
                      ? doctors.find((item) => item.id == data.doctor.id)
                      : values?.doctor
                  }
                  options={doctorsFilter}
                  accessField={"fullName"}
                  setFieldValue={setFieldValue}
                  name="doctor"
                  label="Bác sĩ khám"
                  size={[2, 3]}
                />
                <Grid item xs={3} />
                <SelectedLabel
                  disable={type(typeOpenModal)}
                  accessField="title"
                  setFieldValue={setFieldValue}
                  options={optionsAppointment}
                  label="Kiểu hẹn khám"
                  size={[2, 2]}
                />
              </Grid>

              {/* button -------------------- */}
              <div className={classes.action}>
                {typeOpenModal == GLOBALTYPES.RECEIVE && (
                  <Controls.Button
                    color="healing"
                    variant="contained"
                    text="Tiếp nhận"
                    onClick={() => handleSaveMedicalExamination(values)}
                    startIcon={<Start />}
                    sx={{ mr: 1 }}
                  />
                )}
                {typeOpenModal == GLOBALTYPES.EDIT ||
                  (typeOpenModal == GLOBALTYPES.ADD && (
                    <Controls.Button
                      color="primary"
                      variant="contained"
                      text="Lưu"
                      onClick={() => handleUpdateOrSaveMedicalLetter(values)}
                      startIcon={<Save />}
                      sx={{ mr: 1 }}
                    />
                  ))}

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
