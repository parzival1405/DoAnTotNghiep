import { GLOBALTYPES } from "../actionType";
import * as api from "../../api";
import { getCurrentDateString } from "../../utils/Calc";

export const callAPIForPatientReceptionSide = () => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.START_LOADING_CALL_API,
    });

    const serviceResponse = await api.getAllService();
    dispatch({
      type: GLOBALTYPES.GET_ALL_SERVICE,
      payload: serviceResponse.data,
    });

    const examinationResponse = await api.getAllExamination();
    dispatch({
      type: GLOBALTYPES.GET_ALL_EXAMINATION,
      payload: examinationResponse.data,
    });

    dispatch({
      type: GLOBALTYPES.END_LOADING_CALL_API,
    });
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.END_LOADING_CALL_API,
    });
  }
};

export const callAPIForPatientSide = () => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.START_LOADING_CALL_API,
    });

    const patientResponse = await api.getAllPatient();
    dispatch({
      type: GLOBALTYPES.GET_ALL_PATIENT,
      payload: patientResponse.data,
    });

    dispatch({
      type: GLOBALTYPES.END_LOADING_CALL_API,
    });
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.END_LOADING_CALL_API,
    });
  }
};

export const callAPIForScheduleSide = (data) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.START_LOADING_CALL_API,
    });
    const medicalLetterResponse = await api.getMedicalLettersByDate(data);

    dispatch({
      type: GLOBALTYPES.GET_ALL_MEDICAL_LETTER,
      payload: medicalLetterResponse.data,
    });

    dispatch({
      type: GLOBALTYPES.END_LOADING_CALL_API,
    });
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.END_LOADING_CALL_API,
    });
  }
};

export const callAPIForMedicalExaminationSide = () => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.START_LOADING_CALL_API,
    });

    const examinationResponse = await api.getAllExamination();
    dispatch({
      type: GLOBALTYPES.GET_ALL_EXAMINATION,
      payload: examinationResponse.data,
    });

    dispatch({
      type: GLOBALTYPES.END_LOADING_CALL_API,
    });
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.END_LOADING_CALL_API,
    });
  }
};

export const callAPIForProductSide = () => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.START_LOADING_CALL_API,
    });

    const productResponse = await api.getAllProduct();
    dispatch({
      type: GLOBALTYPES.GET_ALL_PRODUCT,
      payload: productResponse.data,
    });

    dispatch({
      type: GLOBALTYPES.END_LOADING_CALL_API,
    });
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.END_LOADING_CALL_API,
    });
  }
};

