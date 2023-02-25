import { Search } from "@mui/icons-material";
import { InputAdornment, TableBody, Toolbar } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import useDebounce from "../../../hooks/useDebounce";
import useTable from "../../../hooks/useTable";
import Controls from "../../Form/controls/Controls";
import TableRow from "../../Side/TableRow";
import { TotalPrice } from "../../../utils/Calc";
const headCells = [
  { id: "id", numeric: false, label: "Id dịch vụ" },
  { id: "nameService", numeric: false, label: "Tên dịch vụ" },
  { id: "department", numeric: false, label: "Phòng ban" },
  { id: "quantity", numeric: true, editable: true, label: "Số lượng" },
  { id: "price", numeric: true, label: "Giá" },
  {
    id: "totalPrice",
    numeric: true,
    calc: { fun: (quantity, price) => TotalPrice(quantity, price) },
    label: "Thành tiền",
  },
  { id: "state", numeric: false, label: "Trạng thái" },
];

const records = [
  {
    id: 1,
    nameService: "bui quang huu",
    quantity: 2,
    department: "kham bth",
    price: 100000,
    totalPrice: 100000,
    state: "trang thai",
  },
  {
    id: 2,
    nameService: "bui quang huu",
    quantity: 1,
    department: "kham bth",
    price: 100000,
    totalPrice: 100000,
    state: "trang thai",
  },
  {
    id: 3,
    nameService: "bui quang huu",
    quantity: 1,
    department: "kham bth",
    price: 100000,
    totalPrice: 100000,
    state: "trang thai",
  },
];

const options = [{ id: "", title: "Không" }];

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "20%",
    paddingRight: "10px",
  },
  selected: {
    width: "15%",
  },
  newButton: {
    right: "10px",
  },
  toolBar: {
    "& .MuiFormControl-root": {
      paddingRight: "10px",
    },
  },
}));
function ClinicalService() {
  const classes = useStyles();
  const [filter, setFiler] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue, 500);

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const handleSearch = (e) => {
    if (searchValue.startsWith(" ")) {
      return;
    }

    setSearchValue(e.target.value);
  };

  const onChangeSelected = (e) => {
    setFiler(e.target.value);
  };

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, headCells, filterFn);

  return (
    <>
      <Toolbar className={classes.toolBar} sx={{ pt: 2 }}>
        <Controls.Input
          label="Tìm kiếm dịch vụ"
          className={classes.searchInput}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          onChange={handleSearch}
        />
        <Controls.Select
          label="Nhóm dịch vụ"
          variant="outlined"
          onChange={onChangeSelected}
          value={filter}
          className={classes.selected}
          options={options}
          // className={classes.newButton}
          onClick={() => {}}
        />
      </Toolbar>
      <TblContainer>
        <TblHead />
        <TableBody
          style={{ overflowY: "scroll", height: "360px", display: "block" }}
        >
          {recordsAfterPagingAndSorting().map((item) => {
            return (
              <TableRow
                key={item.id}
                item={item}
                headCells={headCells}
                listItemMenu={[{ title: "Xóa" }]}
              />
            );
          })}
        </TableBody>
      </TblContainer>
      <TblPagination />
    </>
  );
}

export default ClinicalService;
