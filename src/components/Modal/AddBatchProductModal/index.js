import { Add, Close, Delete, Edit, Save } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Fade,
  Grid,
  IconButton,
  Paper,
} from "@mui/material";
import { DataGrid as MUIDataGrid } from "@mui/x-data-grid";
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
import useDatagrid from "../../../hooks/useDatagrid";
import {
  addNewProductToBatch,
  removeNewProductInBatch,
  saveArrayDrug,
  saveBatchProduct,
  updateNewProductInBatch,
} from "../../../redux/actions/batchProduct";
import { getCurrentDateString } from "../../../utils/Calc";
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

const initialValues = {};

function AddBatchProductModal() {
  const [hoveredRow, setHoveredRow] = useState(null);

  const isShowAddBatchProductModal = useSelector(
    (state) => state.modal.isShowAddBatchProductModal
  );
  const { products, category } = useSelector((state) => state.product);
  const { suppliers } = useSelector((state) => state.supplier);
  const { user } = useSelector((state) => state.auth);
  const newAddProducts = useSelector(
    (state) => state.batchProduct.newAddProducts
  );
  const { open, typeOpenModal, data } = isShowAddBatchProductModal;
  const classes = useStyle();
  const dispatch = useDispatch();

  let newHeaderFunction = headCellsProductAddBatchProduct;
  if (!newHeaderFunction.filter((e) => e.field === "actions").length > 0) {
    console.log("here");
    newHeaderFunction.push({
      field: "actions",
      headerName: "",
      width: 50,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        if (hoveredRow === params.id) {
          return (
            <Box
              sx={{
                backgroundColor: "whitesmoke",
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconButton onClick={() => handleRemoveProduct(params)}>
                <Delete />
              </IconButton>
            </Box>
          );
        } else return null;
      },
    });
  }

  const onMouseEnterRow = (event) => {
    const id = Number(event.currentTarget.getAttribute("data-id"));
    setHoveredRow(id);
  };

  const onMouseLeaveRow = (event) => {
    setHoveredRow(null);
  };

  const onSelectedDrug = (e, item) => {
    if (newAddProducts.filter((itemmap) => itemmap.id == item.id).length == 0) {
      dispatch(addNewProductToBatch(item));
    }
  };

  const handleRemoveProduct = (item) => {
    if (item) {
      dispatch(removeNewProductInBatch(item));
    }
  };

  const handleHideModal = () => {
    dispatch(hideModal("isShowAddBatchProductModal"));
  };

  const handleClickShowModalAddSupplier = () => {
    dispatch(ShowAddSupplierModal(GLOBALTYPES.ADD_BY_ANOTHER_MODAL));
  };

  const handleClickShowModalAddDrug = () => {
    dispatch(ShowAddDrugModal(GLOBALTYPES.ADD_BY_ANOTHER_MODAL));
  };

  const { DataGrid } = useDatagrid(
    newHeaderFunction,
    onMouseEnterRow,
    onMouseLeaveRow
  );

  const handleSubmitForm = async (values) => {
    const newProductArray = newAddProducts.filter((item) => item.type == "NEW");

    dispatch(saveArrayDrug(newProductArray));

    if (newAddProducts.length > 0) {
      const currentDate = getCurrentDateString();
      const data = {
        name: values.name,
        description: values.description,
        totalPrice: values.totalPrice,
        receiptDate: currentDate,
        userId: user.id,
        supplierId: values.departmentServices.id,
        totalPrice: values.totalPrice,
        settlement: 0,
        paidPrice: values.paid,
        debt: values.debt,
        detailBatchDrug: newAddProducts.map((item) => ({
          drugId: item.id,
          quality: item.quantity,
          unit: item.unit,
          price: parseInt(item.price),
          manufactureDate: currentDate,
          expiredDate: "01/01/2030",
        })),
      };

      dispatch(saveBatchProduct(data));
      handleHideModal();
    } else {
      alert("Không có sản phẩm");
    }
  };

  const calcTotalPrice = (products) => {
    return products.reduce(
      (accumulator, item) => accumulator + item.quantity * item.price,
      0
    );
  };

  const handleChangeCells = (params, setFieldValue) => {
    const updatedRow = { ...params, isNew: false };
    const oldDevices = newAddProducts.map((dev) =>
      dev.id === params.id ? params : { ...dev, ...params }
    );

    setFieldValue("totalPrice", calcTotalPrice(oldDevices));
    dispatch(updateNewProductInBatch(updatedRow));
    return updatedRow;
  };
  
  const body = (
    <Fade in={open}>
      <Paper className={classes.paper} id="modal-patient-reception">
        <ModalHeader
          title={titleModal(typeOpenModal, "phiếu nhập")}
          onClose={handleHideModal}
        />
        <Formik
          initialValues={
            typeOpenModal == GLOBALTYPES.ADD ? initialValues : data
          }
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
                <InputLabel
                  disable={type(typeOpenModal)}
                  label="Tên lô thuốc"
                  name="name"
                  value={data ? data.name : values?.name}
                  onChange={handleChange}
                  size={[2, 10]}
                />
                <SelectedLabel
                  disable={type(typeOpenModal)}
                  label="Nhà CC"
                  options={suppliers}
                  require={true}
                  size={data ? [2, 6] : [2, 5]}
                  accessField={"name"}
                  setFieldValue={setFieldValue}
                  name="departmentServices"
                  value={data ? data.supplier : values?.departmentServices}
                />
                {typeOpenModal == GLOBALTYPES.ADD && (
                  <Grid item xs={1} className={classes.button}>
                    <Controls.Button
                      variant="contained"
                      text="Thêm"
                      color="primary"
                      startIcon={<Add />}
                      onClick={handleClickShowModalAddSupplier}
                    />
                  </Grid>
                )}
                <InputLabel
                  label="Tổng cộng"
                  name="totalPrice"
                  value={data ? data.totalPrice : values?.totalPrice}
                  disable={true}
                  size={[2, 2]}
                />
                <DateLabel
                  disable={type(typeOpenModal)}
                  label="Ngày nhập"
                  require={true}
                  currentDate={data ? false : true}
                  value={data ? data.receiptDate : null}
                  size={[2, 2]}
                />
                <InputLabel
                  label="Người nhập"
                  value={data ? data.user.fullName : user.fullName}
                  disable={true}
                  require={true}
                  size={[2, 2]}
                />
                <InputLabel
                  label="Quyết toán"
                  name="settlement"
                  values={data ? data.settlement : values.settlement}
                  onChange={handleChange}
                  disable={true}
                  size={[2, 2]}
                />
                <SelectedLabel
                  disable={type(typeOpenModal)}
                  label="Hình thức"
                  options={optionsPay}
                  name="type"
                  require={true}
                  accessField={"title"}
                  setFieldValue={setFieldValue}
                  size={[2, 6]}
                />
                <InputLabel
                  disable={type(typeOpenModal)}
                  type="number"
                  label="Đã trả"
                  name="paid"
                  onChange={handleChange}
                  size={[2, 2]}
                />
                <InputLabel
                  disable={type(typeOpenModal)}
                  label="Ghi chú"
                  size={[2, 6]}
                  name="description"
                  onChange={handleChange}
                />
                <InputLabel
                  label="Công nợ"
                  name="debt"
                  value={
                    parseFloat(values.paid) - parseFloat(values.totalPrice) || 0
                  }
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
                  disable={type(typeOpenModal)}
                  label="Tên thuốc"
                  options={products}
                  require={true}
                  size={data ? [2, 6] : [2, 5]}
                  accessField={"name"}
                  setFieldValue={setFieldValue}
                  name="products"
                  onChange={(event, newValue) =>
                    onSelectedDrug(event, newValue)
                  }
                />
                {typeOpenModal == GLOBALTYPES.ADD && (
                  <Grid item xs={1} className={classes.button}>
                    <Controls.Button
                      variant="contained"
                      text="Thêm"
                      color="primary"
                      startIcon={<Add />}
                      onClick={handleClickShowModalAddDrug}
                    />
                  </Grid>
                )}
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
              <Box style={{ height: "300px" }}>
                <DataGrid
                  disable={data ? true : false}
                  records={
                    data
                      ? data.detailBatchDrugResponses.map((item, index) => ({
                          stt: index + 1,
                          name: item.drug.name,
                          quantity: item.quality,
                          ...item,
                        }))
                      : newAddProducts.map((item, index) => ({
                          stt: index + 1,
                          ...item,
                        }))
                  }
                  saveDeviceCell={(params) => {
                    handleChangeCells(params, setFieldValue);
                  }}
                />
              </Box>

              {/* button -------------------- */}
              <div className={classes.action}>
                <Controls.Button
                  color="primary"
                  variant="contained"
                  // type="submit"
                  disable={isSubmitting}
                  onKeyPress={(e) => {
                    console.log("here");
                    e.which === 13 && e.preventDefault();
                  }}
                  onClick={() => handleSubmitForm(values)}
                  text="Thanh toán"
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
  return <BaseModal body={body} isShow={open} />;
}

export default React.memo(AddBatchProductModal);
