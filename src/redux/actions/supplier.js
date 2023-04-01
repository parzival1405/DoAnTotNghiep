import * as api from "../../api";
import { GLOBALTYPES } from "../actionType";

export const getAllSupplier = () => async (dispatch) => {
  try {
    const { data } = await api.getAllSupplier();
    dispatch({
      type: GLOBALTYPES.GET_ALL_SUPPLIER,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const saveSupplier = (formData) => async (dispatch) => {
    try {
      const { data } = await api.saveSupplier(formData);
      dispatch({
        type: GLOBALTYPES.ADD_SUPPLIER,
        payload: data,
      });
    } catch (err) {
      console.log(err);
    }
  };