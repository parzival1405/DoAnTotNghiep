import { makeStyles } from "@mui/styles";
import React, { useEffect } from "react";
import PageHeader from "../components/Header/PageHeader";
import Tab from "../components/Tab";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../redux/actions/product";
import { GLOBALTYPES } from "../redux/actionType";

const useStyles = makeStyles((theme) => ({
  custom: {
    margin:"10px",
    justifyContent:"space-between"
  }
}));

function Checkup() {
  const classes = useStyles();
const dispatch = useDispatch()
  const {socket} = useSelector((state) => state.socket)
  useEffect(() => {
    socket.current.connect();
    dispatch(getAllProduct())
  })

  useEffect(() => {
    socket?.current.on("receiveDoneServiceCLS", (data) => {
      console.log(data)
      dispatch({
        type: GLOBALTYPES.UPDATE_DONE_SERVICE_CLS,
        payload: data,
      });
    });

    return () => socket?.current.off("receiveDoneServiceCLS");
  }, [socket, dispatch]);

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
