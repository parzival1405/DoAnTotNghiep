import { Add, Close, Save } from "@mui/icons-material";
import { Fade, Grid, Paper } from "@mui/material";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  hideModal,
  ShowAddDrugModal,
  ShowAddSupplierModal,
  ShowAddTypeServiceGroupsModal,
} from "../../../redux/actions/modal";
import InputLabel from "../../Form/ControlsLabel/InputLabel";
import BaseModal from "../BaseModal";

import { makeStyles } from "@mui/styles";
import ModalHeader from "../ModalHeader";
import Controls from "../../Form/controls/Controls";
import SelectedLabel from "../../Form/ControlsLabel/SelectLabel";
import { GLOBALTYPES } from "../../../redux/actionType";
import { titleModal, type } from "../../../utils/TypeOpen";
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

const headCells = [
  { id: "stt", sizeCellWidth: 60, label: "STT" },
  { id: "name", numeric: false, label: "Tên sản phẩm" },
  { id: "unit", numeric: false, label: "Đơn vị" },
  { id: "quantity", editable: true, label: "Số lượng" },
  { id: "price", editable: true, sizeCellWidth: 150, label: "Đơn giá" },
  { id: "total", numeric: true, label: "Thành tiền" },
];

const optionsNCC = [
  { id: "1", title: "NCC1" },
  { id: "2", title: "NCC2" },
];

const optionsDrug = [
  { id: "0", title: "" },
  { id: "1", title: "NCC1" },
  { id: "2", title: "NCC2" },
];

const optionsPay = [
  { id: "1", title: "Tiền mặt" },
  { id: "2", title: "Chuyển khoản" },
];

const optionsSP = [
  { id: "1", title: "aaaaaaaaaaaaaaaaaaaaa" },
  { id: "2", title: "Chuyển" },
];

function AddServiceGroupsSide() {
  const { isShowAddServiceGroupsModal } = useSelector((state) => state.modal);
  const {open,typeOpenModal} = isShowAddServiceGroupsModal
  const classes = useStyle();
  const dispatch = useDispatch();

  const handleHideModal = () => {
    dispatch(hideModal("isShowAddServiceGroupsModal"));
  };

  const handleClickShowAddTypeServiceGroupsModal = () => {
    dispatch(ShowAddTypeServiceGroupsModal(GLOBALTYPES.ADD));
  };


  const handleSubmitForm = (values) => {};

  const body = (
    <Fade in={isShowAddServiceGroupsModal.open}>
      <Paper className={classes.paper} id="modal-patient-reception">
        <ModalHeader title={titleModal(typeOpenModal,"dịch vụ")} onClose={handleHideModal} />
        <Formik
          initialValues={{}}
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
                <InputLabel disable={true} label="Mã dịch vụ" size={[2, 4]} />
                <InputLabel  label="Tên dịch vụ" require={true} size={[2, 4]} />
                <SelectedLabel
                  label="Nhóm dịch vụ"
                  options={optionsNCC}
                  require={true}
                  size={[2, 3]}
                />
                <Grid item xs={1} className={classes.button}>
                  <Controls.Button
                    variant="contained"
                    text="Thêm"
                    color="primary"
                    startIcon={<Add />}
                    onClick={handleClickShowAddTypeServiceGroupsModal}
                  />
                </Grid>
                <SelectedLabel
                  label="Phòng ban"
                  options={optionsNCC}
                  require={true}
                  size={[2, 4]}
                />
                <InputLabel label="Giá" size={[2, 4]} />
                <Grid item xs={6}/>
                <InputLabel label="Mô tả" size={[2, 10]} />
                <InputLabel label="Ghi chú" size={[2, 10]} />
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
  return <BaseModal body={body} isShow={isShowAddServiceGroupsModal.open} />;
}

export default AddServiceGroupsSide;
