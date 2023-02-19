import React from "react";
import { TextField } from "@mui/material";

export default function Input(props) {
  const {
    type = "text",
    name,
    label,
    value,
    error = null,
    onChange,
    InputProps = null,
    className,
  } = props;
  return (
    <TextField
      className={className}
      type={type}
      variant="outlined"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      InputProps={InputProps}
      {...(error && { error: true, helperText: error })}
    />
  );
}
