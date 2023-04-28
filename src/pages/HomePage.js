import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import Drawer from "../components/Drawer";
import Sidemenu from "../components/Sidemenu";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { initStomp } from "../redux/actions/stomp";
import { Client } from "@stomp/stompjs";
import { addExaminationRoleDoctor } from "../redux/actions/medicalExamination";
import { initSocket } from "../redux/actions/socket";
import { io } from "socket.io-client";
import { addServiceAvailable } from "../redux/actions/serviceAvailable";
import { addPrescription } from "../redux/actions/product";
const useStyles = makeStyles({
  appMain: {
    paddingLeft: "320px",
    width: "100%",
  },
});

function Main() {
  const { isLoading } = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const socket = useRef();

  useEffect(() => {
    var client = null;
    if (user) {
      if (user.role == "DOCTOR") {
        // bac si nhan phieu kham tu le tan
        client = new Client({
          brokerURL: `ws://${process.env.REACT_APP_URL_ACTIVE_MQ_PORT}:61614/ws`,
          connectHeaders: {
            login: "admin",
            passcode: "admin",
          },
          onConnect: () => {
            client.subscribe(
              `/queue/${user.room.medicalDepartment.codeDepartment}`,
              (message) =>
              // chỉ trường hợp khi chưa có bác sĩ
                dispatch(addExaminationRoleDoctor(JSON.parse(message.body),user.id))
            );
          },
        });
      } else if (user.role == "DRUG_DEALER") {
        // ban thuoc
        client = new Client({
          brokerURL: `ws://${process.env.REACT_APP_URL_ACTIVE_MQ_PORT}:61614/ws`,
          connectHeaders: {
            login: "admin",
            passcode: "admin",
          },
          onConnect: () => {
            client.subscribe(
              `/queue/prescription`,
              (message) =>
                dispatch(addPrescription(JSON.parse(message.body)))
            );
          },
        });
      } else if (user.role == "TEST") {
        // nhan cls tu bac si
        client = new Client({
          brokerURL: `ws://${process.env.REACT_APP_URL_ACTIVE_MQ_PORT}:61614/ws`,
          connectHeaders: {
            login: "admin",
            passcode: "admin",
          },
          onConnect: () => {
            client.subscribe(
              `/queue/clinical_service`,
              (message) =>
                dispatch(addServiceAvailable(JSON.parse(message.body)))
            );
          },
        });
      } else if (user.role == "RECEPTIONIST") {
        client = new Client({
          brokerURL: `ws://${process.env.REACT_APP_URL_ACTIVE_MQ_PORT}:61614/ws`,
          connectHeaders: {
            login: "admin",
            passcode: "admin",
          },
        });
      } else {
        client = new Client({
          brokerURL: `ws://${process.env.REACT_APP_URL_ACTIVE_MQ_PORT}:61614/ws`,
          connectHeaders: {
            login: "admin",
            passcode: "admin",
          },
        });
      }
      client.activate();
      dispatch(initStomp(client));
    }

    // return () => client?.deactivate();
  }, [user, dispatch]);

  useEffect(() => {
    if (user) {
      socket.current = io(process.env.REACT_APP_URL_SERVER_SOCKET, {
        query: {
          id:user.id,
          role:user.role
        },
      });
      dispatch(initSocket({ socket: socket }));
    }
    return () => socket.current.close();
  }, [dispatch]);

  return isLoading ? <Loading /> : <Drawer />;
}

export default Main;
