import * as api from "../../api";
import { GLOBALTYPES } from "../actionType";
const qs = require("qs");

export const getAllService = () => async (dispatch) => {
  try {
    const { data } = await api.getAllService();
    dispatch({
      type: GLOBALTYPES.GET_ALL_SERVICE,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getServiceById = (id) => async (dispatch) => {
  try {
    const { data } = await api.getServiceById(id);
    dispatch({
      type: GLOBALTYPES.GET_ALL_SERVICE,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const saveService = (formData) => async (dispatch) => {
  try {
    const { data } = await api.saveService(formData);
    dispatch({
      type: GLOBALTYPES.GET_ALL_SERVICE,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};