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
import { ShowExaminationInformation } from "../../../redux/actions/tab";
import { setCurrentPatient } from "../../../redux/actions/patient";
import { useNavigate } from "react-router-dom";
import { ShowAddProductModal } from "../../../redux/actions/modal";
import useStyles from "../styles"
import { GLOBALTYPES } from "../../../redux/actionType";
const headCells = [
  { id: "id", numeric: false, label: "Số phiếu" },
  { id: "date", numeric: false, label: "Ngày nhập" },
  { id: "NCC", numeric: false, sizeCellWidth: 140, label: "Nhà cung cấp" },
  { id: "total", numeric: true, label: "Tổng tiền" },
  { id: "real", numeric: true, label: "Thực trả" },
  { id: "datra", numeric: true, label: "Đã trả" },
  { id: "result", numeric: false, label: "Ghi chú" },
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

function AddProductSide({ item }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [filter, setFiler] = useState("");
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const handleClickShowAddModal = () => {
    dispatch(ShowAddProductModal(GLOBALTYPES.ADD))
  }

  const [openPopup, setOpenPopup] = useState(false);
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, headCells, filterFn);
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue, 500);
  const navigate = useNavigate();
  const handleSearch = (e) => {
    if (searchValue.startsWith(" ")) {
      return;
    }

    setSearchValue(e.target.value);
  };

  const onChangeSelected = (e) => {
    setFiler(e.target.value);
  };

  const handleClick = (item, setContextMenu) => {
    try {

    } catch (error) {
      alert("Sai mật khẩu");
    }
  };
  return (
    <>
      <Toolbar className={classes.toolBar} sx={{ pt: 2 }}>
        <Controls.DatePicker
          currentDate={true}
          label="Từ ngày"
          require={true}
        />
        <Controls.DatePicker label="Đến ngày" />
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
          className={classes.selected20}
          options={options}
          // className={classes.newButton}
          onClick={() => {}}
        />
        <div style={{flex:"1"}}></div>
        <Button variant="contained" onClick={handleClickShowAddModal} color="healing" disableElevation startIcon={<Add />}>
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
                listItemMenu={[{ title: "Xem" }]}
              />
            );
          })}
        </TableBody>
      </TblContainer>
      <TblPagination />
    </>
  );
}

export default AddProductSide;
