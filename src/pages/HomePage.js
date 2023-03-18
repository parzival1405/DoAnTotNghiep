import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import Drawer from "../components/Drawer";
import Sidemenu from "../components/Sidemenu";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { initStomp } from "../redux/actions/stomp";
import { Client } from "@stomp/stompjs";
const useStyles = makeStyles({
  appMain: {
    paddingLeft: "320px",
    width: "100%",
  },
});

function Main() {
  const {isLoading} = useSelector((state) => state.loading)
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    var client = null;
    // cons mySocketFactory = () => new SockJS('http://127.0.0.1:15674/stomp');
    if (user) {
      if (user.role == "NEWMEM") {
        client = new Client({
          brokerURL: "ws://192.168.1.5:61614/ws",
          connectHeaders: {
            login: "admin",
            passcode: "admin",
          },
          onConnect: () => {
            client.subscribe(`/queue/bn`, (message) =>
              console.log(`Received: ${message}`)
            );
          },
        });
      } else {
        client = new Client({
          brokerURL: "ws://192.168.1.5:61614/ws",
          connectHeaders: {
            login: "admin",
            passcode: "admin",
          },
        });
      }
      client.activate();
      dispatch(initStomp(client));
    }

    return () => client?.deactivate();
  }, [user, dispatch]);

  return (
    isLoading ? <Loading /> : <Drawer/> 
  );
}

export default Main;
