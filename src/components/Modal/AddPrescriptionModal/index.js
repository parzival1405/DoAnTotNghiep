import { Close, Save } from "@mui/icons-material";
import { Box, Button, Fade, Grid, Paper } from "@mui/material";
import { Form, Formik } from "formik";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideModal } from "../../../redux/actions/modal";
import InputLabel from "../../Form/ControlsLabel/InputLabel";
import BaseModal from "../BaseModal";

import { makeStyles } from "@mui/styles";
import ReactToPrint from "react-to-print";
import useDatagrid from "../../../hooks/useDatagrid";
import { GLOBALTYPES } from "../../../redux/actionType";
import {
  addNewProductToBatch,
  updateNewProductInBatch,
} from "../../../redux/actions/batchProduct";
import { buyMedicineMedicalExamination } from "../../../redux/actions/medicalExamination";
import { headCellsPrescriptionPayment } from "../../../utils/HeadCells";
import { titleModal, type } from "../../../utils/TypeOpen";
import DateLabel from "../../Form/ControlsLabel/DateLabel";
import SelectedLabel from "../../Form/ControlsLabel/SelectLabel";
import Controls from "../../Form/controls/Controls";
import { PrescriptionPrint } from "../../PrintComponent/PrescriptionPrint";
import ModalHeader from "../ModalHeader";
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

function AddPrescriptionModal() {
  const [hoveredRow, setHoveredRow] = useState(null);
  const componentRef = useRef();
  const isShowAddPrescriptionModal = useSelector(
    (state) => state.modal.isShowAddPrescriptionModal
  );
  const { products, category } = useSelector((state) => state.product);
  const { open, typeOpenModal, data } = isShowAddPrescriptionModal;
  const { user } = useSelector((state) => state.auth);
  const [newAddProducts, setNewAddProducts] = useState([]);
  const classes = useStyle();
  const dispatch = useDispatch();

  const handleHideModal = () => {
    dispatch(hideModal("isShowAddPrescriptionModal"));
  };

  const { DataGrid } = useDatagrid(headCellsPrescriptionPayment);

  const handleSubmitForm = async (values) => {
    if (data) {
      dispatch(buyMedicineMedicalExamination(data.id));
    } else {
      if (newAddProducts.length > 0) {
        handleHideModal();
      } else {
        alert("Không có sản phẩm");
      }
    }
  };

  const onSelectedDrug = (e, item) => {
    if (newAddProducts.filter((itemmap) => itemmap.id == item.id).length == 0) {
      dispatch(addNewProductToBatch(item));
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
          title={titleModal(typeOpenModal, "đơn thuốc")}
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
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <Grid
                container
                rowSpacing={1}
                className={classes.gridCustomInput}
                sx={{ mt: 1 }}
              >
                <InputLabel
                  disable={type(typeOpenModal)}
                  label="Tên khách hàng"
                  name="name"
                  value={data ? data.patient.fullName : values?.name}
                  onChange={handleChange}
                  size={[2, 10]}
                />
                <InputLabel
                  label="Người nhập"
                  value={data ? data?.user?.fullName : user.fullName}
                  disable={true}
                  require={true}
                  size={[2, 5]}
                />
                <DateLabel
                  disable={type(typeOpenModal)}
                  label="Ngày lập"
                  require={true}
                  currentDate={data ? false : true}
                  value={data ? data.receiptDate : null}
                  size={[2, 3]}
                />
                {!data && (
                  <>
                    <SelectedLabel
                      disable={type(typeOpenModal)}
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
                    <SelectedLabel
                      options={category}
                      size={[2, 3]}
                      accessField={"name"}
                      setFieldValue={setFieldValue}
                      name="category"
                      value={values?.category}
                      // onChange={(event, newValue) =>
                      //   onChangeCategory(event, newValue)
                      // }
                    />
                  </>
                )}
              </Grid>
              <Box style={{ height: "300px" }}>
                <DataGrid
                  disable={data ? true : false}
                  records={
                    data
                      ? data.prescription.map((item, index) => ({
                          stt: index + 1,
                          name: item.drug.name,
                          quantity: item.quality,
                          price: item.drug.price,
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
              <Grid
                container
                rowSpacing={1}
                className={classes.gridCustomInput}
                sx={{ mt: 1 }}
              >
                <Grid item xs={7} />
                <InputLabel
                  label="Tổng cộng"
                  name="totalPrice"
                  value={
                    data
                      ? calcTotalPrice(
                          data.prescription.map((item, index) => ({
                            stt: index + 1,
                            name: item.drug.name,
                            quantity: item.quality,
                            price: item.drug.price,
                            ...item,
                          }))
                        )
                      : values?.totalPrice
                  }
                  disable={true}
                  size={[2, 3]}
                />
              </Grid>

              {/* button -------------------- */}
              <div className={classes.action}>
                {typeOpenModal == GLOBALTYPES.PAYMENT && (
                  <>
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

                    <ReactToPrint
                      trigger={() => {
                        return (
                          <Button
                            variant="contained"
                            disableElevation
                            color="yellow"
                            sx={{ mr: 1 }}
                            startIcon={<Save />}
                          >
                            Thanh toán & in hóa đơn
                          </Button>
                        );
                      }}
                      content={() => componentRef.current}
                    />
                  </>
                )}

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
        <div style={{ display: "none" }}>
          <PrescriptionPrint ref={componentRef} data={data} />
        </div>
      </Paper>
    </Fade>
  );
  return <BaseModal body={body} isShow={open} />;
}

export default React.memo(AddPrescriptionModal);
