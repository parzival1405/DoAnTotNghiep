import { TableCell } from "@mui/material";
import React, { useState } from "react";

function TableCellEditable({ itemhead, value, sizeCellWidth }) {
  const [valueInput, setValueInput] = useState(value);

  const onChange = (e) => {
    setValueInput(e.target.value);
  };

  return (
    <TableCell
      style={{ width: `${sizeCellWidth}px`}}
      align={itemhead.numeric ? "right" : "left" }
    >
      <input
        min="1"
        type="number"
        value={valueInput}
        onChange={onChange}
      />
    </TableCell>
  );
}

export default TableCellEditable;
