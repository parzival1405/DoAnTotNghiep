import { Add, Cancel, Close, Save } from "@mui/icons-material";
import { Box, Button, Fade, Grid, Paper } from "@mui/material";
import { DataGrid as MUIDataGrid } from "@mui/x-data-grid";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideModal } from "../../../redux/actions/modal";
import BaseModal from "../BaseModal";

import { makeStyles } from "@mui/styles";
import ModalHeader from "../ModalHeader";
import Controls from "../../Form/controls/Controls";
import { GLOBALTYPES } from "../../../redux/actionType";
import { titleModal, type } from "../../../utils/TypeOpen";
import useDatagrid from "../../../hooks/useDatagrid";
import InputLabel from "../../Form/ControlsLabel/InputLabel";
import { updateServiceAvailable } from "../../../redux/actions/serviceAvailable";
import { bloodResult, bloodResultColumn } from "../../../utils/ResultCLS";

const useStyle = makeStyles((theme) => ({
  mediaItem: {
    marginRight: "20px",
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    "& img": {
      borderRadius: ".5rem",
    },
    "& span": {
      position: "absolute",
      right: "-10px",
      top: "-10px",
      color: "#d32f2f",
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
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

const initialValues = {};

function UpdateServiceCLS() {
  const [hoveredRow, setHoveredRow] = useState(null);
  const isShowUpdateServiceCLSModal = useSelector(
    (state) => state.modal.isShowUpdateServiceCLSModal
  );
  const { open, typeOpenModal, data } = isShowUpdateServiceCLSModal;
  const { user } = useSelector((state) => state.auth);
  const { socket } = useSelector((state) => state.socket);
  const classes = useStyle();
  const dispatch = useDispatch();
  const [media, setMedia] = useState([]);

  const [bloodResultData, setBloodResultData] = useState([]);

  useEffect(() => {
    if (data?.result?.length > 0) {
      setBloodResultData(data.result);
    }else{
      setBloodResultData(bloodResult);
    }
  }, [data,dispatch]);

  const handleHideModal = () => {
    dispatch(hideModal("isShowUpdateServiceCLSModal"));
    setMedia([]);
    setBloodResultData([]);
  };

  const { DataGrid } = useDatagrid(bloodResultColumn);

  const handleSubmitForm = async (values) => {
    const formData = new FormData();
    formData.append("status", "DONE");
    media.forEach((item) => formData.append("files", item));
    formData.append("result", JSON.stringify(bloodResultData));
    dispatch(updateServiceAvailable(data.id,data.doctor.id, formData,socket.current));
  };

  const handleChangeCells = (params, setFieldValue) => {
    const updatedRow = params;
    setBloodResultData((prev) =>
      prev.map((item) => (item.id == params.id ? params : item))
    );
    return updatedRow;
  };

  const handleChangeMedia = (e) => {
    const files = [...e.target.files];
    let err = "";
    let newMedia = [];
    files.forEach((file) => {
      if (!file) return (err = "Tệp không tồn lại");
      if (file.size > 1024 * 1024 * 5) {
        return (err = "Tệp tối đa 5mb");
      }
      return newMedia.push(file);
    });
    // if (err) setMediaErr(err);
    // else setMediaErr("");
    setMedia([...media, ...newMedia]);
  };

  const handleDeleteMedia = (index) => {
    const newMedia = [...media];
    newMedia.splice(index, 1);
    setMedia(newMedia);
  };

  const body = (
    <Fade in={open}>
      <Paper className={classes.paper} id="modal-patient-reception">
        <ModalHeader
          title={titleModal(typeOpenModal, "kết quả cls")}
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
                  label="Kết luận"
                  name="name"
                  // value={values?.result}
                  onChange={handleChange}
                  size={[2, 10]}
                />
                <Grid item xs={9} />
                <Grid item xs={3}>
                  <Button
                    variant="contained"
                    component="label"
                    disabled={type(typeOpenModal)}
                  >
                    Thêm hình ảnh
                    <input
                      type="file"
                      hidden
                      multiple
                      accept="image/*"
                      name="fileAvatar"
                      id="fileAvatar"
                      onChange={handleChangeMedia}
                    />
                  </Button>
                </Grid>
                {media?.map((item, index) => (
                  <Grid item xs={3}>
                    {
                      <img
                        src={URL.createObjectURL(item)}
                        alt="images"
                        style={{ width: "90%", height: "90%" }}
                      />
                    }
                    <span onClick={() => handleDeleteMedia(index)}>
                      <Cancel />{" "}
                    </span>
                  </Grid>
                ))}
                {data?.image?.map((item, index) => (
                  <Grid item xs={3}>
                    {
                      <img
                        src={item}
                        alt="images"
                        style={{ width: "90%", height: "90%" }}
                      />
                    }
                    <span onClick={() => handleDeleteMedia(index)}>
                      <Cancel />{" "}
                    </span>
                  </Grid>
                ))}
              </Grid>

              <Box style={{ height: "300px" }}>
                <DataGrid
                  disable={data ? true : false}
                  records={bloodResultData ? bloodResultData : []}
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
                  // disable={isSubmitting}
                  onKeyPress={(e) => {
                    console.log("here");
                    e.which === 13 && e.preventDefault();
                  }}
                  onClick={() => handleSubmitForm(values)}
                  text="Cập nhật"
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

export default React.memo(UpdateServiceCLS);
