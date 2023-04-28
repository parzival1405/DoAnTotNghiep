import { makeStyles } from "@mui/styles";
import React, { useEffect } from "react";
import PageHeader from "../components/Header/PageHeader";
import Tab from "../components/Tab";
import { useDispatch } from "react-redux";
import { getAllProduct } from "../redux/actions/product";

const useStyles = makeStyles((theme) => ({
  custom: {
    margin:"10px",
    justifyContent:"space-between"
  }
}));

function Checkup() {
  const classes = useStyles();
const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllProduct())
  })

  return (
    <>
      <PageHeader
        title="Phiếu khám bệnh"
        icon={null}
        iconBack={true}
        className={classes.custom}
      />
      <Tab />
    </>
  );
}

export default Checkup;
