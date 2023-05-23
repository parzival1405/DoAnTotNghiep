import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";

import AppBarHeader from "./AppBarHeader";
import MiniDrawer from "./MiniDrawer";
import Button from "../Form/controls/Button";
import Controls from "../Form/controls/Controls";
import { useNavigate } from "react-router-dom";
import Side from "../Side";
import { useDispatch, useSelector } from "react-redux";
import { GLOBALTYPES } from "../../redux/actionType";

function Drawer() {
  const [open, setOpen] = useState(true);
  const { IDSelected } = useSelector((state) => state.sidebar);
  const { socket } = useSelector((state) => state.socket);
  const { user } = useSelector((state) => state.auth);
  const { client } = useSelector((state) => state.stomp);
  const numberOfPending = useSelector(
    (state) => state.onlineDoctor.numberOfPending
  );
  const numberOfDoctorOnline = useSelector(
    (state) => state.onlineDoctor.numberOfDoctorOnline
  );
  const medicalExaminationsDoctorData = useSelector(
    (state) => state.medicalExamination.medicalExaminationsDoctorData
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDrawerClick = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    socket?.current.on("haveNewMedicalExamination", () => {
      dispatch({
        type: GLOBALTYPES.ADD_ONE_MEDICAL_EXAMINATION_PENDING,
      });

      const numberOfPendingDoctor = medicalExaminationsDoctorData.filter(
        (item) => item.status === "WAIT"
      ).length;

      console.log(medicalExaminationsDoctorData,numberOfDoctorOnline);
      if (numberOfDoctorOnline > 1) {
        console.log(
          numberOfPendingDoctor,
          (numberOfPending + 1) / numberOfDoctorOnline
        );
        if (
          numberOfPendingDoctor >
          (numberOfPending + 1) / numberOfDoctorOnline
        ) {
          console.log("here1deactivate")
          client.deactivate();
        } else {
          console.log("here2activate")
          client.activate();
        }

        dispatch({
          type: GLOBALTYPES.INIT_STOMP,
          payload: client,
        });
      } else if (numberOfDoctorOnline === 1) {
        client.activate();
        dispatch({
          type: GLOBALTYPES.INIT_STOMP,
          payload: client,
        });
      }
    });

    return () => socket?.current.off("haveNewMedicalExamination");
  }, [socket, medicalExaminationsDoctorData, numberOfPending]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <AppBarHeader handleDrawerClick={handleDrawerClick} />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <MiniDrawer open={open} />
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, height: "700px" }}
          style={{ padding: "10px" }}
        >
          {IDSelected && <Side />}
        </Box>
      </div>
    </Box>
  );
}

export default Drawer;
