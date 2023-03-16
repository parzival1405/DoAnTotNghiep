import { Close, Save } from "@mui/icons-material";
import { Fade, FormControlLabel, Grid, Paper, Radio, RadioGroup } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideModal } from "../../../redux/actions/modal";
import { titleModal, type } from "../../../utils/TypeOpen";
import Controls from "../../Form/controls/Controls";
import InputLabel from "../../Form/ControlsLabel/InputLabel";
import Label from "../../Form/ControlsLabel/Label";
import BaseModal from "../BaseModal";
import ModalHeader from "../ModalHeader";
const useStyle = makeStyles((theme) => ({
  paper: {
    width: "50%",
    padding: "20px",
  },
  action: {
    display: "flex",
    paddingTop: "10px",
    justifyContent: "flex-end",
  },
  gridCustomInput: {
    paddingBottom: "16px",
    "& .MuiInputBase-input": {
      padding: "6px",
    },
  },
  title: {
    display: "flex",
    marginRight: "10px !important",
    justifyContent: "flex-end",
    color: "rgba(0, 0, 0, 0.6) !important",
    "& .MuiTypography-root": {},
  },
  selected: {
    width: "100%",
    "& .MuiInputBase-root": {
      paddingTop: "4px !important",
      paddingBottom: "4px !important",
      paddingLeft: "0px !important",
    },
  },
  red: {
    color: "red !important",
  },
}));
function AddPermissionModal() {
  const { isShowPermissionModal } = useSelector((state) => state.modal);
  const { open, typeOpenModal } = isShowPermissionModal;

  const [valueOption, setValueOption] = useState([]);
  const classes = useStyle();
  const dispatch = useDispatch();
  const [avatarFile, setAvatarFile] = useState(null);
  const handleHideModal = () => {
    dispatch(hideModal("isShowPermissionModal"));
  };

  const handleSubmitForm = (values) => {};

  useEffect(() => {
    // return () => setAvatarFile(null);
  });

  const handleChangeAvatar = (e) => {
    const file = e.target.files[0];
    let err = "";
    if (!file) return (err = "Tệp không tồn lại");
    if (file.size > 1024 * 1024 * 5) {
      return (err = "Tệp tối đa 5mb");
    }
    // if (err) setMediaErr(err);
    // else setMediaErr("");
    setAvatarFile(file);
  };

  const handleChangeValue = (event, newValue) => {
    setValueOption(newValue);
  };

  const body = (
    <Fade in={isShowPermissionModal.open}>
      <Paper className={classes.paper} id="modal-Account-staff">
        <ModalHeader
          title={titleModal(typeOpenModal, "nhóm quyền")}
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
                  require={true}
                  label="Tên nhóm quyền"
                  size={[3, 9]}
                />
                <Grid item xs={3}>
                  <Label label={"Trạng thái"} className={classes.title} />
                </Grid>
                <Grid item xs={9}>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="active"
                    name="radio-buttons-group"
                    row
                  >
                    <FormControlLabel
                      value="active"
                      control={<Radio />}
                      label="Kích hoạt"
                    />
                    <FormControlLabel
                      value="disable"
                      control={<Radio />}
                      label="Vô hiệu hóa"
                    />
                  </RadioGroup>
                </Grid>
                <InputLabel
                  disable={type(typeOpenModal)}
                  label="Ghi chú"
                  size={[3, 9]}
                />
              </Grid>

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

  return <BaseModal body={body} isShow={isShowPermissionModal.open} />;
}

export default AddPermissionModal;
