import React, { useEffect, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import ExaminationInformation from "./ExaminationInformation";
import ClinicalService from "./ClinicalService";
import ExaminationHistory from "./ExaminationHistory";
import Prescription from "./Prescription";
import { Box, Tab as MUITab, Button, SwipeableDrawer } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Clear, Healing, Save } from "@mui/icons-material";
import Controls from "../Form/controls/Controls";
import ReactToPrint from "react-to-print";
import { updateMedicalExamination } from "../../redux/actions/medicalExamination";
import { MedicalExaminationPrint } from "../PrintComponent/ExaminationMedialPrint";
import AddPrescriptionDrawer from "./AddPrescriptionDrawer";
import { useNavigate } from "react-router-dom";

const drawerWidth = 550;
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
  })
);

function Tab() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [value, setValue] = useState("ExaminationInformation");
  const [check,setCheck] = useState(null);
  const { currentPatient, addOrDelete } = useSelector(
    (state) => state.currentPatient
  );
  const { client } = useSelector(
    (state) => state.stomp
  );
  const { socket } = useSelector(
    (state) => state.socket
  );
  
  const [open, setOpen] = React.useState(false);
  const addOrDeleteDrug = useSelector(
    (state) => state.medicineOfPrescription.addOrDeleteDrug
  );
  const componentRef = useRef();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSubmit = () => {
    dispatch(updateMedicalExamination({ currentPatient, addOrDelete, addOrDeleteDrug,check },client,socket.current));
  };

  const handleSubmitAndPrint = () => {};

  const handleDrawerOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleChangeCheck = (value) => {
    setCheck(value)
  }

  return (
    <Box sx={{ width: "100%", display: 'flex', typography: "body1" }}>
      <Main open={open}>
        <TabContext open={open} value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <MUITab label="Thông tin khám" value="ExaminationInformation" />
              <MUITab label="Dịch vụ lâm sàng" value="ClinicalService" />
              <MUITab label="Lịch sử khám" value="ExaminationHistory" />
              <MUITab label="Đơn thuốc" value="Prescription" />
            </TabList>
          </Box>
          <div style={{ height: "600px" }}>
            <TabPanel value="ExaminationInformation">
              <ExaminationInformation />
            </TabPanel>
            <TabPanel value="ClinicalService">
              <ClinicalService />
            </TabPanel>
            <TabPanel value="ExaminationHistory">
              <ExaminationHistory />
            </TabPanel>
            <TabPanel value="Prescription">
              <Prescription />
            </TabPanel>
          </div>
          <Box
            sx={{
              // mt: 1,
              display: "flex",
              justifyContent: "space-between",
              padding: "0 24px",
            }}
          >
            <Controls.Checkbox label="Khám xong" onChange={handleChangeCheck} name="status" />
            <div>
              <Button
                variant="contained"
                disableElevation
                sx={{ mr: 2 }}
                startIcon={<Save />}
                onClick={handleSubmit}
              >
                Lưu
              </Button>

              <ReactToPrint
                trigger={() => {
                  return (
                    <Button
                      variant="contained"
                      disableElevation
                      color="yellow"
                      sx={{ mr: 2 }}
                      startIcon={<Save />}
                    >
                      Lưu & in
                    </Button>
                  );
                }}
                content={() => componentRef.current}
              />
              <div style={{ display: "none" }}>
                <MedicalExaminationPrint ref={componentRef} />
              </div>
              <Button
                disableElevation
                variant="contained"
                sx={{ mr: 2 }}
                color="healing"
                startIcon={<Healing />}
                onClick={handleDrawerOpen}
              >
                Đơn thuốc
              </Button>
              <Button
                variant="contained"
                disableElevation
                color="error"
                startIcon={<Clear />}
              >
                Hủy
              </Button>
            </div>
          </Box>
        </TabContext>
      </Main>
      <AddPrescriptionDrawer open={open} setOpen={setOpen} />
    </Box>
  );
}

export default Tab;
