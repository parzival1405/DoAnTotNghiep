import { Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import PageHeader from "../Header/PageHeader"

const useStyles = makeStyles(theme => ({

}))

function Layout({item,children}) {
    const classes = useStyles();

  return (
    <>
      <PageHeader
        title={item.name}
        icon={item.icon}
      />
      <Paper className={classes.pageContent}>
        {children}
      </Paper>
    </>
  );
}

export default Layout;
