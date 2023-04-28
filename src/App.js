import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  HashRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Homepage from "./pages/HomePage";
import { Paper } from "@mui/material";
import OTPModal from "./components/Modal/OTPModal";
import { createTheme, ThemeProvider, styled } from "@mui/material";
import Checkup from "./pages/Checkup";
import PatientReceptionModal from "./components/Modal/PatientReceptionModal";
import AddScheduleModal from "./components/Modal/AddScheduleModal";
import AddBatchProductModal from "./components/Modal/AddBatchProductModal";
import AddSupplierModal from "./components/Modal/AddSupplierModal";
import AddDrugModal from "./components/Modal/AddDrugModal";
import AddAccountStaffModal from "./components/Modal/AddAccountStaffModal";
import AddPermissionModal from "./components/Modal/AddPermissionModal";
import PatientModal from "./components/Modal/PatientModal";
import AddProductGroupsModal from "./components/Modal/AddProductGroupsModal";
import AddServiceModal from "./components/Modal/AddServiceModal";
import AddTypeServiceGroupsModal from "./components/Modal/AddServiceModal/AddTypeServiceGroupsModal";
import { refreshToken } from "./redux/actions/auth";
import ReadQRCodeModal from "./components/Modal/ReadQRCodeModal";
import AddPrescriptionModal from "./components/Modal/AddPrescriptionModal";
import UpdateServiceCLS from "./components/Modal/UpdateServiceCLS";

function App() {
  const { user } = useSelector((state) => state.auth);

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
      yellow: {
        main: "#FFD93D",
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
      h4: {
        fontSize: "1rem",
        fontWeight: 600,
      },
    },
    spacing: 8,
  });

  return (
    <ThemeProvider theme={theme}>
      <HashRouter>
        <OTPModal />
        <PatientReceptionModal />
        <AddScheduleModal />
        <AddBatchProductModal />
        <AddSupplierModal />
        <AddDrugModal />
        <AddAccountStaffModal />
        <AddPermissionModal />
        <PatientModal />
        <AddProductGroupsModal />
        <AddServiceModal />
        <AddTypeServiceGroupsModal />
        <AddPrescriptionModal />
        <ReadQRCodeModal/>
        <UpdateServiceCLS/>
        <Routes>
          <Route
            exact
            path="*"
            element={
              user ? (
                <Navigate to="/Homepage" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
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
