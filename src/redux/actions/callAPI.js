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

export const callAPIForMedicalExaminationSide = (room) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.START_LOADING_CALL_API,
    });

    // const data = {
    //   date:"currentDate",
    //   room:room
    // }

    // const examinationResponse = await api.getExaminationsCurrentDayAndRoom(data);
    // fake
    const examinationResponse = await api.getAllExamination();
    //
    dispatch({
      type: GLOBALTYPES.DOCTOR_RECEIVE_EXAMINATION,
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

    const categoryResponse = await api.getAllCategoryDrugs();

    dispatch({
      type: GLOBALTYPES.ALL_CATEGORY,
      payload: categoryResponse.data,
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

export const getCategoryProductExamination = () => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.START_LOADING_CALL_API,
    });

    const categoryResponse = await api.getAllCategoryDrugs();

    dispatch({
      type: GLOBALTYPES.ALL_CATEGORY,
      payload: categoryResponse.data,
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

export const callAPIForServiceListSide = () => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.START_LOADING_CALL_API,
    });

    const serviceResponse = await api.getAllService();
    dispatch({
      type: GLOBALTYPES.GET_ALL_SERVICE,
      payload: serviceResponse.data,
    });

    const serviceDepartmentResponse = await api.getAllMedicalDepartment();
    dispatch({
      type: GLOBALTYPES.GET_ALL_DEPARTMENT_SERVICE,
      payload: serviceDepartmentResponse.data,
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

export const callAPIForAddSupplierSide = () => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.START_LOADING_CALL_API,
    });

    const supplierResponse = await api.getAllSupplier();
    dispatch({
      type: GLOBALTYPES.GET_ALL_SUPPLIER,
      payload: supplierResponse.data,
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

export const callAPIForAddProductSide = () => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.START_LOADING_CALL_API,
    });

    const supplierResponse = await api.getAllSupplier();
    dispatch({
      type: GLOBALTYPES.GET_ALL_SUPPLIER,
      payload: supplierResponse.data,
    });

    const productResponse = await api.getAllProduct();
    dispatch({
      type: GLOBALTYPES.GET_ALL_PRODUCT,
      payload: productResponse.data,
    });

    const categoryResponse = await api.getAllCategoryDrugs();

    dispatch({
      type: GLOBALTYPES.ALL_CATEGORY,
      payload: categoryResponse.data,
    });

    const batchDrugsResponse = await api.getAllBatchDrugs();

    dispatch({
      type: GLOBALTYPES.GET_ALL_BATCH_DRUG,
      payload: batchDrugsResponse.data,
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



