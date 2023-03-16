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
import { titleModal, type } from "../../../utils/TypeOpen";

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
    id: "male",
    title: "Nam",
  },
  { id: "female", title: "Nữ" },
];

function PatientModal() {
  const { isShowPatientModal } = useSelector((state) => state.modal);
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

  const handleSubmitForm = (values) => {};

  const body = (
    <Fade in={isShowPatientModal.open}>
      <Paper className={classes.paper} id="modal-patient-reception">
        <ModalHeader
          title={titleModal(typeOpenModal, "thông tin bệnh nhân")}
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
                  disable={type(typeOpenModal)}
                  label="Mã bệnh nhân"
                  value={data?.id}
                  require={true}
                  size={[3, 3]}
                />
                <InputLabel
                  disable={type(typeOpenModal)}
                  label="Tên Bệnh nhân"
                  require={true}
                  size={[3, 3]}
                  value={data?.fullName}
                />

                <DateLabel
                  label="Ngày sinh"
                  size={[3, 3]}
                  disable={type(typeOpenModal)}
                />
                <SelectedLabel
                  disable={type(typeOpenModal)}
                  options={optionsSex}
                  label="Giới tính"
                  value={optionsSex[0].id}
                  require={true}
                  size={[3, 3]}
                />

                <InputLabel
                  disable={type(typeOpenModal)}
                  label="Điện thoại"
                  value={data?.phoneNumber}
                  size={[3, 3]}
                />
                <InputLabel
                  disable={type(typeOpenModal)}
                  label="CCCD/CMND"
                  value={data?.idCard}
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
                  size={[3, 9]}
                  value={data?.address}
                />
                <InputLabel
                  disable={type(typeOpenModal)}
                  label="Ghi chú"
                  size={[3, 9]}
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
  return <BaseModal body={body} isShow={isShowPatientModal.open} />;
}

export default PatientModal;
