import {
  Autocomplete,
  Box,
  FormControl,
  FormHelperText,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import Label from "./Label";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

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
    "& .MuiTypography-root": {},
  },

  dateSelected: {
    width: "100%",
  },
}));

function DateLabel(props) {
  const classes = useStyles();
  const {
    value,
    name,
    label,
    error = null,
    onChange,
    InputProps = null,
    className,
    require = false,
    size,
    disable = false,
    currentDate,
    sizeInput,
  } = props;
  const [valueDate, setValueDate] = useState(currentDate ? new Date() : null);
  return (
    <>
      <Grid item xs={size[0]}>
        <Label label={label} require={require} className={classes.title} />
      </Grid>
      <Grid item xs={size[1]}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            disabled={disable}
            className={classes.dateSelected}
            value={valueDate}
            onChange={(newValue) => {
              setValueDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Grid>
    </>
  );
}

export default DateLabel;
