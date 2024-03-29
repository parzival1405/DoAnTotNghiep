import { Close, Save } from "@mui/icons-material";
import {
  Fade,
  Grid,
  Paper
} from "@mui/material";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideModal } from "../../../redux/actions/modal";
import InputLabel from "../../Form/ControlsLabel/InputLabel";
import BaseModal from "../BaseModal";

import { makeStyles } from "@mui/styles";
import { GLOBALTYPES } from "../../../redux/actionType";
import { updatePatient } from "../../../redux/actions/patient";
import { titleModal, type } from "../../../utils/TypeOpen";
import DateLabel from "../../Form/ControlsLabel/DateLabel";
import SelectedLabel from "../../Form/ControlsLabel/SelectLabel";
import Controls from "../../Form/controls/Controls";
import ModalHeader from "../ModalHeader";

const useStyle = makeStyles((theme) => ({
  paper: {
    width: "60%",
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

const initialValues = {};

function PatientModal() {
  const isShowPatientModal = useSelector(
    (state) => state.modal.isShowPatientModal
  );
  const { open, typeOpenModal, data } = isShowPatientModal;
  const classes = useStyle();
  const dispatch = useDispatch();

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const handleHideModal = () => {
    dispatch(hideModal("isShowPatientModal"));
  };

  const handleSubmitForm = (values) => {
    if (typeOpenModal == GLOBALTYPES.EDIT) {
      dispatch(updatePatient({...values,sex:values.sex.id}))
      handleHideModal();
    }
  };

  const handleChangeDate = (field, value, setFieldValue) => {
    setFieldValue(field, value);
  };

  const body = (
    <Fade in={isShowPatientModal.open}>
      <Paper className={classes.paper} id="modal-patient-reception">
        <ModalHeader
          title={titleModal(typeOpenModal, "thông tin bệnh nhân")}
          onClose={handleHideModal}
        />
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
                  disable={true}
                  label="Mã bệnh nhân"
                  value={data?.id}
                  require={true}
                  size={[3, 3]}
                />
                <InputLabel
                  disable={type(typeOpenModal)}
                  label="Tên Bệnh nhân"
                  name="patient.fullName"
                  require={true}
                  size={[3, 3]}
                  value={values.fullName || ""}
                  onChange={handleChange}
                />

                <DateLabel
                  label="Ngày sinh"
                  size={[3, 3]}
                  onChange={(value) =>
                    handleChangeDate("dateOfBirth", value, setFieldValue)
                  }
                  disable={type(typeOpenModal)}
                  value={values.dateOfBirth || ""}
                />
                <SelectedLabel
                  disable={type(typeOpenModal)}
                  options={optionsSex}
                  setFieldValue={setFieldValue}
                  label="Giới tính"
                  value={
                    data
                      ? optionsSex.find((item) => item.id == data.sex)
                      : values.sex
                  }
                  name={"sex"}
                  require={true}
                  size={[3, 3]}
                  accessField={"title"}
                />

                <InputLabel
                  disable={type(typeOpenModal)}
                  onChange={handleChange}
                  label="Điện thoại"
                  name="phoneNumber"
                  value={values.phoneNumber || ""}
                  size={[3, 3]}
                />
                <InputLabel
                  disable={type(typeOpenModal)}
                  onChange={handleChange}
                  label="CCCD/CMND"
                  name="idCard"
                  value={values.idCard || ""}
                  size={[3, 3]}
                />

                <InputLabel
                  disable={type(typeOpenModal)}
                  label="Điện thoại người thân"
                  size={[3, 3]}
                />
                <InputLabel
                  disable={type(typeOpenModal)}
                  label="Mối quan hệ"
                  size={[3, 3]}
                />

                <InputLabel
                  disable={type(typeOpenModal)}
                  label="Địa chỉ"
                  name="address"
                  onChange={handleChange}
                  size={[3, 9]}
                  value={values.address || ""}
                />
                <InputLabel
                  disable={type(typeOpenModal)}
                  label="Ghi chú"
                  size={[3, 9]}
                />
              </Grid>

              {/* button -------------------- */}
              <div className={classes.action}>
                {typeOpenModal != GLOBALTYPES.VIEW && (
                  <Controls.Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    isSubmitting={isSubmitting}
                    text="Lưu"
                    startIcon={<Save />}
                    sx={{ mr: 1 }}
                  />
                )}

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
  return <BaseModal body={body} isShow={isShowPatientModal.open} />;
}

export default PatientModal;
