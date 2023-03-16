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
import { resolve } from "../../../utils/Calc";
import ContextMenu from "./ContextMenu";
import { useNavigate } from "react-router-dom";
import TableCellEditable from "./TableCellEditable";
import State from "../../State";

const useStyles = makeStyles((theme) => ({
  tableRow: {
    tableLayout: "fixed !important",
    display: "table !important",
    width: "100% !important",
  },
  textContainer: {
    display: "block",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

function TableRow({ item, headCells, listItemMenu = [], handleDoubleClick }) {
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
    handleDoubleClick(item);
    setContextMenu(null);
  };

  return (
    item && (
      <>
        <MUITableRow
          className={classes.tableRow}
          onContextMenu={handleDoubleClick ? handleRightClick : null}
          onDoubleClick={handleDoubleClick ? handleClickItem : null}
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
                value={resolve(item, itemhead.id)}
              />
            ) : itemhead.id == "status" ? (
              <MUITableCell
                key={itemhead.id}
                style={{
                  width: `${itemhead.sizeCellWidth}px`,
                }}
                align={itemhead.numeric ? "right" : "left"}
              >
                <State type={resolve(item, itemhead.id)} color="primary" />
              </MUITableCell>
            ) : (
              <MUITableCell
                key={itemhead.id}
                style={{
                  width: `${itemhead.sizeCellWidth}px`,
                }}
                component="th"
                scope="row"
                align={itemhead.numeric ? "right" : "left"}
              >
                <div className={classes.textContainer}>
                  {itemhead.calc
                    ? itemhead.calc.fun(item["quantity"], item["price"])
                    : resolve(item, itemhead.id)}
                </div>
              </MUITableCell>
            )
          )}
          {listItemMenu.length > 0 && (
            <ContextMenu
              contextMenu={contextMenu}
              handleClose={handleClose}
              listItemMenu={listItemMenu}
            />
          )}
        </MUITableRow>
      </>
    )
  );
}

export default TableRow;
