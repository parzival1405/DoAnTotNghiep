import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Homepage from "./pages/HomePage";
import { Paper } from "@mui/material";
import OTPModal from "./components/Modal/OTPModal";
import { createTheme, ThemeProvider, styled } from "@mui/material";
import Checkup from "./pages/Checkup";
import PatientReceptionModal from "./components/Modal/PatientReceptionModal";
import AddScheduleModal from "./components/Modal/AddScheduleModal";
import AddProductModal from "./components/Modal/AddProductModal";
import AddSupplierModal from "./components/Modal/AddSupplierModal";
import AddDrugModal from "./components/Modal/AddDrugModal";
import AddAccountStaffModal from "./components/Modal/AddAccountStaffModal";
import AddPermissionModal from "./components/Modal/AddPermissionModal";
import PatientModal from "./components/Modal/PatientModal";
import AddProductGroupsModal from "./components/Modal/AddProductGroupsModal";
import AddServiceGroupsModal from "./components/Modal/AddServiceGroupsModal";
import AddTypeServiceGroupsModal from "./components/Modal/AddServiceGroupsModal/AddTypeServiceGroupsModal";
import { initStomp } from "./redux/actions/stomp";
import { Client } from "@stomp/stompjs";

function App() {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  useEffect(() => {
    // dispatch();
  }, [dispatch]);
  const theme = createTheme({
    palette: {
      primary: {
        main: "#4eb0ba",
        contrastText: "#fff",
        light: "#4eb0ba50 ",
      },
      secondary: {
        main: "#f83245",
        light: "#f8324526",
      },
      healing: {
        main: "#42f593",
        contrastText: "#fff",
      },
      background: {
        default: "#f4f5fd",
      },
    },
    overrides: {
      MuiAppBar: {
        root: {
          transform: "translateZ(0)",
        },
      },
    },
    props: {
      MuiIconButton: {
        disableRipple: true,
      },
    },
    typography: {
      h6: {
        color: "#4eb0ba",
      },
      h5: {
        color: "#4eb0ba",
      },
    },
    spacing: 8,
  });

  useEffect(() => {
    if (user) {
      var client = null
      if (user.role != "NEWMEM") {
        client = new Client({
          brokerURL: "ws://192.168.1.5/61613",
          onConnect: () => {
            client.subscribe(`/queue/${user.role}`, (message) =>
              console.log(`Received: ${message}`)
            );
          },
        });
      }else{
        client = new Client({
          brokerURL: "ws://192.168.1.5/61613",
        });
      }
      dispatch(initStomp(client));
    }
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <HashRouter>
        <OTPModal />
        <PatientReceptionModal />
        <AddScheduleModal />
        <AddProductModal />
        <AddSupplierModal />
        <AddDrugModal />
        <AddAccountStaffModal />
        <AddPermissionModal />
        <PatientModal />
        <AddProductGroupsModal />
        <AddServiceGroupsModal />
        <AddTypeServiceGroupsModal />
        <Routes>
          <Route
            exact
            path="*"
            element={<Navigate to="/login" replace />}
          ></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route
            exact
            path="/forgotPassword"
            element={<ForgotPassword />}
          ></Route>
          <Route
            exact
            path="/Homepage"
            element={user ? <Homepage /> : <Navigate to="/login" replace />}
          ></Route>
          <Route exact path="/Checkup" element={<Checkup />}></Route>
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
