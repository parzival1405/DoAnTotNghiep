import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ExaminationInformation from "./ExaminationInformation";
import ClinicalService from "./ClinicalService";
import ExaminationHistory from "./ExaminationHistory";
import Prescription from "./Prescription";
import { Box, Tab as MUITab, Button } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Clear, Healing, Save } from "@mui/icons-material";
import Controls from "../Form/controls/Controls";
import { updateMedicalExamination } from "../../redux/actions/medicalExamination";

function Tab() {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("ExaminationInformation");
  const {clinicalService,currentPatient} = useSelector((state) => state.currentPatient);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSubmit = () => {
    dispatch(updateMedicalExamination({currentPatient,clinicalService}))
  }

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
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
            mt: 2,
            display: "flex",
            justifyContent: "space-between",
            padding: "0 24px",
          }}
        >
          <Controls.Checkbox label="Khám xong" />
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
            <Button
              disableElevation
              variant="contained"
              sx={{ mr: 2 }}
              color="healing"
              startIcon={<Healing />}
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
    </Box>
  );
}

export default Tab;
