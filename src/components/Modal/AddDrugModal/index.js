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
    paddingBottom:"16px",
    "& .MuiInputBase-input": {
      padding: "6px",
    },
  },
  button:{
    "& .MuiButtonBase-root":{
      width:"calc(100% - 10px)",
      height:"100%",
      marginLeft:"10px"
    }
  }
}));

const optionsTypeDrug = [{
  id:"1",
  title:"Kháng sinh"
},{
  id:"2",
  title:"Giảm đau"
}]

const optionsUnit = [{
  id:"1",
  title:"Chai"
},{
  id:"2",
  title:"Viên"
}]


function AddDrugModal() {
    const { isShowAddDrugModal } = useSelector((state) => state.modal);
    const classes = useStyle();
    const dispatch = useDispatch();
  
    const handleHideModal = () => {
      dispatch(hideModal("isShowAddDrugModal"));
    };
  
    const handleSubmitForm = (values) => {};
    const body = (
      <Fade in={isShowAddDrugModal}>
        <Paper className={classes.paper} id="modal-patient-reception">
          <ModalHeader title="Thêm thuốc mới" onClose={handleHideModal} />
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
                  <InputLabel label="Tên thuốc" size={[2, 10]} />
                  <SelectedLabel label="Loại thuốc" options={optionsTypeDrug} size={[2, 4]} />
                  <Grid item xs={6}/>
                  <InputLabel label="Mô tả" size={[2, 10]} />
                  <InputLabel label="Ghi chú" size={[2, 10]} />
                  <SelectedLabel label="Đơn vị đo" options={optionsUnit} size={[2, 4]} />
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
    return <BaseModal body={body} isShow={isShowAddDrugModal} />;
}

export default AddDrugModal