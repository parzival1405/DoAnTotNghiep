import { Chip } from "@mui/material";
import React from "react";

function State({ type, color }) {
  return (
    <Chip
      label={
        type == "DONE" ? "Hoàn thoành" : type == "DOING" ? "Đang làm" : "status"
      }
      color={color}
    />
  );
}

export default State;
