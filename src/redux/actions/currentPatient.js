import * as api from "../../api";
import { GLOBALTYPES } from "../actionType";
const qs = require("qs");

export const setCurrentPatient =
  (examinationInformation, navigate) => async (dispatch) => {
    try {
      const examinationInformationResponse =
        await api.getMedicalExaminationById(examinationInformation.id);

      dispatch({
        type: GLOBALTYPES.CURRENT_PATIENT,
        payload: examinationInformationResponse.data,
      });

      dispatch({
        type: GLOBALTYPES.ALL_CLINICAL_SERVICE_CURRENT_PATIENT,
        payload:
          examinationInformationResponse.data.medicalExaminationDetailsResponses.filter(
            (item, index) => index != 0
          ),
      });

      dispatch({
        type: GLOBALTYPES.PRESCRIPTION_CURRENT_PATIENT,
        payload:
          examinationInformationResponse.data.detailMedicineResponses.map(
            (item, index) => ({
              ...item.drug,
              quantity: item.quantity,
              designate: item.designate,
            })
          ),
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
          createdDate: item.createdDate,
          note: item.note,
          result: item.result,
          totalPrice: item.detailMedicineResponses.reduce(
            (accumulator, item) => accumulator + item.totalPrice,
            0
          ),
          sub: item.detailMedicineResponses,
        })),
      });

      const serviceResponse = await api.getAllServiceCLS(true);
      dispatch({
        type: GLOBALTYPES.GET_ALL_SERVICE,
        payload: serviceResponse.data,
      });

      navigate("/Checkup");
    } catch (err) {
      console.log("err");
    }
  };

export const addClinicalService = (service) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.ADD_PATIENT_CLINICAL_SERVICE,
      payload: { service: service, state: "Đang làm" },
    });
  } catch (err) {}
};
export const clearCurrentPatient = () => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.CLEAR_CURRENT_PATIENT,
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

export const addMedicineOfPrescription = (item) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.ADD_MEDICINE_OF_PRESCRIPTION,
      payload: item,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateMedicineOfPrescription = (item) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.UPDATE_MEDICINE_OF_PRESCRIPTION,
      payload: item,
    });
  } catch (err) {
    console.log(err);
  }
};

export const removeMedicineOfPrescription = (item) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.REMOVE_MEDICINE_OF_PRESCRIPTION,
      payload: item,
    });
  } catch (err) {
    console.log(err);
  }
};
