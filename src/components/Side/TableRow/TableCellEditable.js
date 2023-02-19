import { TableCell } from "@mui/material";
import React, { useState } from "react";

function TableCellEditable({itemhead,item}) {

  const [value,setState] = useState(item.quantity);

  const onChange = (e) => {
    setState(e.target.value)
  }

  return (
    <TableCell align={itemhead.numeric == true ? "right" : "left"}>
      <input style={{maxWidth:"50px"}} min="1" type="number" value={value} onChange={onChange} />
    </TableCell>
  );
}

export default TableCellEditable;
