import { Menu, MenuItem } from "@mui/material";
import React from "react";

function ContextMenu({ contextMenu, handleClose,handleClick, listItemMenu }) {
  return (
    <Menu
      keepMounted
      open={contextMenu !== null}
      onClose={handleClose}
      anchorReference="anchorPosition"
      anchorPosition={
        contextMenu !== null
          ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
          : undefined
      }
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
    >
      {listItemMenu.map((item) => (
        <MenuItem key={item.title} onClick={handleClick}>{item.title}</MenuItem>
      ))}
    </Menu>
  );
}

export default ContextMenu;
