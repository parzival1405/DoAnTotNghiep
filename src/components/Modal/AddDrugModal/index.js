import { Add, Close, LabelOutlined, Save } from "@mui/icons-material";
import {
  Button,
  CardMedia,
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
import { hideModal } from "../../../redux/actions/modal";
import InputLabel from "../../Form/ControlsLabel/InputLabel";
import BaseModal from "../BaseModal";

import { makeStyles } from "@mui/styles";
import ModalHeader from "../ModalHeader";
import Controls from "../../Form/controls/Controls";
import SelectedLabel from "../../Form/ControlsLabel/SelectLabel";
import DateLabel from "../../Form/ControlsLabel/DateLabel";
import { titleModal, type } from "../../../utils/TypeOpen";
import Label from "../../Form/ControlsLabel/Label";
import { addProduct, updateProduct } from "../../../redux/actions/product";
import { GLOBALTYPES } from "../../../redux/actionType";
import { v4 as uuidv4 } from 'uuid';
import { newProductFromAddProductModal } from "../../../redux/actions/batchProduct";

const useStyle = makeStyles((theme) => ({
  paper: {
    width: "50%",
    padding: "20px",
  },
  action: {
    display: "flex",
    width: "100%",
    paddingTop: "10px",
    justifyContent: "flex-end",
  },
  gridCustomInput: {
    paddingBottom: "16px",
    "& .MuiInputBase-input": {
      padding: "6px",
    },
  },
  red: {
    color: "red !important",
  },
  button: {
    "& .MuiButtonBase-root": {
      width: "calc(100% - 10px)",
      height: "100%",
      marginLeft: "10px",
    },
  },
  title: {
    display: "flex",
    marginRight: "10px !important",
    justifyContent: "flex-end",
    color: "rgba(0, 0, 0, 0.6) !important",
    "& .MuiTypography-root": {},
  },
  button: {
    "& .MuiButtonBase-root": {
      width: "calc(100% - 10px)",
      // height: "100%",
      marginLeft: "10px",
    },
  },
}));
const optionsUnit = [
  {
    id: "1",
    title: "Chai",
  },
  {
    id: "2",
    title: "Viên",
  },
];

const initialValues = {};

function AddDrugModal() {
  const isShowAddDrugModal= useSelector((state) => state.modal.isShowAddDrugModal);
  const { category } = useSelector((state) => state.product);
  const { open, typeOpenModal, data } = isShowAddDrugModal;
  const classes = useStyle();
  const dispatch = useDispatch();
  const [imageFile, setImageFile] = useState(null);
  const handleHideModal = () => {
    dispatch(hideModal("isShowAddDrugModal"));
  };

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    let err = "";
    if (!file) return (err = "Tệp không tồn lại");
    if (file.size > 1024 * 1024 * 5) {
      return (err = "Tệp tối đa 5mb");
    }
    // if (err) setMediaErr(err);
    // else setMediaErr("");
    setImageFile(file);
  };

  const handleSubmitForm = (values) => {
    const sendData = {
      id:values?.id,
      name: values.name,
      description: values.description,
      benefit: values.benefit,
      price: values.price,
      vienVi:values.vienVi,
      viHop:values.viHop,
      hopThung: values.hopThung,
      categoryDrugId: values.categoryDrug.id,
      note: values.note,
    };

    if(typeOpenModal == GLOBALTYPES.ADD){
      dispatch(addProduct(sendData));
    }else if(typeOpenModal == GLOBALTYPES.ADD_BY_ANOTHER_MODAL){
      dispatch(newProductFromAddProductModal({...sendData,id:uuidv4()}));
    }else{
      dispatch(updateProduct(sendData));
    }
    handleHideModal();
  };
  const body = (
    <Fade in={isShowAddDrugModal.open}>
      <Paper className={classes.paper} id="modal-patient-reception">
        <ModalHeader
          title={titleModal(typeOpenModal, "sản phẩm")}
          onClose={handleHideModal}
        />
        <Formik
          initialValues={
            typeOpenModal == GLOBALTYPES.ADD || typeOpenModal == GLOBALTYPES.ADD_BY_ANOTHER_MODAL ? initialValues : data
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
              >
                <InputLabel
                  disable={type(typeOpenModal)}
                  name="name"
                  label="Tên sản phẩm"
                  value={values.name}
                  size={[3, 9]}
                  onChange={handleChange}
                />
                <SelectedLabel
                  disable={type(typeOpenModal)}
                  label="Loại sản phẩm"
                  options={category}
                  accessField={"name"}
                  setFieldValue={setFieldValue}
                  name="categoryDrug"
                  value={values.categoryDrug}
                  require={true}
                  size={[3, 3]}
                />
                <InputLabel
                  name="price"
                  disable={type(typeOpenModal)}
                  label="Giá bán"
                  value={values.price}
                  size={[3, 3]}
                  onChange={handleChange}
                />
                <InputLabel
                  disable={type(typeOpenModal)}
                  label="Mô tả"
                  name="description"
                  value={values.description}
                  size={[3, 9]}
                  onChange={handleChange}
                />
                <InputLabel
                  disable={type(typeOpenModal)}
                  label="Hộp/Thùng"
                  type="number"
                  name="hopThung"
                  value={values.hopThung}
                  size={[3, 3]}
                  onChange={handleChange}
                />
                <InputLabel
                  disable={type(typeOpenModal)}
                  label="Vỉ/Hộp"
                  type="number"
                  name="viHop"
                  value={values.viHop}
                  size={[3, 3]}
                  onChange={handleChange}
                />
                <InputLabel
                  disable={type(typeOpenModal)}
                  label="Chai-Viên/Vỉ"
                  type="number"
                  name="vienVi"
                  value={values.vienVi}
                  size={[3, 3]}
                  onChange={handleChange}
                />
                <Grid item xs={6}/>
                <InputLabel
                  disable={type(typeOpenModal)}
                  label="Ghi chú"
                  name="note"
                  value={values.note}
                  size={[3, 9]}
                  onChange={handleChange}
                />
                <SelectedLabel
                  disable={type(typeOpenModal)}
                  label="Đơn vị đo"
                  options={optionsUnit}
                  setFieldValue={setFieldValue}
                  accessField={"title"}
                  name="unit"
                  value={values.unit}
                  require={true}
                  size={[3, 3]}
                />
                <Grid item xs={6} />
                <Grid item xs={3}>
                  <Label label={"Hình ảnh"} className={classes.title} />
                </Grid>
                {typeOpenModal == GLOBALTYPES.ADD && (
                  <Grid item xs={2}>
                    <Button
                      variant="contained"
                      component="label"
                      disabled={type(typeOpenModal)}
                    >
                      Chọn
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        name="fileImage"
                        id="fileImage"
                        onChange={handleChangeImage}
                      />
                    </Button>
                  </Grid>
                )}
                <Grid item xs={4}>
                  {imageFile ? (
                    <CardMedia
                      component="img"
                      sx={{ width: "100%" }}
                      image={imageFile ? URL.createObjectURL(imageFile) : ""}
                      alt="Ảnh nhân viên"
                    />
                  ) : (
                    <Label
                      label={"Chưa chọn ảnh nào"}
                      className={[classes.title, classes.red].join(" ")}
                    />
                  )}
                </Grid>
              </Grid>

              {/* button -------------------- */}
              <div className={classes.action}>
                {typeOpenModal != GLOBALTYPES.VIEW && (
                  <Controls.Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    isSubmitting={isSubmitting}
                    text="Lưu"
                    startIcon={<Save />}
                    sx={{ mr: 1 }}
                  />
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
      </Paper>
    </Fade>
  );
  return <BaseModal body={body} isShow={isShowAddDrugModal.open} />;
}

export default AddDrugModal;
