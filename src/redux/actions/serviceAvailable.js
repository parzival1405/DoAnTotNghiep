import * as api from "../../api";
import { GLOBALTYPES } from "../actionType";

export const getAllServiceAvailable = () => async (dispatch) => {
  try {
    const { data } = await api.getAllService();
    dispatch({
      type: GLOBALTYPES.GET_ALL_SERVICE_AVAILABLE,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateServiceAvailable = (formData) => async (dispatch) => {
    try {
    //   const { data } = await api.getAllService(formData);
    //   dispatch({
    //     type: GLOBALTYPES.GET_ALL_SERVICE,
    //     payload: data,
    //   });
    } catch (err) {
      console.log(err);
    }
  };