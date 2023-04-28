import { Box, Button, Drawer, Grid } from "@mui/material";
import React, { useMemo, useState } from "react";
import { makeStyles } from "@mui/styles";
import { VisibilityOff } from "@mui/icons-material";
import useDatagrid from "../../../hooks/useDatagrid";
import { AddPrescriptionCell } from "../../../utils/HeadCells";
import { useDispatch, useSelector } from "react-redux";
import SelectedLabel from "../../Form/ControlsLabel/SelectLabel";
import InputLabel from "../../Form/ControlsLabel/InputLabel";
import {
  addMedicineOfPrescription,
  updateMedicineOfPrescription,
} from "../../../redux/actions/currentPatient";
const drawerWidth = 550;

const useStyles = makeStyles((theme) => ({
  Datagrid: {
    height: "500px",
  },
}));

const columnVisible = {};

function AddPrescriptionDrawer({ open, setOpen }) {
  const [hoveredRow, setHoveredRow] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { products, category } = useSelector((state) => state.product);
  const [filterCategory,setFilterCategory] = useState(null)
  const [totalPrice, setTotalPrice] = useState(0);
  const { medicineOfPrescription } = useSelector(
    (state) => state.medicineOfPrescription
  );

  const drugFiler = useMemo(() => {
    if(filterCategory){
      return products.filter((item) => item?.categoryDrug?.id == filterCategory.id)
    }else{
      return products
    }
  } ,[filterCategory])

  const dataArrayRender = useMemo(
    () =>
      medicineOfPrescription?.map((item, index) => ({
        id: item.id,
        stt: index + 1,
        name: item.name,
        quantity: item.quantity,
        designate: item.designate,
        price: item.price,
      })),
    [medicineOfPrescription]
  );

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const onSelectedDrug = (e, item) => {
    if (item) {
      dispatch(addMedicineOfPrescription(item));
    }
  };

  const onMouseEnterRow = (event) => {
    const id = Number(event.currentTarget.getAttribute("data-id"));
    setHoveredRow(id);
  };

  const onMouseLeaveRow = (event) => {
    // setHoveredRow(null);
  };

  const { DataGrid } = useDatagrid(
    AddPrescriptionCell,
    onMouseEnterRow,
    onMouseLeaveRow
  );

  const handleChangeCells = (params) => {
    const updatedRow = { ...params, isNew: false };

    const oldDevices = medicineOfPrescription.map((dev) =>
      dev.id === params.id
        ? { ...dev, quantity: params.quantity ?  params.quantity : 0, price: params.price }
        : dev
    );
    setTotalPrice(calcTotalPrice(oldDevices));
    dispatch(updateMedicineOfPrescription(params));

    return updatedRow;
  };

  const calcTotalPrice = (products) => {
    return products.reduce(
      (accumulator, item) => accumulator + item.quantity * item.price,
      0
    );
  };

  const onSelectCategory = (event,newValue) => {
    setFilterCategory(newValue)

  }

  return (
    <Drawer
      variant="persistent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
        },
        "& .MuiPaper-root": {
          padding: "15px",
          height: "calc(100% - 50px)",
        },
      }}
      anchor="right"
      open={open}
    >
      <Grid
        container
        rowSpacing={1}
        // className={classes.gridCustomInput}
        sx={{ mt: 1 }}
      >
        <SelectedLabel
          label="Loại"
          options={category}
          size={[3, 9]}
          name="category"
          value={filterCategory}
          onChange={(event, newValue) => onSelectCategory(event, newValue)}
          accessField={"name"}
        />
        <SelectedLabel
          label="Tên thuốc"
          options={drugFiler}
          size={[3, 9]}
          accessField={"name"}
          name="products"
          onChange={(event, newValue) => onSelectedDrug(event, newValue)}
        />
      </Grid>
      <Box style={{ marginTop: "10px", height: "500px" }}>
        <DataGrid
          columnVisibilityModel={columnVisible}
          records={dataArrayRender}
          saveDeviceCell={(params) => handleChangeCells(params)}
        />
      </Box>
      <Box style={{ flex: 1 }} />
      <Grid
        container
        rowSpacing={1}
        // className={classes.gridCustomInput}
        sx={{ mt: 1 }}
      >
        <Grid item xs={5} />
        <InputLabel
          label="Tổng cộng"
          name="totalPrice"
          value={totalPrice}
          disable={true}
          size={[3, 4]}
        />
      </Grid>

      <Button
        variant="contained"
        disableElevation
        style={{ width: "100px" }}
        sx={{ mt: 2 }}
        startIcon={<VisibilityOff />}
        onClick={handleDrawerClose}
      >
        Ẩn
      </Button>
    </Drawer>
    // </Box>
  );
}

export default React.memo(AddPrescriptionDrawer);
