import { Avatar, Fade, Grid, Paper } from "@mui/material";

import { makeStyles } from "@mui/styles";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideModal } from "../../../redux/actions/modal";
import BaseModal from "../BaseModal";
import ModalHeader from "../ModalHeader";
import AvatarIcon from "../../../assets/img/avt_doctor.png";
import Field from "../../TextShow/Field";

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
  avatar: {
    width: "100px",
    height: "100px",
    margin: "auto",
    borderRadius: "50%",
  },
}));

function PrivateInformationModal({ user }) {
  const classes = useStyle();
  const dispatch = useDispatch();

  const isShowPrivateInformationModal = useSelector(
    (state) => state.modal.isShowPrivateInformationModal
  );

  const { open } = isShowPrivateInformationModal;

  const handleHideModal = () => {
    dispatch(hideModal("isShowPrivateInformationModal"));
  };

  //
  const body = (
    <Fade in={open}>
      <Paper className={classes.paper} id="modal-add-friend">
        <ModalHeader title="Thông tin cá nhân" onClose={handleHideModal} />
        <Grid container rowSpacing={1}>
          <Grid xs={4} />
          <Grid item xs={4} alignItems="center">
            <Avatar
              className={classes.avatar}
              src={user?.avatar ? user.avatar : AvatarIcon}
              style={{
                display: "flex",
                justifyContent: "center",
                height: "100%",
                width: "70%",
              }}
            />
          </Grid>
          <Grid xs={4} />
          <Field
            label="Tên nhân viên"
            value={user.fullName}
            variant={"subtitle1"}
            size={5}
          />
          <Field
            label="Tuổi"
            value={user.dateOfBirth}
            variant={"subtitle1"}
            size={3}
          />
          <Field
            label="Số điện thoại"
            value={user.phoneNumber}
            variant={"subtitle1"}
            size={4}
          />
           <Field
            label="Email"
            value={user.emal}
            variant={"subtitle1"}
            size={4}
          />
          <Field
            label="Giới tính"
            value={user.sex ? "Nam" : "Nữ"}
            variant={"subtitle1"}
            size={12}
          />
          <Field
            label="CMND/CCCD"
            value={user.idCardNumber}
            variant={"subtitle1"}
            size={12}
          />
          <Field
            label="Khoa"
            value={user.room.medicalDepartment.name}
            variant={"subtitle1"}
            size={5}
          />
          <Field
            label="Chức vụ"
            value={
              user.role === "DOCTOR"
                ? "Bác sĩ"
                : user.role === "RECEPTIONIST"
                ? "Lễ tân"
                : user.role === "TEST"
                ? "Kỹ thuật viên xét nghiệm"
                : user.role === "DRUG_DEALER"
                ? "Dược sĩ"
                : "Điều Dưỡng"
            }
            variant={"subtitle1"}
            size={3}
          />
        </Grid>
      </Paper>
    </Fade>
  );
  return <BaseModal body={body} isShow={open} />;
}

export default PrivateInformationModal;
