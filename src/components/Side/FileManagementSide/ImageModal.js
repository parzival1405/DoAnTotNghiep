import { Fade, ImageListItem, ImageListItemBar, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import BaseModal from "../../Modal/BaseModal";
import ModalHeader from "../../Modal/ModalHeader";
const useStyle = makeStyles((theme) => ({
  paper: {
    width: "70%",
    padding: "20px",
  },
}));
function ImageModal({ name, src, onClose, isShowFullImage }) {
  const classes = useStyle();
  const body = (
    <Fade in={isShowFullImage}>
      <Paper className={classes.paper} id="modal-patient-reception">
        <ModalHeader title={name} onClose={onClose} />
        <ImageListItem>
          <img src={src} alt={name} loading="lazy" />
        </ImageListItem>
      </Paper>
    </Fade>
  );
  return <BaseModal body={body} isShow={isShowFullImage} />;
}

export default ImageModal;
