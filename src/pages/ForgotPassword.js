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
import { firebase} from "../utils/Firebase";

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

  const configureCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha",
      {
        size: "invisible",
        callback: (response) => {
          handleSendSms();
        },
        defaultCountry: "IN",
      }
    );
  };

  const handleSendSms = (values) => {
    console.log(values);
    configureCaptcha();
    const phone_number = "+84" + values.phone_number.slice(1);
    const appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phone_number, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
      })
      .catch((error) => {
        console.log("SMS not sent", error);
      });
  };

  const handleSubmitForm = async (values) => {
    window.dataUser = values
    window.isForgotPass = true
    handleSendSms(values);
    dispatch(ShowOTP());
  };

  const handleEnter = (e,values) => {
    if (e.key === 'Enter') {
      handleSubmitForm(values)
    }
  }

  return (
    <AuthLayout>
      <Formik
        initialValues={{
          phone_number: ""
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
                  name="phone_number"
                  label="Nhập số điện thoại"
                  value={values.phone_number}
                  onChange = {handleChange}
                  onKeyDown = {(e) => handleEnter(e,values)}
                  size="larger"
                  error={touched.phone_number ? errors.phone_number : undefined}
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
                  <Controls.Button disabled={isSubmitting} type="submit" text="Lấy lại mật khẩu" />
                </Box>
                <div id="recaptcha"></div>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
}

export default ForgotPassword;
