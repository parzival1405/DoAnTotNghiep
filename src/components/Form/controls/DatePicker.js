import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  "& .MuiFormControl-root": {
    width: "75% !important",
  },
  dateSelected: {
    width:"20%",
    "& .MuiFormControl-root": {},
  },
}));

export default function DatePicker(props) {
  const classes = useStyles();
  const { name, label, value, size, onChange, disable, currentDate } = props;
  const [valueDate, setValueDate] = useState(currentDate ? new Date() : null);
  return (
    <div className={classes.dateSelected}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MuiDatePicker
          disabled={disable}
          label={label}
          value={valueDate}
          onChange={(newValue) => {
            setValueDate(newValue);
          }}
          renderInput={(params) => (
            <TextField size={size || "small"} {...params} />
          )}
        />
      </LocalizationProvider>
    </div>
  );
}
