import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useTable from "../../../hooks/useTable";
import Controls from "../../Form/controls/Controls";
import { Button, InputAdornment, TableBody, Toolbar } from "@mui/material";
import { Search, Add } from "@mui/icons-material";
import useDebounce from "../../../hooks/useDebounce";
import TableRow from "../../TableRow/TableContextMenu";
import { ShowAddServiceModal } from "../../../redux/actions/modal";
import useStyles from "../styles";
import { GLOBALTYPES } from "../../../redux/actionType";
import {headCellsListServiceSide} from "../../../utils/HeadCells"


function AddServiceGroupsSide({ item }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {services} = useSelector((state) => state.service)
  const [filter, setFiler] = useState({
    category: "",
    department: "",
    room: "",
  });
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const [openPopup, setOpenPopup] = useState(false);
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(services, headCellsListServiceSide, filterFn);

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

  const handleDoubleClick = (item) => {
    handleClickShowViewModal();
  };

  const handleClickShowEditModal = () => {
    dispatch(ShowAddServiceModal(GLOBALTYPES.EDIT));
  };
  const handleClickShowViewModal = () => {
    dispatch(ShowAddServiceModal(GLOBALTYPES.VIEW));
  };
  const handleClickShowAddModal = () => {
    dispatch(ShowAddServiceModal(GLOBALTYPES.ADD));
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
                handleDoubleClick={handleDoubleClick}
                key={item.id}
                item={item}
                headCells={headCellsListServiceSide}
                listItemMenu={[
                  { title: "Chỉnh sửa", onClick: handleClickShowEditModal },
                  { title: "Xem", onClick: handleClickShowViewModal },
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

export default AddServiceGroupsSide;
