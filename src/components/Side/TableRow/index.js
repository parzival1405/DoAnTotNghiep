import {
  Menu,
  MenuItem,
  TableCell as MUITableCell,
  TableRow as MUITableRow,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ShowExaminationInformation } from "../../../redux/actions/tab";
import { setCurrentPatient } from "../../../redux/actions/patient";

import ContextMenu from "./ContextMenu";
import { useNavigate } from "react-router-dom";
import TableCellEditable from "./TableCellEditable";

const useStyles = makeStyles((theme) => ({
  tableRow: {
    tableLayout: "fixed !important",
    display: "table !important",
    width: "100% !important",
  },
}));

function TableRow({ item, headCells, listItemMenu }) {
  const [contextMenu, setContextMenu] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleRightClick = (event) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 4,
          }
        : null
    );
  };

  const handleClick= () => {
    try {
      dispatch(setCurrentPatient(item));
      dispatch(ShowExaminationInformation());
      navigate("/Checkup");
    } catch (error) {
      alert("Sai mật khẩu");
    }
    setContextMenu(null);
  };

  const handleClose = () =>{
    setContextMenu(null);
  }
  return (
    item && (
      <>
        <MUITableRow
          className={classes.tableRow}
          onContextMenu={(e) => handleRightClick(e)}
          onDoubleClick = {() => handleClick()}
        >
          {headCells.map((itemhead) =>
            itemhead.editable ? (
              <TableCellEditable key={itemhead.id} itemhead={itemhead} item={item}/>
            ) : (
              <MUITableCell
                key={itemhead.id}
                align={itemhead.numeric == true ? "right" : "left"}
              >
                
                { itemhead.calc ? itemhead.calc.fun(item["quantity"],item["price"]) : item[itemhead.id]}
              </MUITableCell>
            )
          )}
          {listItemMenu.length > 0 && <ContextMenu
            contextMenu={contextMenu}
            handleClose={handleClose}
            handleClick={handleClick}
            listItemMenu={listItemMenu}
          />}
        </MUITableRow>
      </>
    )
  );
}

export default TableRow;
