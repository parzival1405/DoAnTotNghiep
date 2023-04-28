import { Grid, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import Label from "./Label";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

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
    disablePast,
  } = props;
  const [valueDate, setValueDate] = useState(
    currentDate ? new Date() : value ? value : null
  );
  return (
    <>
      <Grid item xs={size[0]}>
        <Label label={label} require={require} className={classes.title} />
      </Grid>
      <Grid item xs={size[1]}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            disablePast={disablePast}
            disabled={disable}
            className={classes.dateSelected}
            value={valueDate}
            onChange={(newValue) => {
              setValueDate(newValue);
              onChange(dayjs(newValue).format("DD/MM/YYYY"));
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Grid>
    </>
  );
}

export default DateLabel;
