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
import supplier from "./supplier";
import batchProduct from "./batchProduct";
export default combineReducers({
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
  currentPatient,
  patient,
  medicalExamination,
  medicalLetter,
});
