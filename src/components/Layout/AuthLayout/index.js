import React from "react";
import { Avatar, Typography } from "@mui/material";
import useStyles from "./styles";
import Logo from "../../../assets/img/logo.png"
function AuthLayout({ children }) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.block}>
        <h3 className={classes.header}>
          <Avatar
            className={classes.avatar}
            src={Logo}
          />
        </h3>
        {children}
        <div className={classes.footer}></div>
      </div>
    </div>
  );
}

export default AuthLayout;
