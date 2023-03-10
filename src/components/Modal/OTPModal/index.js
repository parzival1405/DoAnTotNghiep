import { Button, Divider, Fade, Paper, TextField } from "@mui/material";

import { makeStyles } from "@mui/styles";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideModal } from "../../../redux/actions/modal";
import BaseModal from "../BaseModal";
import useStyles from "../styles";
import KeyOTP from "../../../assets/img/key_otp.svg";
import { Form, Formik } from "formik";

import { firebase, auth } from "../../../utils/Firebase";
// import { forgotPassword, signin, signup } from "../../redux/actions/auth";
import { Link, useNavigate } from "react-router-dom";
import { validateionOTP } from "../../../utils/Validation";

function OTPModal() {
  const navigate = useNavigate();
  const { isShowOTP } = useSelector((state) => state.modal);

  const classes = useStyles();
  const dispatch = useDispatch();

  const handleHideModal = () => {
    dispatch(hideModal("isShowOTP"));
  };

  const configureCaptcha = () => {
    // window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
    //   "sign-in-button",
    //   {
    //     size: "invisible",
    //     callback: (response) => {
    //       handleSendSms();
    //       console.log("Recaptca varified");
    //     },
    //     defaultCountry: "IN",
    //   }
    // );
  };

  const handleSendSms = (values) => {
    // configureCaptcha();
    // const data = window.dataUser;
    // const phoneNumber = "+84" + data.phoneNumber.slice(1);
    // const appVerifier = window.recaptchaVerifier;
    // firebase
    //   .auth()
    //   .signInWithPhoneNumber(phoneNumber, appVerifier)
    //   .then((confirmationResult) => {
    //     window.confirmationResult = confirmationResult;
    //   })
    //   .catch((error) => {
    //     console.log("SMS not sent", error);
    //   });
  };

  const handleSubmitForm = (values) => {
    // const data = window.dataUser;
    // window.confirmationResult
    //   .confirm(values.otp)
    //   .then((result) => {
    //     handleHideModal();
    //     if (window.isForgotPass) {
    //       dispatch(forgotPassword(data, navigate));
    //       return;
    //     }
    //     if (window.isSignup) {
    //       dispatch(signup(data, navigate));
    //     } else {
    //       dispatch(signin(data, navigate));
    //     }
    //   })
    //   .catch((error) => {
    //     alert("M?? x??c nh???n kh??ng ch??nh x??c");
    //   });
  };
  const body = (
    <Fade in={isShowOTP}>
      <Paper className={classes.paper} id="modal-add-friend">
        <div
          style={{
            display: "flex",
            backgroundColor: "#0878f4",
            height: "40px",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            borderRadius: "2px",
            color: "white",
            padding: "5px",
          }}
        >
          <p style={{ fontSize: "22px" }}>X??c nh???n OTP</p>
        </div>
        <div
          style={{
            borderRadius: "2px",
            display: "flex",
            backgroundColor: "#f2f3f5",
            height: "40px",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <p>Vui l??ng kh??ng chia s??? m?? x??c nh???n ????? tr??nh m???t t??i kho???n</p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "5px",
          }}
        >
          <img style={{ width: "50px" }} src={KeyOTP} alt="" />
        </div>
        <div
          style={{
            borderRadius: "2px",
            display: "flex",

            height: "40px",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <p>Vui l??ng nh???p m?? OTP g???i t???i s??? ??i???n tho???i c???a b???n</p>
        </div>
        <Formik
          initialValues={{
            otp: "",
          }}
          validationSchema={validateionOTP}
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
            handleChange,
            handleSubmit,
            isSubmitting,
          }) => (
            <Form
              className={classes.form}
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <TextField
                placeholder="Nh???p m?? x??c nh???n"
                error={errors.otp}
                helperText={errors.otp}
                touched={touched.otp}
                type="text"
                fullWidth
                variant="outlined"
                name="otp"
                onChange={handleChange}
                InputProps={{
                  disableUnderline: true,
                }}
                style={{ margin: "10px 0" }}
              />

              <div id="sign-in-button"> </div>

              <div
                style={{
                  display: "flex",
                  width: "100%",
                  marginTop: "10px",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  variant="secondary"
                  onClick={() => handleSendSms(values)}
                >
                  G???i l???i m??
                </Button>

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  Xa??c nh????n
                </Button>
                <Button variant="secondary" onClick={() => handleHideModal()}>
                  H???y
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Paper>
    </Fade>
  );
  return <BaseModal body={body} isShow={isShowOTP} />;
}

export default OTPModal;
