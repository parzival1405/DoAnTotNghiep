import { makeStyles } from "@mui/styles";
import { Client } from "@stomp/stompjs";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import Drawer from "../components/Drawer";
import Loading from "../components/Loading";
import { addExaminationRoleDoctor } from "../redux/actions/medicalExamination";
import { addOrUpdatePrescription } from "../redux/actions/product";
import { addOrUpdateServiceAvailable } from "../redux/actions/serviceAvailable";
import { initSocket } from "../redux/actions/socket";
import { initStomp } from "../redux/actions/stomp";
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
                dispatch(
                  addExaminationRoleDoctor(JSON.parse(message.body), user.id)
                )
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
            client.subscribe(`/queue/prescription`, (message) =>
              dispatch(addOrUpdatePrescription(JSON.parse(message.body)))
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
            client.subscribe(`/queue/clinical_service`, (message) => {
              dispatch(addOrUpdateServiceAvailable(JSON.parse(message.body)));
            });
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
          id: user.id,
          role: user.role,
        },
      });
      dispatch(initSocket({ socket: socket }));
    }
    return () => socket.current.close();
  }, [dispatch]);

  return isLoading ? <Loading /> : <Drawer />;
}

export default Main;
