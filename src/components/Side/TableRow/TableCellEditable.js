import { TableCell } from "@mui/material";
import React, { useState } from "react";

function TableCellEditable({ itemhead, item, sizeCellWidth }) {
  const [value, setState] = useState(item.quantity);

  const onChange = (e) => {
    setState(e.target.value);
  };

  return (
    <TableCell
      style={{ width: `${sizeCellWidth}px`}}
      align={itemhead.numeric ? "right" : "left" }
    >
      <input
        style={{ maxWidth: "50px" }}
        min="1"
        type="number"
        value={value}
        onChange={onChange}
      />
    </TableCell>
  );
}

export default TableCellEditable;
