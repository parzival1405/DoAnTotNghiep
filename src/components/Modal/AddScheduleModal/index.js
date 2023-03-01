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
  { id: "2", title: "10h - 11h", },
];


function AddScheduleModal() {
  const { isShowAddScheduleModal } = useSelector((state) => state.modal);
  const classes = useStyle();
  const dispatch = useDispatch();

  const handleHideModal = () => {
    dispatch(hideModal("isShowAddScheduleModal"));
  };

  const handleSubmitForm = (values) => {};

  const body = (
    <Fade in={isShowAddScheduleModal}>
      <Paper className={classes.paper} id="modal-patient-reception">
        <ModalHeader title="Đặt lịch khám bệnh" onClose={handleHideModal} />
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
                <InputLabel label="Bệnh nhân" require={true} size={[2, 6]} />
                {/* <Grid item xs={2} /> */}
                <SelectedLabel options={optionsSex} label="Giới tính" value={optionsSex[0].id} require={true} size={[2, 2]} />
                <InputLabel
                  label="Điện thoại liên hệ"
                  require={true}
                  size={[2, 2]}
                />
                {/* <Grid item xs={2} /> */}
                <DateLabel label="Ngày sinh" size={[2, 2]} />
                <InputLabel label="Email" size={[2, 2]} />
                {/* <Grid item xs={2} /> */}
                <InputLabel label="Địa chỉ" size={[2, 10]} />
                <DateLabel currentDate={true} label="Ngày Khám" require={true} size={[2, 3]} />
                <Grid item xs={3} />
                <SelectedLabel options={optionsTimeSlot} label="Khung giờ" size={[2, 2]} />
                <InputLabel label="Bác sĩ" size={[2, 10]} />
                <SelectedLabel options={optionsAppointment} label="Kiểu hẹn khám" size={[2, 3]} />
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
  return <BaseModal body={body} isShow={isShowAddScheduleModal} />;
}

export default AddScheduleModal;
