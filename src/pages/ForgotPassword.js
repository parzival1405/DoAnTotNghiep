import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Link as MuiLink,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { Form, Formik } from "formik";
import { validationForgotPass } from "../utils/Validation";

import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";
import Controls from "../components/Form/controls/Controls";
import AuthLayout from "../components/Layout/AuthLayout";
import { ShowOTP } from "../redux/actions/modal";

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

function ForgotPassword() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmitForm = async (values) => {
    dispatch(ShowOTP())
  };

  return (
    <AuthLayout>
      <Formik
        initialValues={{
          idNhanVien: ""
        }}
        validationSchema={validationForgotPass}
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
                  name="idNhanVien"
                  label="Nhập Id nhân viên"
                  value={values.idNhanVien}
                  onChange={handleChange}
                  size="larger"
                  error={touched.idNhanVien ? errors.idNhanVien : undefined}
                />

                <Box width="100%" textAlign="right">
                  <MuiLink
                    component="button"
                    variant="body2"
                    onClick={() => navigate("/login")}
                  >
                    Trở lại
                  </MuiLink>
                </Box>

                <Box textAlign="center">
                  <Controls.Button type="submit" text="Lấy lại mật khẩu" />
                </Box>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
}

export default ForgotPassword;
