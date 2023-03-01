import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useTable from "../../../hooks/useTable";
import Layout from "../Layout";
import Controls from "../../Form/controls/Controls";
import {
  Button,
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
import TableRow from "../../TableRow/TableContextMenu";
import { ShowAddScheduleModal } from "../../../redux/actions/modal";

const headCells = [
  { id: "id", numeric: false,sizeCellWidth: 100, label: "Mã phiếu" },
  { id: "fullName", numeric: false, label: "Tên bệnh nhân" },
  { id: "female", numeric: false,sizeCellWidth: 100, label: "Giới tính" },
  { id: "date", numeric: false, label: "Ngày hẹn khám" },
  { id: "category", numeric: false,sizeCellWidth: 140, label: "Kiểu khám" },
  // { id: "cause", numeric: false, label: "Lý do" },
  // { id: "note", numeric: false, label: "Ghi chú" },
  { id: "state", numeric: false,sizeCellWidth: 140, label: "Trạng thái" },
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

const optionsDepartment = [
  { id: "", title: "Tất cả" },
  {
    id: "dp1",
    title: "Răng hàm mặt",
  },
  {
    id: "dp2",
    title: "Khám Mắt",
  },
  {
    id: "dp3",
    title: "Khám Nhi",
  },
];

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
  selectedD: {
    width: "15%",
  },
  selectedR: {
    width: "10%",
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

function ScheduleSide({ item }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [filter, setFiler] = useState({
    category: "",
    department: "",
  });
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
    setFiler((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = (item) => {
    try {
      // dispatch(setCurrentPatient(item));
      // dispatch(ShowExaminationInformation());
      // navigate("/Checkup");
    } catch (error) {
      alert("Sai mật khẩu");
    }
  };

  const handleClickShowModal = () => {
    dispatch(ShowAddScheduleModal())
    console.log("sasdfd")
  }
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
          name="category"
          onChange={onChangeSelected}
          value={filter.category}
          className={classes.selected}
          options={options}
        />
        <Controls.Select
          label="Khoa"
          variant="outlined"
          name="department"
          onChange={onChangeSelected}
          value={filter.department}
          className={classes.selectedD}
          options={optionsDepartment}
        />
        <div style={{flex:"1"}}></div>
        <Button variant="contained" onClick={handleClickShowModal} color="healing" disableElevation startIcon={<Add />}>
          Thêm
        </Button>
      </Toolbar>

      <TblContainer>
        <TblHead />
        <TableBody
          style={{ overflowY: "scroll", height: "420px", display: "block" }}
        >
          {recordsAfterPagingAndSorting().map((item) => {
            return (
              <TableRow
                handleClick={handleClick}
                key={item.id}
                item={item}
                headCells={headCells}
                listItemMenu={[
                  { title: "Sửa" },
                  { title: "Thanh toán" },
                  { title: "Xem" },
                ]}
              />
            );
          })}
        </TableBody>
      </TblContainer>
      <TblPagination />
    </>
  );
}

export default ScheduleSide;
