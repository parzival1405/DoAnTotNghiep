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
import {
  hideModal,
  ShowAddDrugModal,
  ShowAddSupplierModal,
} from "../../../redux/actions/modal";
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
import { titleModal, type } from "../../../utils/TypeOpen";
import { headCellsProductAddBatchProduct } from "../../../utils/HeadCells";

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
    margin: "0",
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
    paddingBottom: "16px",
    "& .MuiInputBase-input": {
      padding: "6px",
    },
  },

  button: {
    "& .MuiButtonBase-root": {
      width: "calc(100% - 10px)",
      height: "100%",
      marginLeft: "10px",
    },
  },
}));

const optionsPay = [
  { id: "1", title: "Tiền mặt" },
  { id: "2", title: "Chuyển khoản" },
];

function AddBatchProductModal() {
  const { isShowAddBatchProductModal } = useSelector((state) => state.modal);
  const { products, category } = useSelector((state) => state.product);
  const { suppliers } = useSelector((state) => state.supplier);
  const [valueProduct, setValueProduct] = useState("");
  const [newProducts, setNewProducts] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const { open, typeOpenModal } = isShowAddBatchProductModal;
  const classes = useStyle();
  const dispatch = useDispatch();

  const handleHideModal = () => {
    dispatch(hideModal("isShowAddBatchProductModal"));
  };

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const handleClickShowModalAddSupplier = () => {
    dispatch(ShowAddSupplierModal(GLOBALTYPES.ADD));
  };

  const handleClickShowModalAddDrug = () => {
    dispatch(ShowAddDrugModal(GLOBALTYPES.ADD));
  };

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(newProducts, headCellsProductAddBatchProduct, filterFn);

  const onSelectedDrug = (e, item) => {
    setValueProduct("");
    if (item) {
      setNewProducts((prev) => [...prev, item]);
    }
  };

  const handleRemoveDrug = (item) => {
    // setRecords((prev) => prev.filter(drug => item.id != drug.id))
  };

  const handleSubmitForm = (values) => {};

  const handleRemoveProduct = (item) =>{
    setNewProducts((prev) => prev.filter((i) => i.id != item.id ));
  }

  const body = (
    <Fade in={isShowAddBatchProductModal.open}>
      <Paper className={classes.paper} id="modal-patient-reception">
        <ModalHeader
          title={titleModal(typeOpenModal, "phiếu nhập")}
          onClose={handleHideModal}
        />
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
            setFieldValue,
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
                  options={suppliers}
                  require={true}
                  size={[2, 5]}
                  accessField={"name"}
                  setFieldValue={setFieldValue}
                  name="departmentServices"
                  value={values?.departmentServices}
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
                <InputLabel
                  label="Người nhập"
                  value={user.fullName}
                  disable={true}
                  require={true}
                  size={[2, 2]}
                />
                <InputLabel label="Quyết toán" disable={true} size={[2, 2]} />
                <SelectedLabel
                  label="Hình thức"
                  options={optionsPay}
                  name="type"
                  require={true}
                  accessField={"title"}
                  setFieldValue={setFieldValue}
                  size={[2, 6]}
                />
                <InputLabel
                  label="Đã trả"
                  name="paid"
                  onChange={handleChange}
                  size={[2, 2]}
                />
                <InputLabel label="Ghi chú" size={[2, 6]} />
                <InputLabel
                  label="Công nợ"
                  name="paid"
                  value={parseFloat(values.paid) - 1000 || 0}
                  disable={true}
                  size={[2, 2]}
                />
              </Grid>
              <Divider />
              <Grid
                container
                rowSpacing={1}
                className={classes.gridCustomInput}
                sx={{ mt: 1 }}
              >
                <SelectedLabel
                  label="Tên thuốc"
                  options={products}
                  require={true}
                  size={[2, 5]}
                  accessField={"name"}
                  setFieldValue={setFieldValue}
                  name="products"
                  onChange={(event, newValue) =>
                    onSelectedDrug(event, newValue)
                  }
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
                  options={category}
                  size={[1, 3]}
                  accessField={"name"}
                  setFieldValue={setFieldValue}
                  name="category"
                  value={values?.category}
                  // onChange={(event, newValue) =>
                  //   onChangeCategory(event, newValue)
                  // }
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
                            handleDoubleClick={handleRemoveDrug}
                            key={item.id}
                            item={item}
                            headCells={headCellsProductAddBatchProduct}
                            listItemMenu={[
                              {
                                title: "Xóa",
                                onClick: () =>
                                  handleRemoveProduct(item),
                              },
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
  return <BaseModal body={body} isShow={isShowAddBatchProductModal.open} />;
}

export default AddBatchProductModal;
