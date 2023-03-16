import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  InputAdornment,
  IconButton,
  Box,
  Link as MuiLink,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { Form, Formik } from "formik";
import { validationLoginClinic } from "../utils/Validation";

import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";
import Controls from "../components/Form/controls/Controls";
import AuthLayout from "../components/Layout/AuthLayout";
import { login } from "../redux/actions/auth";
import Loading from "../components/Loading";
// import { useForm, Form } from "../components/Form/useForm";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "100%",
      marginTop: theme.spacing(1),
    },

    "& .MuiBox-root": {
      marginTop: theme.spacing(1),
    },
  },
}));

function Login() {
  const { isLoading } = useSelector((state) => state.loading);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmitForm = async (values) => {
    // const data = {
    //   phone_number: values.phone_number,
    //   password: values.password,
    // };
    try {
      dispatch(login(values, navigate));
    } catch (error) {
      alert("Sai mật khẩu");
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <AuthLayout>
      <Formik
        initialValues={{
          phone_number: "",
          password: "",
        }}
        validationSchema={validationLoginClinic}
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
          <Form className={classes.root} onSubmit={handleSubmit} method="POST">
            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="center"
            >
              <Grid
                item
                xs={12}
                container
                direction="column"
                alignItems="center"
              >
                <Controls.Input
                  name="phone_number"
                  label="Số điện thoại"
                  value={values.phone_number}
                  onChange={handleChange}
                  size="larger"
                  error={touched.phone_number ? errors.phone_number : undefined}
                />
                <Controls.Input
                  name="password"
                  label="Nhập mật khẩu"
                  size="larger"
                  value={values.password}
                  onChange={handleChange}
                  error={touched.password ? errors.password : undefined}
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
                <Box width="100%" textAlign="right">
                  <MuiLink
                    // component="button"
                    variant="body2"
                    onClick={() => navigate("/forgotPassword")}
                  >
                    Quên mật khẩu?
                  </MuiLink>
                </Box>

                <Box textAlign="center">
                  <Controls.Button type="submit" disabled={isSubmitting} text="Đăng nhập" />
                </Box>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
}

export default Login;
