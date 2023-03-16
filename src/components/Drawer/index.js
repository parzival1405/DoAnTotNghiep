import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";

import AppBarHeader from "./AppBarHeader";
import MiniDrawer from "./MiniDrawer";
import Button from "../Form/controls/Button";
import Controls from "../Form/controls/Controls";
import { useNavigate } from "react-router-dom";
import Side from "../Side";
import { useSelector } from "react-redux";

function Drawer() {
  const [open, setOpen] = useState(true);
  const { IDSelected } = useSelector((state) => state.sidebar);
  const navigate = useNavigate();
  const handleDrawerClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <AppBarHeader handleDrawerClick={handleDrawerClick} />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <MiniDrawer open={open} />
        <Box component="main" sx={{ flexGrow: 1, p: 3,height:"700px" }} style={{padding:"10px"}}>
          {IDSelected && <Side/> }
        </Box>
      </div>
    </Box>
  );
}

export default Drawer;
