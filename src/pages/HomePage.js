import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import Drawer from "../components/Drawer";
import Header from "../components/Header";
import Sidemenu from "../components/Sidemenu";
import Loading from "../components/Loading";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  appMain: {
    paddingLeft: "320px",
    width: "100%",
  },
});

function Main() {
  const {isLoading} = useSelector((state) => state.loading)
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    isLoading ? <Loading /> : <Drawer/> 
  );
}

export default Main;
