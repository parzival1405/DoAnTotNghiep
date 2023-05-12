import { ThemeProvider, createTheme } from "@mui/material";
import { SnackbarProvider } from "notistack";
import React from "react";
import { useSelector } from "react-redux";
import {
  HashRouter,
  Navigate,
  Route,
  Routes
} from "react-router-dom";
import AddAccountStaffModal from "./components/Modal/AddAccountStaffModal";
import AddBatchProductModal from "./components/Modal/AddBatchProductModal";
import AddDrugModal from "./components/Modal/AddDrugModal";
import AddPermissionModal from "./components/Modal/AddPermissionModal";
import AddPrescriptionModal from "./components/Modal/AddPrescriptionModal";
import AddProductGroupsModal from "./components/Modal/AddProductGroupsModal";
import AddScheduleModal from "./components/Modal/AddScheduleModal";
import AddServiceModal from "./components/Modal/AddServiceModal";
import AddTypeServiceGroupsModal from "./components/Modal/AddServiceModal/AddTypeServiceGroupsModal";
import AddSupplierModal from "./components/Modal/AddSupplierModal";
import DetailedMedicalHistory from "./components/Modal/DetailedMedicalHistory";
import OTPModal from "./components/Modal/OTPModal";
import PatientModal from "./components/Modal/PatientModal";
import PatientReceptionModal from "./components/Modal/PatientReceptionModal";
import PrivateInformationModal from "./components/Modal/PrivateInfomationModal";
import ReadQRCodeModal from "./components/Modal/ReadQRCodeModal";
import ServicePaymentModal from "./components/Modal/ServicePaymentModal";
import UpdateServiceCLS from "./components/Modal/UpdateServiceCLS";
import Checkup from "./pages/Checkup";
import ForgotPassword from "./pages/ForgotPassword";
import Homepage from "./pages/HomePage";
import Login from "./pages/Login";
import ChangePasswordModal from "./components/Modal/ChangePasswordModal";
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
    <SnackbarProvider
      maxSnack={6}
      autoHideDuration={3000}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <ThemeProvider theme={theme}>
        <HashRouter>
          <OTPModal />
          {user && <PatientReceptionModal />}
          {user && <AddScheduleModal />}
          {user && <AddBatchProductModal />}
          {user && <AddSupplierModal />}
          {user && <AddDrugModal />}
          {user && <AddAccountStaffModal />}
          {user && <AddPermissionModal />}
          {user && <PatientModal />}
          {user && <AddProductGroupsModal />}
          {user && <AddServiceModal />}
          {user && <AddTypeServiceGroupsModal />}
          {user && <AddPrescriptionModal />}
          {user && <ReadQRCodeModal />}
          {user && <UpdateServiceCLS />}
          {user && <ServicePaymentModal />}
          {user && <DetailedMedicalHistory/> }
          {user && <PrivateInformationModal user={user}/>}
          {user && <ChangePasswordModal user={user}/> }
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
    </SnackbarProvider>
  );
}

export default App;
