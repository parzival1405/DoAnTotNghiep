import React, { useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import { styled, useTheme } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import StarBorder from "@mui/icons-material/StarBorder";
import { items } from "../../utils/Items";
import { Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { HideParent, SetParent, ShowSide } from "../../redux/actions/sidebar";
const drawerWidth = 300;

const MiniDrawerWrap = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  position: "unset",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  position: "unset",
});

function ItemMenu({ obj, drawerOpen, sub = false }) {
  const { IDSelected, IDParent, ParentWithSelectedChild } = useSelector(
    (state) => state.sidebar
  );
  const dispatch = useDispatch();

  const handleClick = () => {
    if (obj.subMenu.length > 0) {
      dispatch(SetParent(obj.id));
    } else {
      dispatch(ShowSide(obj.id));
    }

    if (IDParent == obj.id) {
      dispatch(HideParent(obj.id));
    }
  };

  const subMenu = obj.subMenu.length > 0;

  return (
    <ListItem disablePadding sx={{ display: "block" }}>
      <ListItemButton
        onClick={handleClick}
        sx={
          sub
            ? { pl: 4 }
            : {
                minHeight: 48,
                justifyContent: drawerOpen ? "initial" : "center",
                px: 2.5,
              }
        }
        style={{
          backgroundColor:
            ParentWithSelectedChild == obj.id
              ? "#4eb0ba"
              : ParentWithSelectedChild == null && IDSelected == obj.id
              ? "#4eb0ba"
              : IDSelected == obj.id
              ? "#73d5de"
              : "",
          color: ParentWithSelectedChild == obj.id || IDSelected == obj.id ? "#fffffa" : "",
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: drawerOpen ? 3 : "auto",
            justifyContent: "center",
          }}
          style={{color: ParentWithSelectedChild == obj.id || IDSelected == obj.id ? "#fffffa" : "",}}
        >
          {obj.icon}
        </ListItemIcon>
        <ListItemText primary={obj.name} sx={{ opacity: drawerOpen ? 1 : 0 }} />
        {drawerOpen &&
          subMenu &&
          (IDParent == obj.id ? <ExpandLess /> : <ExpandMore />)}
      </ListItemButton>
      {subMenu && (
        <Collapse in={IDParent == obj.id} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {obj.subMenu.map((newObj, newIndex) => (
              <ItemMenu
                key={newIndex}
                obj={newObj}
                drawerOpen={drawerOpen}
                sub={true}
              />
            ))}
          </List>
        </Collapse>
      )}
    </ListItem>
  );
}

function MiniDrawer({ open }) {
  return (
    <MiniDrawerWrap variant="permanent" open={open}>
      <List>
        {items.map((obj, index) => (
          <ItemMenu key={index} obj={obj} drawerOpen={open} />
        ))}
      </List>
    </MiniDrawerWrap>
  );
}

export default MiniDrawer;
