import {
  FormControlLabel,
  Menu,
  MenuItem,
  Radio,
  RadioGroup,
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

function TableRow({ item, headCells, listItemMenu = [], handleClick }) {
  const classes = useStyles();
  const [contextMenu, setContextMenu] = useState(null);
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

  const handleClose = () => {
    setContextMenu(null);
  };

  const handleClickItem = (event, item) => {
    handleClick(item);
    setContextMenu(null);
  };

  return (
    item && (
      <>
        <MUITableRow
          className={classes.tableRow}
          onContextMenu={handleClick ? handleRightClick : null}
          onDoubleClick={handleClick ? handleClickItem : null}
        >
          {headCells.map((itemhead) =>
            itemhead.id == "radio" ? (
              <MUITableCell
                style={{
                  width: `${headCells[0].sizeCellWidth}px`,
                }}
              >
                <FormControlLabel value={item.id} control={<Radio />} />
              </MUITableCell>
            ) : itemhead.editable ? (
              <TableCellEditable
                sizeCellWidth={itemhead.sizeCellWidth}
                key={itemhead.id}
                itemhead={itemhead}
                item={item}
              />
            ) : (
              <MUITableCell
                key={itemhead.id}
                style={{
                  width: `${itemhead.sizeCellWidth}px`,
                }}
                align={itemhead.numeric ? "right" : "left"}
              >
                {itemhead.calc
                  ? itemhead.calc.fun(item["quantity"], item["price"])
                  : item[itemhead.id]}
              </MUITableCell>
            )
          )}
          {listItemMenu.length > 0 && (
            <ContextMenu
              contextMenu={contextMenu}
              handleClose={handleClose}
              handleClick={handleClick}
              listItemMenu={listItemMenu}
            />
          )}
        </MUITableRow>
      </>
    )
  );
}

export default TableRow;
