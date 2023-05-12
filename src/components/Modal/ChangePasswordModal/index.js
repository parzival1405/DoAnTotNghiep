import { Box, Fade, Grid, IconButton, InputAdornment, Paper } from "@mui/material";

import { Close, Save, Visibility, VisibilityOff } from "@mui/icons-material";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideModal } from "../../../redux/actions/modal";
import Controls from "../../Form/controls/Controls";
import BaseModal from "../BaseModal";
import ModalHeader from "../ModalHeader";
import { makeStyles } from "@mui/styles";
import InputLabel from "../../Form/ControlsLabel/InputLabel";
import { changePassword } from "../../../redux/actions/auth";
import { useSnackbar } from "notistack";
import { validationChangePassword } from "../../../utils/Validation";

const useStyle = makeStyles((theme) => ({
  paper: {
    width: "40%",
    padding: "20px",
  },
  action: {
    display: "flex",
    width: "100%",
    paddingTop: "10px",
    justifyContent: "flex-end",
  },
}));

const initialValues = {
  password: "",
  newPassword: "",
  confirmPassword: "",
};

function ChangePasswordModal({user}) {
  const classes = useStyle();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const isShowChangePasswordModal = useSelector(
    (state) => state.modal.isShowChangePasswordModal
  );

  const { open } = isShowChangePasswordModal;

  const handleHideModal = () => {
    dispatch(hideModal("isShowChangePasswordModal"));
  };

  const handleSubmitForm = (values) => {
    const formData = new FormData()
    console.log(values);
    formData.append("oldPassword",values.password)
    formData.append("newPassword",values.newPassword)
    dispatch(changePassword(user.phoneNumber,formData, (text,type) => enqueueSnackbar(text,type)));
    handleHideModal();
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  const body = (
    <Fade in={open}>
      <Paper className={classes.paper} id="modal-add-friend">
        <ModalHeader title="Đổi mật khẩu" onClose={handleHideModal} />
        <Formik
          initialValues={initialValues}
          validationSchema={validationChangePassword}
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
                  require={true}
                  error={touched.password ? errors.password : undefined}
                  label="Mật khẩu cũ"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  size={[5, 7]}
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <InputLabel
                  require={true}
                  error={touched.newPassword ? errors.newPassword : undefined}
                  label="Mật khẩu mới"
                  name="newPassword"
                  value={values.newPassword}
                  onChange={handleChange}
                  size={[5, 7]}
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <InputLabel
                  require={true}
                  error={touched.confirmPassword ? errors.confirmPassword : undefined}
                  label="Xác nhận mật khẩu"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  size={[5, 7]}
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              {/* button -------------------- */}
              <Box
                sx={{
                  mt: 2,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div className={classes.action}>
                  <Controls.Button
                    color="primary"
                    variant="contained"
                    type="submit"
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
  return <BaseModal body={body} isShow={open} />;
}

export default ChangePasswordModal;
