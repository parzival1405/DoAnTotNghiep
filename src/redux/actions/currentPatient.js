import * as api from "../../api";
import { GLOBALTYPES } from "../actionType";
const qs = require("qs");

export const setCurrentPatient =
  (examinationInformation) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.CURRENT_PATIENT,
        payload: examinationInformation,
      });

      const historyMedicalExaminationResponse =
        await api.getHistoryMedicalExaminationByIdPatient(
          examinationInformation.patient.id
        );
      dispatch({
        type: GLOBALTYPES.HISTORY_MEDICAL_EXAMINATION,
        payload: historyMedicalExaminationResponse.data,
      });

      dispatch({
        type: GLOBALTYPES.HISTORY_MEDICINE_OF_SERVICE,
        payload: historyMedicalExaminationResponse.data.map((item) => ({
          id: item.id,
          createdDate: null,
          sub: item.detailMedicineResponses,
        })),
      });

      const serviceResponse = await api.getAllService();
      dispatch({
        type: GLOBALTYPES.GET_ALL_SERVICE,
        payload: serviceResponse.data,
      });
    } catch (err) {
      console.log("err");
    }
  };

export const addClinicalService = (service) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.ADD_PATIENT_CLINICAL_SERVICE,
      payload: service,
    });
  } catch (err) {}
};

export const removeClinicalService = (service) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.REMOVE_PATIENT_CLINICAL_SERVICE,
      payload: service,
    });
  } catch (err) {}
};

export const updateCurrentPatient = (name, value) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.UPDATE_FIELD_CURRENT_PATIENT,
      payload: { fieldName: name, fieldData: value },
    });
  } catch (err) {}
};
