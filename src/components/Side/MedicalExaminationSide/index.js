import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useTable from "../../../hooks/useTable";
import Controls from "../../Form/controls/Controls";
import { InputAdornment, TableBody, Toolbar } from "@mui/material";
import { Search, Add } from "@mui/icons-material";
import useDebounce from "../../../hooks/useDebounce";
import TableRow from "../../TableRow/TableContextMenu";
import { ShowExaminationInformation } from "../../../redux/actions/tab";
import { setCurrentPatient } from "../../../redux/actions/currentPatient";
import { useNavigate } from "react-router-dom";
import useStyles from "../styles";
import { headCellsMedicalExaminationSide } from "../../../utils/HeadCells";
import { optionsMedicalExaminationSide } from "../../../utils/OptionSearch";
import { searchByDoctorRoom, searchMedicalExamination } from "../../../redux/actions/medicalExamination";
import { getCurrentDateString } from "../../../utils/Calc";

function MedicalExaminationSide() {
  const classes = useStyles();
  const [filter, setFiler] = useState("");
  const { user } = useSelector(
    (state) => state.auth
  );
  const { medicalExaminationsDoctorData } = useSelector(
    (state) => state.medicalExamination
  );
  const [optionSelectedId, setOptionSelectedId] = useState(null);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(
      medicalExaminationsDoctorData,
      headCellsMedicalExaminationSide,
      filterFn
    );
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue, 500);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    if (searchValue.startsWith(" ")) {
      return;
    }
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    if (searchValue.trim() && filter) {
      const formData = new FormData();
      formData.append("type", filter);
      formData.append("keyword", debouncedValue);

      dispatch(searchMedicalExamination(filter, debouncedValue));
    } else {
      var date = getCurrentDateString();
      var formData = new FormData();
      var currentDay = getCurrentDateString();
      formData.append("date", currentDay);
      formData.append("roomId", user.room.id);
      formData.append("doctorId", user.id);
      dispatch(searchByDoctorRoom(formData));
    }
    return;
  }, [debouncedValue]);

  const onChangeSelected = (e) => {
    setFiler(e.target.value);
  };

  const handleDoubleClick = (item) => {
    try {
      dispatch(setCurrentPatient(item, navigate));
    } catch (error) {
      alert("Sai mật khẩu");
    }
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
          className={classes.selected20}
          options={optionsMedicalExaminationSide}
        />
      </Toolbar>

      <TblContainer>
        <TblHead />
        <TableBody
          style={{ overflowY: "scroll", height: "420px", display: "block" }}
        >
          {recordsAfterPagingAndSorting().map((item) => {
            item.category = item.medicalExaminationDetailsResponses[0];
            return (
              <TableRow
                handleDoubleClick={() => handleDoubleClick(item)}
                key={item.id}
                item={item}
                headCells={headCellsMedicalExaminationSide}
                listItemMenu={[
                  {
                    title: "Khám bệnh",
                    onClick: () => handleDoubleClick(item),
                  },
                  { title: "Chuyển xuống dưới", onclick: null },
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

export default MedicalExaminationSide;
