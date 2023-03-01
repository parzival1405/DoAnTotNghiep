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
    label,
    error = null,
    onChange = null,
    InputProps = null,
    className,
    require = false,
    size,
    sizeInput,
    options,
  } = props;
  const [valueOption, setValueOption] = useState(options[0]);
  const handleChangeValue = (event, newValue) => {
    if (newValue.id == options[0]) {
      return;
    }

    if (onChange) {
      onChange(newValue);
    } else {
      if (newValue == null) {
        setValueOption(options[0]);
      } else {
        setValueOption(newValue);
      }
    }
  };
  return (
    <>
      <Grid item xs={size[0]}>
        <Label label={label} require={require} className={classes.title} />
      </Grid>
      <Grid item xs={size[1]}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          size={sizeInput || "small"}
          className={classes.selected}
          options={options}
          value={valueOption}
          onChange={(event, newValue) => handleChangeValue(event, newValue)}
          getOptionLabel={(option) => option.title}
          renderInput={(params) => (
            <TextField {...params}  />
          )}
        />
        {/* <FormControl
          variant="outlined"
          className={classes.selected}
          size={size || "small"}
          {...(error && { error: true })}
        >
          <Select
            value={value}
            onChange={onChange}
          >
            {options.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.title}
              </MenuItem>
            ))}
          </Select>
          {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl> */}
      </Grid>
    </>
  );
}

export default SelectedLabel;
