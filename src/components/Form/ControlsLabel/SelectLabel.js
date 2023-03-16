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
import { resolve } from "../../../utils/Calc";
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
    "& .MuiTypography-root": {},
  },

  selected: {
    width: "100%",
    "& .MuiInputBase-root": {
      paddingTop: "4px !important",
      paddingBottom: "4px !important",
      paddingLeft: "0px !important",
    },
  },
}));

function SelectedLabel(props) {
  const classes = useStyles();

  const {
    value,
    name,
    accessField,
    label,
    error = null,
    onChange = null,
    InputProps = null,
    className,
    disable,
    filterSelectedOptions = false,
    setFieldValue,
    require = false,
    size,
    sizeInput,
    options,
  } = props;
  
  // const [valueOption, setValueOption] = useState(options[0]);

  // const handleChangeValue = (event, newValue) => {

  //   if (onChange) {
  //     onChange(newValue);
  //     setValueOption(newValue);
  //   } else {
  //     if (newValue == null) {
  //       setValueOption(options[0]);
  //     } else {
  //       setValueOption(newValue);
  //     }
  //   }
  // };

  return (
    <>
      <Grid item xs={size[0]}>
        <Label label={label} require={require} className={classes.title} />
      </Grid>
      <Grid item xs={size[1]}>
        <Autocomplete
          disablePortal
          disabled={disable}
          id="combo-box-demo"
          size={sizeInput || "small"}
          className={classes.selected}
          options={options}
          value={value}
          name={name}
          onChange={(e,option) => setFieldValue(name,option)}
          getOptionLabel={(option) => resolve(option,accessField)}
          renderInput={(params) => (
            <TextField {...params}  />
          )}
        />
      </Grid>
    </>
  );
}

export default SelectedLabel;
