import { combineReducers } from "redux";

import auth from "./auth";
import modal from "./modal";
import loading from "./loading";
import sidebar from "./sidebar";
import tab from "./tab";
import patient from "./patient";
import currentPatient from "./currentPatient";
import medicalLetter from "./medicalLetter";
import medicalExamination from "./medicalExamination";
import service from "./service";
import product from "./product";
import stomp from "./stomp";
export default combineReducers({
  product,
  stomp,
  auth,
  modal,
  loading,
  sidebar,
  tab,
  service,
  currentPatient,
  patient,
  medicalExamination,
  medicalLetter,
});
