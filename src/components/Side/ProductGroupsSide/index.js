import { makeStyles } from "@mui/styles";
import React, {useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useTable from "../../../hooks/useTable";
import Controls from "../../Form/controls/Controls";
import {
  Button,
  InputAdornment,
  TableBody,
  Toolbar,
} from "@mui/material";
import { Search, Add } from "@mui/icons-material";
import useDebounce from "../../../hooks/useDebounce";
import TableRow from "../../TableRow/TableContextMenu";
import { ShowAddProductGroupsModal } from "../../../redux/actions/modal";
import useStyles from "../styles";
import { GLOBALTYPES } from "../../../redux/actionType";

const headCells = [
  { id: "id", numeric: false, label: "Mã nhóm" },
  { id: "name", numeric: false, label: "Tên nhóm" },
  { id: "age", numeric: false, label: "Ghi chú" },
  { id: "state", numeric: false, label: "Trạng thái" },
];

function ProductGroupsSide({ item }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [filter, setFiler] = useState({
    category: "",
    department: "",
    room: "",
  });
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const {category} = useSelector((state) => state.product)
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(category, headCells, filterFn);

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
    } catch (error) {
      alert("Sai mật khẩu");
    }
  };

  const handleClickShowEditModal = (item) => {
    dispatch(ShowAddProductGroupsModal(GLOBALTYPES.EDIT,item));
  };
  const handleClickShowViewModal = (item) => {
    dispatch(ShowAddProductGroupsModal(GLOBALTYPES.VIEW,item));
  };
  const handleClickShowAddModal = () => {
    dispatch(ShowAddProductGroupsModal(GLOBALTYPES.ADD));
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
        <div style={{ flex: "1" }}></div>
        <Button
          variant="contained"
          onClick={handleClickShowAddModal}
          color="healing"
          disableElevation
          startIcon={<Add />}
        >
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
                handleDoubleClick={handleClick}
                key={item.id}
                item={item}
                headCells={headCells}
                listItemMenu={[
                  { title: "Chỉnh sửa", onClick: () => handleClickShowEditModal(item) },
                  { title: "Xem thêm thông tin", onClick: () => handleClickShowViewModal(item)  },
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
export default ProductGroupsSide;
