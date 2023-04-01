import { Add, Close, Save } from "@mui/icons-material";
import { Fade, Grid, Paper } from "@mui/material";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  hideModal,
  ShowAddDrugModal,
  ShowAddSupplierModal,
  ShowAddTypeServiceModal,
} from "../../../redux/actions/modal";
import InputLabel from "../../Form/ControlsLabel/InputLabel";
import BaseModal from "../BaseModal";

import { makeStyles } from "@mui/styles";
import ModalHeader from "../ModalHeader";
import Controls from "../../Form/controls/Controls";
import SelectedLabel from "../../Form/ControlsLabel/SelectLabel";
import { GLOBALTYPES } from "../../../redux/actionType";
import { titleModal, type } from "../../../utils/TypeOpen";
import { saveService } from "../../../redux/actions/service";
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
  gridCustomInput: {
    paddingBottom: "16px",
    "& .MuiInputBase-input": {
      padding: "6px",
    },
  },
  button: {
    "& .MuiButtonBase-root": {
      width: "calc(100% - 10px)",
      height: "100%",
      marginLeft: "10px",
    },
  },
}));


const initialValues = {
  id:null,
  name:null,
  price:null,
  description: "",
  departmentServices:"",
  note: "",
};

function AddServiceSide() {
  const { isShowAddServiceModal } = useSelector((state) => state.modal);
  const { departmentServices } = useSelector((state) => state.service);
  const { open, typeOpenModal } = isShowAddServiceModal;
  const classes = useStyle();
  const dispatch = useDispatch();

  const handleHideModal = () => {
    dispatch(hideModal("isShowAddServiceModal"));
  };

  const handleClickShowAddTypeServiceModal = () => {
    dispatch(ShowAddTypeServiceModal(GLOBALTYPES.ADD));
  };

  const handleSubmitForm = (values) => {
    console.log(values)
    // dispatch(saveService(values))
    handleHideModal()
  };

  const body = (
    <Fade in={isShowAddServiceModal.open}>
      <Paper className={classes.paper} id="modal-patient-reception">
        <ModalHeader
          title={titleModal(typeOpenModal, "dịch vụ")}
          onClose={handleHideModal}
        />
        <Formik
          initialValues={initialValues}
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
                  label="Mã dịch vụ"
                  name="id"
                  onChange={handleChange}
                  value={values?.id}
                  size={[2, 4]}
                />
                <InputLabel
                  label="Tên dịch vụ"
                  require={true}
                  name="name"
                  value={values?.name}
                  onChange={handleChange}
                  size={[2, 4]}
                />
                <SelectedLabel
                  label="Nhóm dịch vụ"
                  require={true}
                  size={[2, 3]}
                  disable={type(typeOpenModal)}
                  options={departmentServices}
                  accessField={"name"}
                  setFieldValue={setFieldValue}
                  name="departmentServices"
                  value={values?.departmentServices}
                />
                <Grid item xs={1} className={classes.button}>
                  <Controls.Button
                    variant="contained"
                    text="Thêm"
                    color="primary"
                    startIcon={<Add />}
                    onClick={handleClickShowAddTypeServiceModal}
                  />
                </Grid>
                <SelectedLabel
                  label="Phòng ban"
                  require={true}
                  size={[2, 4]}
                  disable={type(typeOpenModal)}
                  options={departmentServices}
                  accessField={"name"}
                  setFieldValue={setFieldValue}
                  name="departmentServices"
                  value={values?.departmentServices}
                />
                <InputLabel
                  label="Giá"
                  name="price"
                  value={values?.price}
                  onChange={handleChange}
                  size={[2, 4]}
                />
                <Grid item xs={6} />
                <InputLabel
                  label="Mô tả"
                  name="description"
                  value={values?.description}
                  onChange={handleChange}
                  size={[2, 10]}
                />
                <InputLabel
                  label="Ghi chú"
                  name="note"
                  value={values?.note}
                  onChange={handleChange}
                  size={[2, 10]}
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
  return <BaseModal body={body} isShow={isShowAddServiceModal.open} />;
}

export default AddServiceSide;
