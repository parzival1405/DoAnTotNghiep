import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useTable from "../../../hooks/useTable";
import Layout from "../Layout";
import Controls from "../../Form/controls/Controls";
import {
  InputAdornment,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Toolbar,
} from "@mui/material";
import { Search, Add } from "@mui/icons-material";
import useDebounce from "../../../hooks/useDebounce";
import TableRow from "../TableRow";

const headCells = [
  { id: "id", numeric: false, label: "Id bệnh nhân" },
  { id: "fullName", numeric: false, label: "Tên bệnh nhân" },
  { id: "age", numeric: true, label: "Tuổi" },
  { id: "category", numeric: false, label: "Loại khám" },
  { id: "detail", numeric: false, label: "CĐ Lâm sàng" },
  { id: "result", numeric: false, label: "Kết luận" },
  { id: "state", numeric: false, label: "Trạng thái" },
];

const records = [
  {
    id: 1,
    fullName: "bui quang huu",
    age: 4564,
    category: "kham bth",
    detail: "chi tiet kham",
    result: "ket qua",
    state: "trang thai",
  },
  {
    id: 2,
    fullName: "bui quang huu",
    age: 453,
    category: "kham bth",
    detail: "chi tiet kham",
    result: "ket qua",
    state: "trang thai",
  },
  {
    id: 3,
    fullName: "bui quang huu",
    age: 435,
    category: "kham bth",
    detail: "chi tiet kham",
    result: "ket qua",
    state: "trang thai",
  },
  {
    id: 4,
    fullName: "bui quang huu",
    age: 365,
    category: "kham bth",
    detail: "chi tiet kham",
    result: "ket qua",
    state: "trang thai",
  },
  {
    id: 5,
    fullName: "bui quang huu",
    age: 20,
    category: "kham bth",
    detail: "chi tiet kham",
    result: "ket qua",
    state: "trang thai",
  },
  {
    id: 6,
    fullName: "bui quang huu",
    age: 13,
    category: "kham bth",
    detail: "chi tiet kham",
    result: "ket qua",
    state: "trang thai",
  },
  {
    id: 7,
    fullName: "bui quang huu",
    age: 4564,
    category: "kham bth",
    detail: "chi tiet kham",
    result: "ket qua",
    state: "trang thai",
  },
  {
    id: 8,
    fullName: "bui quang huu",
    age: 453,
    category: "kham bth",
    detail: "chi tiet kham",
    result: "ket qua",
    state: "trang thai",
  },
  {
    id: 9,
    fullName: "bui quang huu",
    age: 435,
    category: "kham bth",
    detail: "chi tiet kham",
    result: "ket qua",
    state: "trang thai",
  },
  {
    id: 10,
    fullName: "bui quang huu",
    age: 365,
    category: "kham bth",
    detail: "chi tiet kham",
    result: "ket qua",
    state: "trang thai",
  },
  {
    id: 11,
    fullName: "bui quang huu",
    age: 20,
    category: "kham bth",
    detail: "chi tiet kham",
    result: "ket qua",
    state: "trang thai",
  },
  {
    id: 12,
    fullName: "bui quang huu",
    age: 13,
    category: "kham bth",
    detail: "chi tiet kham",
    result: "ket qua",
    state: "trang thai",
  },
];

const options = [
  { id: "", title: "Không" },
  {
    id: "fullName",
    title: "Họ & Tên",
  },
  {
    id: "age",
    title: "Tuổi",
  },
  {
    id: "category",
    title: "Loại Khám",
  },
  {
    id: "detail",
    title: "CĐ Lâm sàng",
  },
  {
    id: "result",
    title: "Kết luận",
  },
  {
    id: "state",
    title: "Trạng thái",
  },
];

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "25%",
    paddingRight: "10px",
  },
  selected: {
    width: "20%",
  },
  newButton: {
    right: "10px",
  },
  toolBar: {
    // paddingTop
  },
}));

function MedicalExaminationSide() {
  const classes = useStyles();
  const [filter, setFiler] = useState("");
  const [recordForEdit, setRecordForEdit] = useState(null);

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const [openPopup, setOpenPopup] = useState(false);
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, headCells, filterFn);
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue, 500);

  const handleSearch = (e) => {
    if (searchValue.startsWith(" ")) {
      return;
    }

    setSearchValue(e.target.value);
  };

  const onChangeSelected = (e) => {
    setFiler(e.target.value);
  };

  return (
    <>
      <Toolbar className={classes.toolBar} sx={{ pt: 2 }}>
        <Controls.Input
          label="Tìm kiếm"
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
          label="Tìm kiếm theo"
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
          style={{ overflowY: "scroll", height: "420px", display: "block" }}
        >
          {recordsAfterPagingAndSorting().map((item) => {
            return <TableRow key={item.id} item={item} headCells={headCells} listItemMenu={[{title:"Khám bệnh"},{title:"Chuyển xuống dưới"}]}/>;
          })}
        </TableBody>
      </TblContainer>
      <TblPagination />
    </>
  );
}

export default MedicalExaminationSide;
