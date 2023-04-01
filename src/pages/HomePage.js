import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import Drawer from "../components/Drawer";
import Sidemenu from "../components/Sidemenu";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { initStomp } from "../redux/actions/stomp";
import { Client } from "@stomp/stompjs";
import { addExaminationRoleDoctor } from "../redux/actions/medicalExamination";
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
  useEffect(() => {
    // var client = null;

    // if (user) {
    //   if (user.role == "DOCTOR") {
    //     client = new Client({
    //       brokerURL: "ws://192.168.1.2:61614/ws",
    //       connectHeaders: {
    //         login: "admin",
    //         passcode: "admin",
    //       },
    //       onConnect: () => {
    //         client.subscribe(
    //           `/queue/${user.department.codeDepartment}`,
    //           (message) =>
    //             dispatch(addExaminationRoleDoctor(JSON.parse(message.body)))
    //         );
    //       },
    //     });
    //   } else if (user.role == "DRUG_DEALER") {
    //     client = new Client({
    //       brokerURL: "ws://192.168.1.2:61614/ws",
    //       connectHeaders: {
    //         login: "admin",
    //         passcode: "admin",
    //       },
    //       onConnect: () => {
    //         client.subscribe(
    //           `/queue/prescription`,
    //           (message) =>
    //             // dispatch(addExaminationRoleDoctor(JSON.parse(message.body)))
    //             null
    //         );
    //       },
    //     });
    //   } else if (user.role == "TEST") {
    //     client = new Client({
    //       brokerURL: "ws://192.168.1.2:61614/ws",
    //       connectHeaders: {
    //         login: "admin",
    //         passcode: "admin",
    //       },
    //       onConnect: () => {
    //         client.subscribe(
    //           `/queue/Clinical_service`,
    //           (message) =>
    //             // dispatch(addExaminationRoleDoctor(JSON.parse(message.body)))
    //             null
    //         );
    //       },
    //     });
    //   } else if (user.role == "RECEPTIONIST") {
    //     client = new Client({
    //       brokerURL: "ws://192.168.1.2:61614/ws",
    //       connectHeaders: {
    //         login: "admin",
    //         passcode: "admin",
    //       },
    //     });
    //   } else {
    //     client = new Client({
    //       brokerURL: "ws://192.168.1.2:61614/ws",
    //       connectHeaders: {
    //         login: "admin",
    //         passcode: "admin",
    //       },
    //     });
    //   }
    //   client.activate();
    //   dispatch(initStomp(client));
    // }

    // return () => client?.deactivate();
  }, [user, dispatch]);

  return isLoading ? <Loading /> : <Drawer />;
}

export default Main;
