import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useTable from "../../../hooks/useTable";

import Controls from "../../Form/controls/Controls";
import { Button, InputAdornment, TableBody, Toolbar } from "@mui/material";
import { Search, Add, QrCodeScanner } from "@mui/icons-material";
import useDebounce from "../../../hooks/useDebounce";
import TableRow from "../../TableRow/TableContextMenu";
import { ShowAddScheduleModal, ShowReadQRCodeModal } from "../../../redux/actions/modal";
import useStyles from "../styles";
import { GLOBALTYPES } from "../../../redux/actionType";
import { headCellsScheduleSide } from "../../../utils/HeadCells";
import { getAllDoctor } from "../../../redux/actions/staff";
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

function ScheduleSide({ item }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [filter, setFiler] = useState({
    category: "",
    department: "",
  });

  const { medicalLetters } = useSelector((state) => state.medicalLetter);

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const [openPopup, setOpenPopup] = useState(false);
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(medicalLetters, headCellsScheduleSide, filterFn);
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

  const handleClickShowAddModal = () => {
    dispatch(ShowAddScheduleModal(GLOBALTYPES.ADD));
  };

  const handleClickShowEditModal = (item) => {
    dispatch(ShowAddScheduleModal(GLOBALTYPES.EDIT, item));
  };

  const handleClickShowReceiveModal = (item) => {
    dispatch(ShowAddScheduleModal(GLOBALTYPES.RECEIVE, item));
  };

  const handleClickShowViewModal = (item) => {
    dispatch(ShowAddScheduleModal(GLOBALTYPES.VIEW, item));
  };

  const handleClickShowReadQRCode = () => {
    dispatch(ShowReadQRCodeModal(GLOBALTYPES.ADD));
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
        <Button
          variant="contained"
          style={{marginLeft:"10px"}}
          onClick={handleClickShowReadQRCode}
          color="healing"
          disableElevation
          startIcon={<QrCodeScanner />}
        >
          QR code
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
                headCells={headCellsScheduleSide}
                listItemMenu={item.status == "DONE" ? [
                  {
                    title: "Xem",
                    onClick: () => handleClickShowViewModal(item),
                  },
                ] : [
                  {
                    title: "Tiếp nhận",
                    onClick: () => handleClickShowReceiveModal(item),
                  },
                  {
                    title: "Sửa",
                    onClick: () => handleClickShowEditModal(item),
                  }, {
                    title: "Xem",
                    onClick: () => handleClickShowViewModal(item),
                  }
                ]
              
              }
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
