import { Add, Close, LabelOutlined, Save } from "@mui/icons-material";
import {
  Button,
  Divider,
  Fade,
  Grid,
  InputAdornment,
  Paper,
  RadioGroup,
  TableBody,
  TextField,
} from "@mui/material";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideModal, ShowAddDrugModal, ShowAddSupplierModal } from "../../../redux/actions/modal";
import InputLabel from "../../Form/ControlsLabel/InputLabel";
import BaseModal from "../BaseModal";

import { makeStyles } from "@mui/styles";
import ModalHeader from "../ModalHeader";
import Controls from "../../Form/controls/Controls";
import SelectedLabel from "../../Form/ControlsLabel/SelectLabel";
import DateLabel from "../../Form/ControlsLabel/DateLabel";
import useTable from "../../../hooks/useTable";
import TableRow from "../../TableRow/TableContextMenu";
import { GLOBALTYPES } from "../../../redux/actionType";

const useStyle = makeStyles((theme) => ({
  paper: {
    width: "70%",
    padding: "20px",
  },
  action: {
    display: "flex",
    width: "100%",
    paddingTop: "10px",
    justifyContent: "flex-end",
  },
  table: {
    margin:"0" ,
    "& th,& td": {
      padding: "10px",
    },
    "& .MuiRadio-root": {
      padding: "2px",
    },
    "& .MuiFormControlLabel-root": {
      margin: "0",
    },
  },
  gridCustomInput: {
    paddingBottom:"16px",
    "& .MuiInputBase-input": {
      padding: "6px",
    },
  },

  button:{
    "& .MuiButtonBase-root":{
      width:"calc(100% - 10px)",
      height:"100%",
      marginLeft:"10px"
    }
  }
}));

const headCells = [
  { id: "stt", sizeCellWidth: 60, label: "STT" },
  { id: "name", numeric: false, label: "Tên sản phẩm" },
  { id: "unit", numeric: false, label: "Đơn vị" },
  { id:"quantity",editable:true,label: "Số lượng" },
  { id:"price",editable:true,sizeCellWidth: 150,label: "Đơn giá" },
  { id: "total", numeric: true, label: "Thành tiền" },
];

const optionsNCC = [
  { id: "1", title: "NCC1" },
  { id: "2", title: "NCC2" },
];

const optionsDrug = [
  { id: "0", title: "" },
  { id: "1", title: "NCC1" },
  { id: "2", title: "NCC2" },
];

const optionsPay = [
  { id: "1", title: "Tiền mặt" },
  { id: "2", title: "Chuyển khoản" },
];

const optionsSP = [
  { id: "1", title: "aaaaaaaaaaaaaaaaaaaaa" },
  { id: "2", title: "Chuyển" },
];

