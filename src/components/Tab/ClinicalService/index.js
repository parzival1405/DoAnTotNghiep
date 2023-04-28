import { Search } from "@mui/icons-material";
import {
  Autocomplete,
  InputAdornment,
  TableBody,
  TextField,
  Toolbar,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import useDebounce from "../../../hooks/useDebounce";
import useTable from "../../../hooks/useTable";
import Controls from "../../Form/controls/Controls";
import TableRow from "../../TableRow/TableContextMenu";
import { resolve, TotalPrice } from "../../../utils/Calc";
import SelectedLabel from "../../Form/ControlsLabel/SelectLabel";
import { useDispatch, useSelector } from "react-redux";
import { headCellsClinicalServiceCurrentPatient } from "../../../utils/HeadCells";
import { addClinicalService, removeClinicalService } from "../../../redux/actions/currentPatient";

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
  const { clinicalService,addOrDelete } = useSelector((state) => state.currentPatient);

  console.log(addOrDelete);
  const { services } = useSelector((state) => state.service);
  
  const dispatch = useDispatch();
  const [value,setValue] = useState("");

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  
  const onChangeSelected = (e) => {
    setFiler(e.target.value);
  };

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(clinicalService, headCellsClinicalServiceCurrentPatient, filterFn);
  const handleAddClinicalService = (event, service) => {
    setValue(null)
    if(service){
      service["quantity"] = 1
      dispatch(addClinicalService(service))
    }
  };


  const handleRemoveClinicalService = (service) => {
    dispatch(removeClinicalService(service))
  }
  return (
    <>
      <Toolbar className={classes.toolBar} sx={{ pt: 2 }}>
        <Autocomplete
          
          id="combo-box-demo"
          size="small"
          className={classes.searchInput}
          name="name"
          options={services}
          onChange={(event, newValue) =>
            handleAddClinicalService(event, newValue)
          }
          getOptionLabel={(option) => resolve(option, "name")}
          renderInput={(params) => (
            <TextField value={value} {...params} label="Tìm kiếm dịch vụ" />
          )}
        />
        <Controls.Select
          label="Nhóm dịch vụ"
          variant="outlined"
          onChange={onChangeSelected}
          value={filter}
          className={classes.selected}
          options={options}
          onClick={() => {}}
        />
      </Toolbar>
      <TblContainer>
        <TblHead />
        <TableBody
          style={{ overflowY: "scroll", height: "340px", display: "block" }}
        >
          {recordsAfterPagingAndSorting().map((item) => {
            return (
              <TableRow
                handleDoubleClick={() => {
                  console.log("click");
                }}
                key={item.id}
                item={item}
                headCells={headCellsClinicalServiceCurrentPatient}
                listItemMenu={[{ title: "Xóa" , onClick: () => handleRemoveClinicalService(item)}]}
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
