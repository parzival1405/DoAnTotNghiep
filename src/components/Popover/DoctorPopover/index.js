import React from "react";
import {
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import AvatarIcon from "../../../assets/img/avt_doctor.png";

import useStyles from "./styles";
import { logout } from "../../../redux/actions/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
function DoctorPopover() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout(navigate));
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <ListItemButton
        aria-describedby={id}
        onClick={handleClick}
        color="secondary"
        className={classes.buttonAvt}
      >
        <ListItemIcon>
          <Avatar alt="avt" src={AvatarIcon}></Avatar>
        </ListItemIcon>
        <ListItemText className={classes.text} primary={user.fullName} />
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
        <List>
          <ListItem onClick={handleLogout}>
            <ListItemText primary={"Đăng xuất"} />
          </ListItem>
        </List>
      </Popover>
    </>
  );
}

export default DoctorPopover;
