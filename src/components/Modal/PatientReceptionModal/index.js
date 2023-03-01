import { Close, LabelOutlined, Save } from "@mui/icons-material";
import {
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
import useTable from "../../../hooks/useTable";
import TableRow from "../../TableRow/TableContextMenu";
import SelectedLabel from "../../Form/ControlsLabel/SelectLabel";
import DateLabel from "../../Form/ControlsLabel/DateLabel";

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
    "& .MuiInputBase-input": {
      padding: "6px",
    },
  },
}));

const headCells = [
  { id: "radio", sizeCellWidth: 60, label: "Chọn" },
  { id: "room", numeric: false, label: "Phòng khám" },
  { id: "waiting", sizeCellWidth: 100, numeric: true, label: "Chờ khám" },
  { id: "examined", sizeCellWidth: 100, numeric: true, label: "Đã khám" },
];
const records = [
  {
    id: 1,
    room: "Phòng 1",
    waiting: 1,
    examined: 5,
  },
  {
    id: 3,
    room: "Phòng 2",
    waiting: 1,
    examined: 5,
  },
  {
    id: 2,
    room: "Phòng 3",
    waiting: 1,
    examined: 5,
  },
];

const optionsTypeOfExamination = [
  { id: "newExamination", title: "Khám tổng quát" },
  {
    id: "reExamination",
    title: "khám mắt",
  },
  { id: "newExamination2", title: "Khám da liễu" },
];

function PatientReceptionModal() {
  const { isShowPatientReceptionModal } = useSelector((state) => state.modal);
  const classes = useStyle();
  const dispatch = useDispatch();

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, headCells, filterFn);

  const handleHideModal = () => {
    dispatch(hideModal("isShowPatientReceptionModal"));
  };

  const handleSubmitForm = (values) => {};

  const body = (
    <Fade in={isShowPatientReceptionModal}>
      <Paper className={classes.paper} id="modal-patient-reception">
        <ModalHeader title="Tiếp đón bệnh nhân" onClose={handleHideModal} />
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
                <InputLabel label="Bệnh nhân" require={true} size={[3, 3]} />
                {/* <Grid item xs={2} /> */}
                <DateLabel label="Tuổi" size={[3, 3]} />
                <InputLabel
                  label="Nhân viên tiếp đón"
                  require={true}
                  size={[3, 3]}
                />
                {/* <Grid item xs={2} /> */}
                <InputLabel label="Điện thoại" size={[3, 3]} />
                <SelectedLabel
                  options={optionsTypeOfExamination}
                  label="Loại khám"
                  require={true}
                  size={[3, 3]}
                />
                {/* <Grid item xs={2} /> */}
                <DateLabel disable={true} currentDate={true} label="Ngày lập" require={true} size={[3, 3]} />
                <InputLabel label="Bác sĩ khám" require={true} size={[3, 3]} />
                {/* <Grid item xs={2} /> */}
                <InputLabel label="Tổng tiền" size={[3, 3]} />
                <InputLabel label="Ghi chú" size={[3, 9]} />
                <InputLabel label="Dấu hiệu lâm sàng" size={[3, 9]} />
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
                            key={item.id}
                            item={item}
                            headCells={headCells}
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
  return <BaseModal body={body} isShow={isShowPatientReceptionModal} />;
}

export default PatientReceptionModal;
