import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Homepage from "./pages/HomePage";
import { Paper } from "@mui/material";
import OTPModal from "./components/Modal/OTPModal";
import { createTheme, ThemeProvider, styled } from "@mui/material";
function App() {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#4eb0ba",
        contrastText: '#f0f0f0',
      },
      secondary: {
        main: "#f83245",
        light: "#f8324526",
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
        color: "#4eb0ba"
      },
    },
    spacing:8
  });
  return (
    <ThemeProvider theme={theme}>
      <HashRouter>
        <OTPModal />
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
            element={<Homepage />}
          ></Route>
          
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
