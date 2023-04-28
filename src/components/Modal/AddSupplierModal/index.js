import { Add, Close, LabelOutlined, Save } from "@mui/icons-material";
import {
  Button,
  Divider,
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
import SelectedLabel from "../../Form/ControlsLabel/SelectLabel";
import DateLabel from "../../Form/ControlsLabel/DateLabel";
import { saveSupplier } from "../../../redux/actions/supplier";
import { GLOBALTYPES } from "../../../redux/actionType";
import { type } from "../../../utils/TypeOpen";

const useStyle = makeStyles((theme) => ({
  paper: {
    width: "50%",
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
  name: null,
  description: null,
  address: null,
  email: null,
  phoneNumber: null,
};

function AddSupplierModal() {
  const isShowAddSupplierModal = useSelector((state) => state.modal.isShowAddSupplierModal);
  const { open, typeOpenModal, data } = isShowAddSupplierModal;
  const classes = useStyle();
  const dispatch = useDispatch();

  const handleHideModal = () => {
    dispatch(hideModal("isShowAddSupplierModal"));
  };

  const handleSubmitForm = (values) => {
    console.log(values);
    // dispatch(saveSupplier(values))
  };
  const body = (
    <Fade in={isShowAddSupplierModal.open}>
      <Paper className={classes.paper} id="modal-patient-reception">
        <ModalHeader title="Thêm nhà cung cấp mới" onClose={handleHideModal} />
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
                  label="Tên nhà cung cấp"
                  name="name"
                  value={values?.name}
                  onChange={handleChange}
                  size={[3, 4]}
                />
                <InputLabel
                  disable={type(typeOpenModal)}
                  label="Email"
                  name="email"
                  value={values?.email}
                  onChange={handleChange}
                  size={[2, 3]}
                />
                <InputLabel
                  disable={type(typeOpenModal)}
                  label="Địa chỉ"
                  name="address"
                  value={values?.address}
                  onChange={handleChange}
                  size={[3, 4]}
                />
                <InputLabel
                  disable={type(typeOpenModal)}
                  label="Số ĐT"
                  name="phoneNumber"
                  value={values?.phoneNumber}
                  onChange={handleChange}
                  size={[2, 3]}
                />
                <InputLabel
                  disable={type(typeOpenModal)}
                  label="Mô tả"
                  name="description"
                  value={values?.description}
                  onChange={handleChange}
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
  return <BaseModal body={body} isShow={isShowAddSupplierModal.open} />;
}

export default AddSupplierModal;
