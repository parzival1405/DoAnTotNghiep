import { TableCell, TextField } from "@mui/material";
import React, { useState } from "react";

function TableCellEditable({ itemhead,item, value, sizeCellWidth,handleChange }) {
  const [valueInput, setValueInput] = useState(value);

  return (
    <TableCell
      style={{ width: `${sizeCellWidth}px`}}
      align={itemhead.numeric ? "right" : "left" }
    >
      <TextField
        min="1"
        size="small"
        type="number"
        InputProps={{ inputProps: { min: 0} }}
        // value={item.values}
        onChange={(event) => itemhead.onChange(item,event)}
      />
    </TableCell>
  );
}

export default TableCellEditable;
