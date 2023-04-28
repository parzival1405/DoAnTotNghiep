import { Button, Fade, Paper, TextField } from "@mui/material";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideModal } from "../../../redux/actions/modal";
import BaseModal from "../BaseModal";
import useStyles from "../styles";
import KeyOTP from "../../../assets/img/key_otp.svg";
import { Form, Formik } from "formik";

import { firebase } from "../../../utils/Firebase";
import { useNavigate } from "react-router-dom";
import { validateionOTP } from "../../../utils/Validation";
import { forgotPassword } from "../../../redux/actions/auth";

function OTPModal() {
  const navigate = useNavigate();
  const  isShowOTP= useSelector((state) => state.modal.isShowOTP);

  const classes = useStyles();
  const dispatch = useDispatch();

  const handleHideModal = () => {
    dispatch(hideModal("isShowOTP"));
  };

  const configureCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          handleSendSms();
          console.log("Recaptca varified");
        },
        defaultCountry: "IN",
      }
    );
  };

  const handleSendSms = (values) => {
    configureCaptcha();
    const data = window.dataUser;
    const phone_number = "+84" + data.phone_number.slice(1);
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

  const handleSubmitForm = (values) => {
    const data = window.dataUser;
    console.log(data)
    window.confirmationResult
      .confirm(values.otp)
      .then((result) => {
        handleHideModal();
        if (window.isForgotPass) {
          dispatch(forgotPassword(data, navigate));
          return;
        }
      })
      .catch((error) => {
        alert("Mã xác nhận không chính xác");
      });
  };
  const body = (
    <Fade in={isShowOTP.open}>
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
          <p style={{ fontSize: "22px" }}>Xác nhận OTP</p>
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
          <p>Vui lòng không chia sẻ mã xác nhận để tránh mất tài khoản</p>
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
          <p>Vui lòng nhập mã OTP gửi tới số điện thoại của bạn</p>
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
                placeholder="Nhập mã xác nhận"
                error={errors.otp}
                helperText={errors.otp}
                touched={touched.otp}
                type="text"
                fullWidth
                variant="outlined"
                name="otp"
                onChange={handleChange}
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
                  Gửi lại mã
                </Button>

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  Xác nhận
                </Button>
                <Button variant="secondary" onClick={() => handleHideModal()}>
                  Hủy
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Paper>
    </Fade>
  );
  return <BaseModal body={body} isShow={isShowOTP.open} />;
}

export default OTPModal;
