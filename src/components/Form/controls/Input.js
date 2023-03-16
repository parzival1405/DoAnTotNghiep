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
    onKeyDown,
    InputProps = null,
    className,
    size
  } = props;
  return (
    <TextField
      className={className}
      type={type}
      variant="outlined"
      label={label}
      size={size || "small"}
      name={name}
      onKeyDown={onKeyDown}
      value={value}
      onChange={onChange}
      InputProps={InputProps}
      {...(error && { error: true, helperText: error })}
    />
  );
}
