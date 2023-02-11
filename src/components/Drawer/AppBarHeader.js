import React from "react";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Logo from "../../assets/img/logo.png";
import { Avatar } from "@mui/material";
import DoctorPopover from "../Popover/DoctorPopover";
import useStyles from "./styles";
const drawerWidth = 300;
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function AppBarHeader({ handleDrawerClick }) {
  const classes = useStyles();

  return (
    <AppBar position="relative">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerClick}
          edge="start"
        >
          <MenuIcon />
        </IconButton>
        <Avatar alt="Logo" src={Logo} sx={{ mr: 1, ml: 1 }} />
        <Typography
          className={classes.text}
          variant="h6"
          noWrap
          component="div"
        >
          H2 polyclinic
        </Typography>
        <DoctorPopover/>
      </Toolbar>
    </AppBar>
  );
}

export default AppBarHeader;
