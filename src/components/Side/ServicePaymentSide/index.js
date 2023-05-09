import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useTable from "../../../hooks/useTable";
import Controls from "../../Form/controls/Controls";
import { InputAdornment, TableBody, Toolbar } from "@mui/material";
import { Search } from "@mui/icons-material";
import useDebounce from "../../../hooks/useDebounce";
import TableRow from "../../TableRow/TableContextMenu";
import useStyles from "../styles";
import { HeadCellsServiceAvailableUnPaid } from "../../../utils/HeadCells";
import { GLOBALTYPES } from "../../../redux/actionType";
import { ShowServicePaymentModal } from "../../../redux/actions/modal";
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

const record = []

function ServicePaymentSide({ item }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [filter, setFiler] = useState({
    category: "",
    department: "",
  });
  const servicesAvailableUnpaid = useSelector((state) => state.serviceAvailable.servicesAvailableUnpaid);

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(servicesAvailableUnpaid, HeadCellsServiceAvailableUnPaid, filterFn);
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

  const handleClick = (item) => {};

  const handleShowModalPayment = (item) =>{
    dispatch(ShowServicePaymentModal(GLOBALTYPES.EDIT,item))
  }
  const handleViewResult = (item) =>{
    // dispatch(ShowUpdateServiceCLSModal(GLOBALTYPES.VIEW,item))
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
      </Toolbar>

      <TblContainer>
        <TblHead />
        <TableBody
          style={{ overflowY: "scroll", height: "420px", display: "block" }}
        >
          {recordsAfterPagingAndSorting().map((item) => {
            item.category = item.serviceAvailable[0]
            return (
              <TableRow
                handleDoubleClick={handleClick}
                key={item.id}
                item={item}
                headCells={HeadCellsServiceAvailableUnPaid}
                listItemMenu={[
                  {
                    title: "Thanh toán dịch vụ",
                    onClick: () => handleShowModalPayment(item),
                  },
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

export default ServicePaymentSide