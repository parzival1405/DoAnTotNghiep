import * as api from "../../api";
import { GLOBALTYPES } from "../actionType";
const qs = require('qs');

export const getAllPatient = () => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.START_LOADING_CALL_API,
    });
    const {data} = await api.getAllPatient();
    dispatch({
      type:GLOBALTYPES.GET_ALL_PATIENT,
      payload:data
    });
    dispatch({
      type: GLOBALTYPES.END_LOADING_CALL_API,
    });
  } catch (err) {
    console.log(err)
  }
};

export const updatePatient = (formData) => async (dispatch) => {
  try {
    const {data} = await api.updatePatient(formData);
    dispatch({
      type:GLOBALTYPES.UPDATE_PATIENT,
      payload:data
    });
  } catch (err) {
    console.log(err)
  }
};