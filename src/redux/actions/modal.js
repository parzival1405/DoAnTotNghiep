import { GLOBALTYPES } from "../actionType";
import * as api from "../../api";


export const ShowReadQRCodeModal = () => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.SHOW_READ_QR_CODE,
    });
  } catch (err) {}
};

export const ShowOTP = () => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.SHOW_OTP_MODAL,
    });
  } catch (err) {}
};

export const ShowPermissionModal = (typeOpen,item) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.SHOW_PERMISSION_MODAL,
      payload: { type: typeOpen, data: item },
    });
  } catch (err) {}
};

export const ShowPatientModal = (typeOpen, item) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.SHOW_PATIENT_MODAL,
      payload: { type: typeOpen, data: item },
    });
  } catch (err) {}
};

export const ShowAddProductGroupsModal = (typeOpen,item) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.SHOW_ADD_PRODUCT_GROUPS_MODAL,
      payload: { type: typeOpen, data: item },
    });
  } catch (err) {}
};

export const ShowPatientReception = (typeOpen, item) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.SHOW_PATIENT_RECEPTION_MODAL,
      payload: { type: typeOpen, data: item },
    });
  } catch (err) {}
};

export const ShowAddScheduleModal = (typeOpen, item) => async (dispatch) => {
  try {
    const serviceResponse = await api.getAllService();
    dispatch({
      type: GLOBALTYPES.GET_ALL_SERVICE,
      payload: serviceResponse.data,
    });

    const doctorResponse = await api.getAllStaffByRole("DOCTOR");
    dispatch({
      type: GLOBALTYPES.GET_ALL_DOCTOR,
      payload: doctorResponse.data,
    });

    dispatch({
      type: GLOBALTYPES.SHOW_ADD_SCHEDULE_MODAL,
      payload: { type: typeOpen, data: item },
    });
  } catch (err) {}
};

export const ShowAddBatchProductModal = (typeOpen,item) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.SHOW_ADD_BATCH_PRODUCT_MODAL,
      payload: { type: typeOpen, data: item },
    });
  } catch (err) {}
};

export const ShowAddSupplierModal = (typeOpen,item) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.SHOW_ADD_SUPPLIER_MODAL,
      payload: { type: typeOpen, data: item },
    });
  } catch (err) {}
};
export const ShowAddServiceModal = (typeOpen,item) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.SHOW_ADD_SERVICE_MODAL,
      payload: { type: typeOpen, data: item },
    });
  } catch (err) {}
};

export const ShowAddTypeServiceModal = (typeOpen,item) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.SHOW_ADD_TYPE_SERVICE_GROUPS_MODAL,
      payload: { type: typeOpen, data: item },
    });
  } catch (err) {}
};

export const ShowAddDrugModal = (typeOpen,item) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.SHOW_ADD_DRUG_MODAL,
      payload: { type: typeOpen, data: item },
    });
  } catch (err) {}
};

export const ShowUpdateServiceCLSModal = (typeOpen,item) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.SHOW_UPDATE_SERVICE_CLS_MODAL,
      payload: { type: typeOpen, data: item },
    });
  } catch (err) {}
};

export const ShowServicePaymentModal = (typeOpen,item) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.SHOW_SERVICE_PAYMENT_MODAL,
      payload: { type: typeOpen, data: item },
    });
  } catch (err) {}
};

export const ShowAddPrescriptionModal = (typeOpen,item) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.SHOW_ADD_PRESCRIPTION_MODAL,
      payload: { type: typeOpen, data: item },
    });
  } catch (err) {}
};

export const ShowAddAccountStaffModal = (typeOpen) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.SHOW_ADD_ACCOUNT_STAFF_MODAL,
      payload: typeOpen,
    });
  } catch (err) {}
};

export const ShowDetailedMedicalHistoryModal = (typeOpen,item) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.SHOW_DETAIL_MEDICAL_HISTORY,
      payload: { type: typeOpen, data: item },
    });
  } catch (err) {}
};

export const hideModal = (modal) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.HIDE_MODAL,
      payload: modal,
    });
  } catch (err) {}
};

