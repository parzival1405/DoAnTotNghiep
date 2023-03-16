import { Add, Close, Save } from "@mui/icons-material";
import { Fade, Grid, Paper } from "@mui/material";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  hideModal,
  ShowAddDrugModal,
  ShowAddSupplierModal,
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
    width: "30%",
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
  checkbox: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    "& .MuiFormControlLabel-root":{
        marginRight:0
    }
  },
}));

function AddTypeServiceGroupsModal() {
  const { isShowAddTypeServiceGroupsModal } = useSelector(
    (state) => state.modal
  );
  const { open, typeOpenModal } = isShowAddTypeServiceGroupsModal;
  const classes = useStyle();
  const dispatch = useDispatch();

  const handleHideModal = () => {
    dispatch(hideModal("isShowAddTypeServiceGroupsModal"));
  };

  const handleSubmitForm = (values) => {};

  const body = (
    <Fade in={isShowAddTypeServiceGroupsModal.open}>
      <Paper className={classes.paper} id="modal-patient-reception">
        <ModalHeader
          title={titleModal(typeOpenModal, "nhóm dịch vụ")}
          onClose={handleHideModal}
        />
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
                <InputLabel
                  disable={true}
                  label="Mã nhóm dịch vụ"
                  size={[5, 7]}
                />
                <InputLabel
                  label="Tên nhóm dịch vụ"
                  require={true}
                  size={[5, 7]}
                />
                <Grid item xs={12} justifyContent="flex-end">
                  <div className={classes.checkbox}>
                    <Controls.Checkbox
                      onChange={() => console.log("edds")}
                      label="Dịch vụ cận lâm sàng"
                    />
                  </div>
                </Grid>
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
  return (
    <BaseModal body={body} isShow={isShowAddTypeServiceGroupsModal.open} />
  );
}

export default AddTypeServiceGroupsModal;
