import { combineReducers } from "redux";

import auth from "./auth";
import modal from "./modal";
import loading from "./loading";
import sidebar from "./sidebar";
import tab from "./tab";
import patient from "./patient";
import currentPatient from "./CurrentPatient/currentPatient";
import medicineOfPrescription from "./CurrentPatient/medicineOfPrescription";
import medicalLetter from "./medicalLetter";
import medicalExamination from "./medicalExamination";
import service from "./service";
import product from "./product";
import stomp from "./stomp";
import supplier from "./supplier";
import batchProduct from "./batchProduct";
import serviceAvailable from "./serviceAvailable";
import staff from "./staff";
import socket from "./socket";
import prescription from "./prescription";
import alert from "./alert";
import chat from "./chat";
import onlineDoctor from "./onlineDoctor"
export default combineReducers({
  chat,
  alert,
  prescription,
  socket,
  staff,
  batchProduct,
  supplier,
  product,
  stomp,
  auth,
  modal,
  loading,
  sidebar,
  tab,
  service,
  serviceAvailable,
  currentPatient,
  medicineOfPrescription,
  patient,
  medicalExamination,
  medicalLetter,
  onlineDoctor
});
