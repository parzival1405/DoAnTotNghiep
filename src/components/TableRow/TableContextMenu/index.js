import {
  FormControlLabel,
  MenuItem,
  Radio,
  TableCell as MUITableCell,
  TableRow as MUITableRow,
  Select,
  FormControl,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { resolve } from "../../../utils/Calc";
import ContextMenu from "./ContextMenu";
import TableCellEditable from "./TableCellEditable";
import State from "../../State";
import dayjs, { Dayjs } from "dayjs";

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

function TableRow({
  item,
  index,
  headCells,
  listItemMenu = [],
  handleDoubleClick,
  handleChangeTableCell,
}) {
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
                item={item}
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
            ) : itemhead.id == "stt" ? (
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
                  {parseInt(index) + 1}
                </div>
              </MUITableCell>
            ) : itemhead.typeInput == "select" && itemhead.id == "unit" ? (
              <MUITableCell
                key={itemhead.id}
                style={{
                  width: `${itemhead.sizeCellWidth}px`,
                }}
                component="th"
                scope="row"
                align={itemhead.numeric ? "right" : "left"}
              >
                <FormControl sx={{ minWidth: "100%" }} size="small">
                  <Select
                    labelId="demo-select-small"
                    id="unit"
                    onChange={(event) => itemhead.onChange(item, event)}
                  >
                    <MenuItem value="thung">Thùng</MenuItem>
                    <MenuItem value="hop">Hộp</MenuItem>
                    <MenuItem value="vi">Vỉ</MenuItem>
                    <MenuItem value="vien-chai">Viên/chai</MenuItem>
                  </Select>
                </FormControl>
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
                    : itemhead.type == "date"
                    ? dayjs(resolve(item, itemhead.id)).format("DD/MM/YYYY")
                    : itemhead.type == "age"
                    ? dayjs().diff(resolve(item, itemhead.id), "year") ||
                      "không có thông tin"
                    : itemhead.type == "gender"
                    ? resolve(item, itemhead.id)
                      ? "Nam"
                      : "Nữ"
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
