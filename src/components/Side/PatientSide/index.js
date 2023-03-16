
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useTable from "../../../hooks/useTable";
import Controls from "../../Form/controls/Controls";
import {
  InputAdornment,
  TableBody,
  Toolbar,
} from "@mui/material";
import { Search, Add } from "@mui/icons-material";
import useDebounce from "../../../hooks/useDebounce";
import TableRow from "../../TableRow/TableContextMenu";
import {
  ShowPatientModal,
  ShowPatientReception,
} from "../../../redux/actions/modal";
import useStyles from "../styles";
import { GLOBALTYPES } from "../../../redux/actionType";
import { headCellsPatientSide } from "../../../utils/HeadCells";
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

const optionsRoom = [
  { id: "", title: "Tất cả" },
  {
    id: "1",
    title: "Phòng 1",
  },
  {
    id: "2",
    title: "Phòng 2",
  },
  {
    id: "3",
    title: "Phòng 3",
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

function PatientSide({ item }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { patients } = useSelector((state) => state.patient);
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

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(patients, headCellsPatientSide, filterFn);

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
    dispatch(ShowPatientModal(GLOBALTYPES.EDIT,item));
  };
  const handleClickShowViewModal = (item) => {
    dispatch(ShowPatientModal(GLOBALTYPES.VIEW,item));
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
        <Controls.Select
          label="Phòng"
          name="room"
          size="small"
          variant="outlined"
          onChange={onChangeSelected}
          value={filter.room}
          className={classes.selectedR}
          options={optionsRoom}
        />
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
                headCells={headCellsPatientSide}
                listItemMenu={[
                  { title: "Chỉnh sửa", onClick:() => handleClickShowEditModal(item) },
                  { title: "Xem", onClick:() => handleClickShowViewModal(item) },
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

export default PatientSide;
