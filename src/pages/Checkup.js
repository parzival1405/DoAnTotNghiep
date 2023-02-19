import { makeStyles } from "@mui/styles";
import React from "react";
import PageHeader from "../components/Header/PageHeader";
import Tab from "../components/Tab";

const useStyles = makeStyles((theme) => ({
  custom: {
    margin:"10px",
    justifyContent:"space-between"
  }
}));

function Checkup() {
  const classes = useStyles();

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
