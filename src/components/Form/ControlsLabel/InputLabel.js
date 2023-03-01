import { Box, Grid, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import Label from "./Label";

const useStyles = makeStyles((theme) => ({
  box: {
    display: "flex",
    alignItems: "center",
  },

  title: {
    
    display: "flex",
    marginRight: "10px !important",
    justifyContent: "flex-end",
    color: "rgba(0, 0, 0, 0.6) !important",
    "& .MuiTypography-root": {
      },
  },

  input: {
    width: "100%",
  },
}));

function InputLabel(props) {
  const classes = useStyles();
  const {
    type = "text",
    name,
    label,
    value,
    error = null,
    onChange,
    InputProps = null,
    className,
    require = false,
    size,
    sizeInput,
    disable
  } = props;
  return (
    <>
      <Grid item xs={size[0]}>
        <Label label={label} require={require} className={classes.title}/>
      </Grid>
      <Grid item xs={size[1]}>
        <TextField
          disabled={disable}
          className={classes.input}
          size={sizeInput || "small"}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          InputProps={InputProps}
          {...(error && { error: true, helperText: error })}
        />
      </Grid>
    </>
  );
}

export default InputLabel;
