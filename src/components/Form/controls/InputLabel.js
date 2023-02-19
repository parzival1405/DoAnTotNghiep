import { Box, Grid, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

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
    "& .MuiInputBase-input": {
      padding: "8px",
    },
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
  } = props;
  return (
    <>
      <Grid item xs={size[0]}>
        <Typography variant="h6" component="div" className={classes.title}>
          {label}
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
      </Grid>
      <Grid item xs={size[1]}>
        <TextField
          className={classes.input}
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
