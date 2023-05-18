import { Chip } from "@mui/material";
import React from "react";

function State({ type, color }) {
  return (
    <Chip
      label={
        type == "DONE" ? "Hoàn thành" : type == "DOING" ? "Đang làm" :type ==  "WAIT" ? "Đang Đợi" : "status"
      }
      color={color}
    />
  );
}

export default State;
