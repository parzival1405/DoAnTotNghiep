import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import Drawer from "../components/Drawer";
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
  return (
    isLoading ? <Loading /> : <Drawer/> 
  );
}

export default Main;
