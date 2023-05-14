import { Close, Save } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  CardMedia,
  Fade,
  Grid,
  Paper,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveStaff } from "../../../redux/actions/auth";
import { hideModal } from "../../../redux/actions/modal";
import { type } from "../../../utils/TypeOpen";
import Controls from "../../Form/controls/Controls";
import DateLabel from "../../Form/ControlsLabel/DateLabel";
import InputLabel from "../../Form/ControlsLabel/InputLabel";
import Label from "../../Form/ControlsLabel/Label";
import SelectedLabel from "../../Form/ControlsLabel/SelectLabel";
import BaseModal from "../BaseModal";
import ModalHeader from "../ModalHeader";
const useStyle = makeStyles((theme) => ({
  paper: {
    width: "70%",
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

const optionsGroup = [
  {
    id: "DOCTOR",
    title: "Bác sĩ",
  },
  {
    id: "2",
    title: "Lễ tân",
  },
  {
    id: "3",
    title: "Điều dưỡng",
  },
];

const optionsSex = [
  {
    id: "true",
    title: "Nam",
  },
  { id: "false", title: "Nữ" },
];

const initialValues = {
  phoneNumber: null,
  fullName: null,
  password: "password",
  dateOfBirth: null,
  email: null,
  address: null,
  sex: null,
  role: null,
};

function AddAccountStaffModal() {
  const isShowAddAccountStaffModal = useSelector(
    (state) => state.modal.isShowAddAccountStaffModal
  );
  const { open, typeOpenModal } = isShowAddAccountStaffModal;

  const [valueOption, setValueOption] = useState([]);
  const classes = useStyle();
  const dispatch = useDispatch();
  const [avatarFile, setAvatarFile] = useState(null);
  const handleHideModal = () => {
    dispatch(hideModal("isShowAddAccountStaffModal"));
  };

  const handleSubmitForm = (values) => {
    console.log(avatarFile);
    dispatch(saveStaff(values, avatarFile));
    handleHideModal();
  };

  useEffect(() => {
    // return () => setAvatarFile(null);
  });

  const handleChangeAvatar = (e) => {
    const file = e.target.files[0];
    let err = "";
    if (!file) return (err = "Tệp không tồn lại");
    if (file.size > 1024 * 1024 * 5) {
      return (err = "Tệp tối đa 5mb");
    }
    // if (err) setMediaErr(err);
    // else setMediaErr("");
    setAvatarFile(file);
  };

  const handleChangeValue = (event, newValue) => {
    setValueOption(newValue);
  };

  const body = (
    <Fade in={isShowAddAccountStaffModal.open}>
      <Paper className={classes.paper} id="modal-Account-staff">
        <ModalHeader title="Thêm nhân viên mới" onClose={handleHideModal} />
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
                  disable={type(typeOpenModal)}
                  require={true}
                  label="Tên nhân viên"
                  name="fullName"
                  value={values.fullName}
                  onChange={handleChange}
                  size={[2, 4]}
                />
                <SelectedLabel
                  options={optionsSex}
                  label="Giới tính"
                  name="sex"
                  require={true}
                  size={[2, 4]}
                  accessField={"title"}
                  setFieldValue={setFieldValue}
                  value={values?.sex}
                />
                <DateLabel
                  disable={type(typeOpenModal)}
                  require={true}
                  label="Ngày sinh"
                  name="dateOfBirth"
                  value={values.dateOfBirth}
                  onChange={(value) => setFieldValue("dateOfBirth", value)}
                  size={[2, 4]}
                />
                <InputLabel
                  disable={type(typeOpenModal)}
                  require={true}
                  label="Email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  size={[2, 4]}
                />
                <InputLabel
                  disable={type(typeOpenModal)}
                  require={true}
                  label="Điện thoại"
                  name="phoneNumber"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  size={[2, 4]}
                />
                <InputLabel
                  disable={type(typeOpenModal)}
                  label="Địa chỉ"
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                  size={[2, 4]}
                />
                <SelectedLabel
                  label="Nhóm quyền"
                  require={true}
                  options={optionsGroup}
                  size={[2, 4]}
                  name="role"
                  accessField={"title"}
                  setFieldValue={setFieldValue}
                  value={values?.role}
                />
                <Grid item xs={2}>
                  <Label label={"Avatar"} className={classes.title} />
                </Grid>
                <Grid item xs={1}>
                  <Button
                    variant="contained"
                    component="label"
                    disabled={type(typeOpenModal)}
                  >
                    Chọn
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      name="fileAvatar"
                      id="fileAvatar"
                      onChange={handleChangeAvatar}
                    />
                  </Button>
                </Grid>
                <Grid item xs={3}>
                  {avatarFile ? (
                    <CardMedia
                      component="img"
                      sx={{ width: "100%" }}
                      image={avatarFile ? URL.createObjectURL(avatarFile) : ""}
                      alt="Ảnh nhân viên"
                    />
                  ) : (
                    <Label
                      label={"Chưa chọn ảnh nào"}
                      className={[classes.title, classes.red].join(" ")}
                    />
                  )}
                </Grid>
              </Grid>

              {/* button -------------------- */}
              <Box
                sx={{
                  mt: 2,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Controls.Checkbox
                  disabled={type(typeOpenModal)}
                  label="Kích hoạt tài khoản"
                />
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
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Fade>
  );

  return <BaseModal body={body} isShow={isShowAddAccountStaffModal.open} />;
}

export default AddAccountStaffModal;
