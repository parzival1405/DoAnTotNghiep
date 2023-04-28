import { Typography } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";

const LINES_TO_SHOW = 1;

const useStyles = makeStyles({
  multiLineEllipsis: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-line-clamp": LINES_TO_SHOW,
    "-webkit-box-orient": "vertical"
  }
});

function Label({ label, require, className }) {
  const classes = useStyles();
  return (
    <Typography
      variant="h6"
      component="div"
      className={className}
    >
      <Typography
      variant="string"
      component="label"
      className={classes.multiLineEllipsis}
      >{label}</Typography>
      <p
        style={
          require
            ? { margin: "0 0 0 2px", color: "red" }
            : { margin: "0 0 0 2px", color: "transparent" }
        }
      >
        *
      </p>
    </Typography>
  );
}

export default Label;
