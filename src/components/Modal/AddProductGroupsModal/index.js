import { Close, Save } from "@mui/icons-material";
import {
  Fade,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideModal } from "../../../redux/actions/modal";
import { addCategory, updateCategory } from "../../../redux/actions/product";
import { titleModal, type } from "../../../utils/TypeOpen";
import Controls from "../../Form/controls/Controls";
import InputLabel from "../../Form/ControlsLabel/InputLabel";
import Label from "../../Form/ControlsLabel/Label";
import BaseModal from "../BaseModal";
import ModalHeader from "../ModalHeader";
import { GLOBALTYPES } from "../../../redux/actionType";
const useStyle = makeStyles((theme) => ({
  paper: {
    width: "50%",
    padding: "20px",
  },
  action: {
    display: "flex",
    paddingTop: "10px",
    justifyContent: "flex-end",
  },
  gridCustomInput: {
    paddingBottom: "16px",
    "& .MuiInputBase-input": {
      padding: "6px",
    },
  },
  title: {
    display: "flex",
    marginRight: "10px !important",
    justifyContent: "flex-end",
    color: "rgba(0, 0, 0, 0.6) !important",
    "& .MuiTypography-root": {},
  },
  selected: {
    width: "100%",
    "& .MuiInputBase-root": {
      paddingTop: "4px !important",
      paddingBottom: "4px !important",
      paddingLeft: "0px !important",
    },
  },
  red: {
    color: "red !important",
  },
}));

const initialValues = {
  name: "",
};

function AddProductGroupsModal() {
  const isShowAddProductGroupsModal  = useSelector((state) => state.modal.isShowAddProductGroupsModal);
  const { open, typeOpenModal, data } = isShowAddProductGroupsModal;

  const classes = useStyle();
  const dispatch = useDispatch();
  const handleHideModal = () => {
    dispatch(hideModal("isShowAddProductGroupsModal"));
  };

  const handleSubmitForm = (values) => {
    if(typeOpenModal == GLOBALTYPES.ADD){
      dispatch(addCategory(values));
    }else{
      dispatch(updateCategory(values));
    }
    handleHideModal();
  };

  useEffect(() => {
    // return () => setAvatarFile(null);
  });

  const body = (
    <Fade in={isShowAddProductGroupsModal.open}>
      <Paper className={classes.paper} id="modal-Account-staff">
        <ModalHeader
          title={titleModal(typeOpenModal, "nhóm sản phẩm")}
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
                  name="name"
                  disable={type(typeOpenModal)}
                  require={true}
                  label="Tên nhóm Sản phẩm"
                  value={values?.name}
                  onChange={handleChange}
                  size={[4, 8]}
                />
                <Grid item xs={4}>
                  <Label
                    disable={type(typeOpenModal)}
                    label={"Trạng thái"}
                    className={classes.title}
                  />
                </Grid>
                <Grid item xs={8}>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="active"
                    name="radio-buttons-group"
                    row
                  >
                    <FormControlLabel
                      disabled={type(typeOpenModal)}
                      value="active"
                      control={<Radio />}
                      label="Kích hoạt"
                    />
                    <FormControlLabel
                      disabled={type(typeOpenModal)}
                      value="disable"
                      control={<Radio />}
                      label="Vô hiệu hóa"
                    />
                  </RadioGroup>
                </Grid>
                <InputLabel
                  disable={type(typeOpenModal)}
                  label="Ghi chú"
                  name="note"
                  value={values?.note}
                  onChange={handleChange}
                  size={[4, 8]}
                />
              </Grid>

              {/* button -------------------- */}
              <div className={classes.action}>
                {typeOpenModal != GLOBALTYPES.VIEW && (
                  <Controls.Button
                    color="primary"
                    variant="contained"
                    type="submit"
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

  return <BaseModal body={body} isShow={isShowAddProductGroupsModal.open} />;
}

export default AddProductGroupsModal;
