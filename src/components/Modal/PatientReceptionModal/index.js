import { Close, Save } from "@mui/icons-material";
import { Fade, Grid, Paper } from "@mui/material";
import { Form, Formik } from "formik";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideModal } from "../../../redux/actions/modal";
import InputLabel from "../../Form/ControlsLabel/InputLabel";
import BaseModal from "../BaseModal";
import * as api from "../../../api";
import { makeStyles } from "@mui/styles";
import ModalHeader from "../ModalHeader";
import Controls from "../../Form/controls/Controls";
import SelectedLabel from "../../Form/ControlsLabel/SelectLabel";
import DateLabel from "../../Form/ControlsLabel/DateLabel";
import {
  saveExamination,
  updateMedicalExamination,
} from "../../../redux/actions/medicalExamination";
import { GLOBALTYPES } from "../../../redux/actionType";
import { type } from "../../../utils/TypeOpen";
import dayjs from "dayjs";
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

const initialValues = {
  patient: null,
  doctor: null,
  clinicalSign: "",
  status: "WAIT",
  reception: null,
  description: "",
  note: "",
};

function PatientReceptionModal() {

  const isShowPatientReceptionModal = useSelector(
    (state) => state.modal.isShowPatientReceptionModal
  );
  const { open, typeOpenModal, data } = isShowPatientReceptionModal;

  const { services } = useSelector((state) => state.service);
  const { user } = useSelector((state) => state.auth);
  const { client } = useSelector((state) => state.stomp);
  const { socket } = useSelector((state) => state.socket);
  const { doctors } = useSelector((state) => state.staff);

  const [serviceFilter, setServiceFilter] = useState(null);

  const classes = useStyle();
  const dispatch = useDispatch();
  
  const doctorFilter = useMemo(() => {
    if(serviceFilter){
      return doctors.filter((item) => item?.room?.medicalDepartment?.id === serviceFilter.medicalDepartment.id)
    }else{
      return doctors
    }
  } ,[serviceFilter])

  const handleHideModal = () => {
    dispatch(hideModal("isShowPatientReceptionModal"));
  };

  const handleSubmitForm = (values) => {
    // console.log(values)
    values.reception = user;
    if (typeOpenModal == GLOBALTYPES.ADD) {
      dispatch(saveExamination(values, client, socket.current));
    } else if (typeOpenModal == GLOBALTYPES.EDIT) {
      dispatch(updateMedicalExamination(values));
    }
    handleHideModal();
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
    } else {
      setFieldValue("patient", {
        phoneNumber: null,
        fullName: null,
      });
    }
  };

  const onSelectService = (e,name,value,setFieldValue) => {
    if(data){
      data.medicalExaminationDetailsResponses[0].service = value
    }
    setFieldValue(name,value)
    setServiceFilter(value);
  };

  const handleChangeDate = (name,value,setFieldValue) => {
    setFieldValue(name,value)
  }

  const body = (
    <Fade in={isShowPatientReceptionModal.open}>
      <Paper className={classes.paper} id="modal-patient-reception">
        <ModalHeader title="Tiếp đón bệnh nhân" onClose={handleHideModal} />
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
                  label="Điện thoại"
                  size={[3, 3]}
                  name="patient.phoneNumber"
                  value={values["patient"]?.phoneNumber}
                  onChange={(e) => changeSdt(e, handleChange, setFieldValue)}
                />
                <InputLabel
                  disable={type(typeOpenModal)}
                  label="Tên bệnh nhân"
                  name="patient.fullName"
                  value={values["patient"]?.fullName}
                  onChange={handleChange}
                  require={true}
                  size={[3, 3]}
                />
                <DateLabel
                  label="Tuổi"
                  onChange={(value) => handleChangeDate("patient.dateOfBirth",value, setFieldValue)}
                  name="patient.dateOfBirth"
                  value={dayjs(new Date(values["patient"]?.dateOfBirth),"DD/MM/YYYY")}
                  size={[3, 3]}
                  disable={type(typeOpenModal)}
                />
                <InputLabel
                  disable={true}
                  label="Nhân viên tiếp đón"
                  require={true}
                  size={[3, 3]}
                  value={user.fullName}
                />

                <SelectedLabel
                  disable={type(typeOpenModal)}
                  options={services}
                  accessField={"name"}
                  setFieldValue={setFieldValue}
                  name="service"
                  onChange={(event, newValue) => onSelectService(event,"service", newValue,setFieldValue)}
                  value={
                    data
                      ? services.find(
                          (item) =>
                            item?.id ==
                            data?.medicalExaminationDetailsResponses[0]?.service
                              ?.id
                        )
                      : values?.service
                  }
                  label="Loại khám"
                  require={true}
                  size={[3, 3]}
                />
                <DateLabel
                  disable={true}
                  currentDate={true}
                  label="Ngày lập"
                  require={true}
                  size={[3, 3]}
                />
                <SelectedLabel
                  disable={type(typeOpenModal)}
                  options={doctorFilter}
                  accessField={"fullName"}
                  setFieldValue={setFieldValue}
                  name="doctor"
                  value={values.doctor}
                  label="Bác sĩ khám"
                  size={[3, 3]}
                />
                <InputLabel
                  disable={true}
                  value={values.service?.price}
                  label="Tổng tiền"
                  size={[3, 3]}
                />
                <InputLabel
                  disable={type(typeOpenModal)}
                  label="Ghi chú"
                  name="note"
                  onChange={handleChange}
                  value={values.note}
                  size={[3, 9]}
                />
                <InputLabel
                  disable={type(typeOpenModal)}
                  label="Dấu hiệu lâm sàng"
                  name="clinicalSign"
                  value={values.clinicalSign}
                  onChange={handleChange}
                  size={[3, 9]}
                />
              </Grid>

              {/* button -------------------- */}
              {typeOpenModal !== GLOBALTYPES.VIEW && (
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
              )}
            </Form>
          )}
        </Formik>
      </Paper>
    </Fade>
  );
  return <BaseModal body={body} isShow={isShowPatientReceptionModal.open} />;
}

export default PatientReceptionModal;
