import React from "react";
import { Paper, Card, Typography, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ChevronLeftOutlined } from "@mui/icons-material";
import {  useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCurrentPatient } from "../../../redux/actions/currentPatient";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fdfdff",
  },
  pageHeader: {
    display: "flex",
    marginBottom: theme.spacing(2),
  },
  pageIcon: {
    display: "inline-block",
    padding: theme.spacing(1),
    // color: "#3c44b1",
  },
  pageTitle: {
    paddingLeft: theme.spacing(1),
    "& .MuiTypography-subtitle2": {
      opacity: "0.6",
    },
  },
}));

export default function PageHeader(props) {
  const classes = useStyles();
  const { title, subTitle, icon, iconBack,className } = props;
  const dispatch = useDispatch()
const navigate = useNavigate()
   const onBack = (e) => {
    dispatch(clearCurrentPatient());
    navigate("/HomePage")
   }

  return (
    <Paper elevation={0} square className={classes.root}>
      <div className={[classes.pageHeader,className].join(" ")}>
        {icon && <Card className={classes.pageIcon}>{icon}</Card>}
        <div className={classes.pageTitle}>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          <Typography variant="subtitle2" component="div">
            {subTitle}
          </Typography>
        </div>
        {iconBack && (
          <Button variant="outlined" startIcon={<ChevronLeftOutlined />} onClick={onBack}>
            Trở lại
          </Button>
        )}
      </div>
    </Paper>
  );
}
