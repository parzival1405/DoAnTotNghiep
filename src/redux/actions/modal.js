import { GLOBALTYPES } from "../actionType";
import * as api from "../../api";
export const ShowOTP = () => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.SHOW_OTP_MODAL,
    });
  } catch (err) {}
};

export const ShowPermissionModal = (typeOpen) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.SHOW_PERMISSION_MODAL,
      payload: typeOpen,
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

export const ShowAddProductGroupsModal = (typeOpen) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.SHOW_ADD_PRODUCT_GROUPS_MODAL,
      payload: typeOpen,
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
    dispatch({
      type: GLOBALTYPES.SHOW_ADD_SCHEDULE_MODAL,
      payload: { type: typeOpen, data: item },
    });
  } catch (err) {}
};

export const ShowAddProductModal = (typeOpen) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.SHOW_ADD_PRODUCT_MODAL,
      payload: typeOpen,
    });
  } catch (err) {}
};

export const ShowAddSupplierModal = (typeOpen) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.SHOW_ADD_SUPPLIER_MODAL,
      payload: typeOpen,
    });
  } catch (err) {}
};
export const ShowAddServiceGroupsModal = (typeOpen) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.SHOW_ADD_SERVICE_GROUPS_MODAL,
      payload: typeOpen,
    });
  } catch (err) {}
};

export const ShowAddTypeServiceGroupsModal = (typeOpen) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.SHOW_ADD_TYPE_SERVICE_GROUPS_MODAL,
      payload: typeOpen,
    });
  } catch (err) {}
};

export const ShowAddDrugModal = (typeOpen) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.SHOW_ADD_DRUG_MODAL,
      payload: typeOpen,
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

export const hideModal = (modal) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.HIDE_MODAL,
      payload: modal,
    });
  } catch (err) {}
};
