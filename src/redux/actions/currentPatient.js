import * as api from "../../api";
import { GLOBALTYPES } from "../actionType";
const qs = require('qs');

export const setCurrentPatient = (examinationInformation) => async (dispatch) => {
  try {
    dispatch({
      type:GLOBALTYPES.CURRENT_PATIENT,
      payload:examinationInformation
    });

    const historyMedicalExaminationResponse = await api.getHistoryMedicalExaminationByIdPatient(examinationInformation.patient.id) 
    dispatch({
      type:GLOBALTYPES.HISTORY_MEDICAL_EXAMINATION,
      payload: historyMedicalExaminationResponse.data
    });

    
    const serviceResponse = await api.getAllService();
    dispatch({
      type: GLOBALTYPES.GET_ALL_SERVICE,
      payload: serviceResponse.data,
    });

    const historyMedicineResponse = await api.getMedicineByPatientId(examinationInformation.patient.id);
    console.log(historyMedicineResponse)
    dispatch({
      type:GLOBALTYPES.HISTORY_MEDICINE_OF_SERVICE,
      payload: historyMedicineResponse.data
    });


  } catch (err) {
    console.log("err")
  }
};

export const addClinicalService = (service) => async (dispatch) => {
  try {
    dispatch({
      type:GLOBALTYPES.ADD_PATIENT_CLINICAL_SERVICE,
      payload:service
    });
  } catch (err) {}
}

export const removeClinicalService = (service) => async (dispatch) => {
  try {
    dispatch({
      type:GLOBALTYPES.REMOVE_PATIENT_CLINICAL_SERVICE,
      payload:service
    });
  } catch (err) {}
}
