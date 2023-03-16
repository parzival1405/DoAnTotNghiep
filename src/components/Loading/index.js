import { makeStyles } from "@mui/styles";
import { CircularProgress, Typography } from "@mui/material";
import React from "react";
const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    width: "100%",
    height: "100%",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    zIndex: "1",
    backgroundColor: "rgba(255, 255, 255,0.8)",
    "& p": {
      color: "white",
      fontWeight: "400",
      fontSize: "2rem",
    },
  },
}));

function Loading({className}) {
  const classes = useStyles();
  return (
    <div className={[classes.root,className].join(" ")}>
      <CircularProgress />
      <Typography variant="h6">Loading</Typography>
    </div>
  );
}

export default Loading;
