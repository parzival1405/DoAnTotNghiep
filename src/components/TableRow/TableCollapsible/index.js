import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { Fragment, useState } from "react";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import useTable from "../../../hooks/useTable";

const useStyles = makeStyles((theme) => ({
  tableRow: {
    tableLayout: "fixed !important",
    display: "table !important",
    width: "100% !important",
  },

  bbn: {
    borderBottom: "none",
  },
}));

function TableCollapsible({ item, headCells, headCollapseCells }) {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const { TblHead } =
    useTable([], headCollapseCells, null);
  return (
    <Fragment>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" } }}
        className={classes.tableRow}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        {headCells.map(
          (itemhead) =>
            itemhead.id && (
              <TableCell
                key={itemhead.id}
                style={{
                  width: `${itemhead.sizeCellWidth}px`,
                }}
                align={itemhead.numeric ? "right" : "left"}
              >
                {itemhead.calc
                  ? itemhead.calc.fun(item["quantity"], item["price"])
                  : item[itemhead.id]}
              </TableCell>
            )
        )}
      </TableRow>
      <TableRow className={classes.tableRow}>
        <TableCell
          style={
            open
              ? { paddingBottom: 0, paddingTop: 0 }
              : { paddingBottom: 0, paddingTop: 0, borderBottom: "none" }
          }
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Danh sách thuốc
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  {headCollapseCells.map(
                    (itemhead) =>
                      itemhead.id && (
                        <TableCell
                          key={itemhead.id}
                          style={{
                            width: `${itemhead.sizeCellWidth}px`,
                          }}
                          align={itemhead.numeric ? "right" : "left"}
                        >
                          {itemhead.label}
                        </TableCell>
                      )
                  )}
                </TableHead>
                <TableBody>
                  {item.sub.map((itemSub) => (
                    <TableRow key={itemSub.id}>
                      {headCollapseCells.map((itemhead) => (
                        <TableCell
                          key={itemhead.id}
                          style={{
                            width: `${itemhead.sizeCellWidth}px`,
                          }}
                          align={itemhead.numeric ? "right" : "left"}
                        >
                          {itemSub[itemhead.id]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

export default TableCollapsible;
