import React from "react";
import {
  Avatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import AvatarIcon from "../../../assets/img/avt_doctor.png";

import useStyles from "./styles";

function DoctorPopover() {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <ListItemButton aria-describedby={id} onClick={handleClick} color="secondary" className={classes.buttonAvt}>
        <ListItemIcon>
          <Avatar alt="avt" src={AvatarIcon}></Avatar>
        </ListItemIcon>
        <ListItemText className={classes.text} primary="Bac Si" />
        <ExpandMore />
      </ListItemButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
      </Popover>
    </>
  );
}

export default DoctorPopover;