function AddProductModal() {
  const { isShowAddProductModal } = useSelector((state) => state.modal);
  const classes = useStyle();
  const dispatch = useDispatch();
  const [records,setRecords] = useState([{
    id:1,
    stt: 3,
    name: "bui quang huu",
    unit: "Vien",
    quantity: 1,
    price: 100000,
    total: 100000,
  },]);

  const handleHideModal = () => {
    dispatch(hideModal("isShowAddProductModal"));
  };

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const handleClickShowModalAddSupplier = () => {
    dispatch(ShowAddSupplierModal(GLOBALTYPES.ADD))
  }

  const handleClickShowModalAddDrug = () => {
    dispatch(ShowAddDrugModal(GLOBALTYPES.ADD))
  }

  
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, headCells, filterFn);

  const onSelectedDrug = () => {
    setRecords((prev) => [...prev,{
      id:2,
      stt: 4,
      name: "bui quang huu",
      unit: "Vien",
      quantity: 1,
      price: 100000,
      total: 100000,
    }])
  }

  const handleRemoveDrug = (item) => {
    setRecords((prev) => prev.filter(drug => item.id != drug.id))
  }

  const handleSubmitForm = (values) => {};


  const body = (
    <Fade in={isShowAddProductModal.open}>
      <Paper className={classes.paper} id="modal-patient-reception">
        <ModalHeader title="Phiếu nhập" onClose={handleHideModal} />
        <Formik
          initialValues={{}}
          //   validationSchema={validateionChangeGroupName}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            handleSubmitForm(values);
            setSubmitting(true);
            resetForm();
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            resetForm,
            handleChange,
            handleSubmit,
            isSubmitting,
          }) => (
            <Form
              action=""
              //   className={classes.form}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <Grid
                container
                rowSpacing={1}
                className={classes.gridCustomInput}
              >
                <SelectedLabel
                  label="Nhà CC"
                  options={optionsNCC}
                  require={true}
                  size={[2, 5]}
                />
                <Grid item xs={1} className={classes.button}>
                  <Controls.Button
                    variant="contained"
                    text="Thêm"
                    color="primary"
                    startIcon={<Add />}
                    onClick={handleClickShowModalAddSupplier}
                  />
                </Grid>
                <InputLabel label="Tổng cộng" disable={true} size={[2, 2]} />
                <DateLabel
                  label="Ngày nhập"
                  require={true}
                  currentDate={true}
                  size={[2, 2]}
                />
                <SelectedLabel
                  label="Người nhập"
                  options={optionsNCC}
                  require={true}
                  size={[2, 2]}
                />
                <InputLabel label="Quyết toán" disable={true} size={[2, 2]} />
                <SelectedLabel
                  label="Hình thức"
                  options={optionsPay}
                  require={true}
                  size={[2, 6]}
                />
                <InputLabel label="Đã trả" size={[2, 2]} />
                <InputLabel label="Ghi chú" disable={true} size={[2, 6]} />
                <InputLabel label="Công nợ" disable={true} size={[2, 2]} />
              </Grid>
              <Divider/>
              <Grid
                container
                rowSpacing={1}
                className={classes.gridCustomInput}
                sx={{mt:1}}
              >
                <SelectedLabel
                  label="Tên thuốc"
                  options={optionsDrug}
                  require={true}
                  size={[2, 5]}
                  accessField="title"
                  onChange={onSelectedDrug}
                />
                <Grid item xs={1} className={classes.button}>
                  <Controls.Button
                    variant="contained"
                    text="Thêm"
                    color="primary"
                    startIcon={<Add />}
                    onClick={handleClickShowModalAddDrug}
                  />
                </Grid>
                <SelectedLabel
                  // label="Nhóm SP"
                  options={optionsSP}
                  size={[1, 3]}
                />
              </Grid>
              <>
                <TblContainer className={classes.table}>
                  <TblHead />
                  <TableBody
                    style={{
                      overflowY: "scroll",
                      height: "150px",
                      display: "block",
                    }}
                  >
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="female"
                      name="radio-buttons-group"
                    >
                      {recordsAfterPagingAndSorting().map((item) => {
                        return (
                          <TableRow
                            handleClick={handleRemoveDrug}
                            key={item.id}
                            item={item}
                            headCells={headCells}
                            listItemMenu={[
                              { title: "Xóa" },
                            ]}
                          />
                        );
                      })}
                    </RadioGroup>
                  </TableBody>
                </TblContainer>
                <TblPagination />
              </>

              {/* button -------------------- */}
              <div className={classes.action}>
                <Controls.Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  isSubmitting={isSubmitting}
                  text="Lưu"
                  startIcon={<Save />}
                  sx={{ mr: 1 }}
                />

                <Controls.Button
                  variant="contained"
                  text="Hủy"
                  color="error"
                  startIcon={<Close />}
                  onClick={handleHideModal}
                />
              </div>
            </Form>
          )}
        </Formik>
      </Paper>
    </Fade>
  );
  return <BaseModal body={body} isShow={isShowAddProductModal.open} />;
}

export default AddProductModal;
