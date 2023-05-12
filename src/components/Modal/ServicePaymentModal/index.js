import { CreditScore } from "@mui/icons-material";
import { Fade, Grid, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideModal } from "../../../redux/actions/modal";
import Controls from "../../Form/controls/Controls";
import BaseModal from "../BaseModal";
import ModalHeader from "../ModalHeader";
import InputLabel from "../../Form/ControlsLabel/InputLabel";
import DateLabel from "../../Form/ControlsLabel/DateLabel";
import { headCellsServicePayment } from "../../../utils/HeadCells";
import { DataGrid } from "@mui/x-data-grid";
import { updatePaymentServiceAvailable } from "../../../redux/actions/serviceAvailable";
import { useSnackbar } from "notistack";
const useStyle = makeStyles((theme) => ({
  paper: {
    width: "65%",
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

function ServicePaymentModal() {
  const isShowServicePaymentModal = useSelector(
    (state) => state.modal.isShowServicePaymentModal
  );
  const { enqueueSnackbar } = useSnackbar();
  const { open, typeOpenModal, data } = isShowServicePaymentModal;
  const { socket } = useSelector((state) => state.socket);
  const { client } = useSelector((state) => state.stomp);

  const dataRows = useMemo(
    () =>
      data?.serviceAvailable
        .filter((item, index) => index != 0)
        .map((item) => ({
          id: item.id,
          name: item.service.name,
          price: item.service.price,
          canNotSelected: item.paid,
        })),
    data
  );

  const [totalPrice, setTotalPrice] = useState(
    dataRows?.reduce(
      (accumulator, currentValue) => accumulator + parseInt(currentValue.price),
      0
    )
  );

  const [selectedRows, setSelectedRows] = useState([]);
  const classes = useStyle();
  const dispatch = useDispatch();

  const handleHideModal = () => {
    dispatch(hideModal("isShowServicePaymentModal"));
  };

  const handlePayment = () => {
    const arrayPaidService = selectedRows.map((item) => item.id);
    dispatch(
      updatePaymentServiceAvailable(
        data,
        arrayPaidService,
        client,
        socket.current
      )
    );
    handleHideModal();
    enqueueSnackbar("Thanh toán thành công");
  };

  const onRowsSelectionHandler = (ids) => {
    const selectedRowsData = ids.map((id) =>
      dataRows.find((row) => row.id === id)
    );
    setTotalPrice(
      selectedRowsData?.reduce(
        (accumulator, currentValue) =>
          accumulator + parseInt(currentValue.price),
        0
      )
    );
    setSelectedRows(selectedRowsData);
  };

  const body = (
    <Fade in={isShowServicePaymentModal.open}>
      <Paper className={classes.paper} id="modal-patient-reception">
        <ModalHeader title="Thanh toán dịch vụ CLS" onClose={handleHideModal} />

        <Grid container rowSpacing={1} className={classes.gridCustomInput}>
          <InputLabel
            disable={true}
            label="Bệnh nhân"
            size={[2, 4]}
            name="patient.phoneNumber"
            value={data?.patient?.fullName}
          />
          <Grid xs={1} />
          <DateLabel
            label="Tuổi"
            name="patient.dateOfBirth"
            value={data?.patient?.dateOfBirth}
            size={[2, 3]}
            disable={true}
          />
        </Grid>
        <DataGrid
          style={{
            height: "300px",
            marginTop: "10px",
            marginBottom: "10px",
          }}
          rows={dataRows || []}
          columns={headCellsServicePayment}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          isRowSelectable={(params) => params.row.canNotSelected === false}
          checkboxSelection
          disableSelectionOnClick
          onRowSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
          pageSizeOptions={[5]}
        />
        <Grid container rowSpacing={1} className={classes.gridCustomInput}>
          <Grid item xs={7} />
          <InputLabel
            disable={true}
            value={totalPrice}
            label="Tổng tiền"
            size={[2, 3]}
          />
        </Grid>
        <div className={classes.action}>
          <Controls.Button
            style={{ margin: "0" }}
            color="primary"
            variant="contained"
            onClick={handlePayment}
            text="Thanh toán"
            startIcon={<CreditScore />}
            sx={{ mr: 1 }}
          />
        </div>
      </Paper>
    </Fade>
  );
  return <BaseModal body={body} isShow={isShowServicePaymentModal.open} />;
}

export default React.memo(ServicePaymentModal);
