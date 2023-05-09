import { Fade, ImageListItem, ImageListItemBar, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import BaseModal from "../../Modal/BaseModal";
import ModalHeader from "../../Modal/ModalHeader";
import { Modal } from "@mui/material";
import { useDispatch } from "react-redux";
import { hideModal } from "../../../redux/actions/modal";

const useStyle = makeStyles((theme) => ({
  paper: {
    width: "70%",
    height: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    padding: "20px",
    " .MuiImageListItem-img": {
      width: "90% !important",
    },
    overflowY: "scroll",
  },
}));
function ImageModal({ name, src, onClose, isShowFullImage }) {
  const classes = useStyle();
  const body = (
    <Fade in={isShowFullImage}>
      <Paper className={classes.paper} id="modal-patient-reception">
        <ModalHeader title={name} onClose={onClose} />
        <ImageListItem>
          <img
            src={src}
            alt={name}
            style={{ width: "100%", height: "100%" }}
            loading="lazy"
          />
        </ImageListItem>
      </Paper>
    </Fade>
  );
  return (
    <BaseModal body={body} isShow={isShowFullImage} callback={onClose} />
  );
}

export default ImageModal;
