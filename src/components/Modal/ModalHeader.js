import { Close } from "@mui/icons-material";
import { Button, IconButton, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyle = makeStyles((theme) => ({
  title: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px !important",
    "& .MuiButtonBase-root": {
    //   padding: "0",
    },
  },
}));

function ModalHeader({ title, onClose }) {
  const classes = useStyle();
  return (
    <Typography variant="h5" component="div" className={classes.title}>
      {title}
      <IconButton onClick={onClose}>
        <Close />
      </IconButton>
    </Typography>
  );
}

export default ModalHeader;
