import { Button, Fade, Paper } from "@mui/material";

import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideModal } from "../../../redux/actions/modal";
import BaseModal from "../BaseModal";
import useStyles from "../styles";

import { QrReader } from "react-qr-reader";
import { getMedicalLettersById } from "../../../redux/actions/medicalLetter";
import ModalHeader from "../ModalHeader";

function ReadQRCodeModal() {
  const  isShowReadQRCodeModal = useSelector((state) => state.modal.isShowReadQRCodeModal);

  const classes = useStyles();
  const dispatch = useDispatch();

  const handleHideModal = () => {
    dispatch(hideModal("isShowReadQRCodeModal"));
  };

  const handleScanWebCam = (result, error) => {
    if (result) {
      dispatch(getMedicalLettersById(result.text,"isShowReadQRCodeModal"));
    }
  };

  //
  const body = (
    <Fade in={isShowReadQRCodeModal.open}>
      <Paper
        className={classes.paper}
        style={{ width: "30%" }}
        id="modal-add-friend"
      >
        <ModalHeader title="Quét QR code" onClose={handleHideModal} />
        <div style={{ width:"100%"}}>
          <QrReader
            delay={300}
            style={{ width: "100%" }}
            onResult={handleScanWebCam}
          />
        </div>
      </Paper>
    </Fade>
  );
  return <BaseModal body={body} isShow={isShowReadQRCodeModal.open} />;
}

export default ReadQRCodeModal;
