import * as api from "../../api";
import { GLOBALTYPES } from "../actionType";

export const getAllStaff = () => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.START_LOADING,
    });
    const staffResponse = await api.getAllUser();
    dispatch({
      type: GLOBALTYPES.GET_ALL_STAFF,
      payload: staffResponse.data,
    });
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.END_LOADING,
    });
    alert(error.response.data.message);
  }
};

export const getAllDoctor= () => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.START_LOADING,
    });
    const staffResponse = await api.getAllStaffByRole("DOCTOR");
    dispatch({
      type: GLOBALTYPES.GET_ALL_DOCTOR,
      payload: staffResponse.data,
    });
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.END_LOADING,
    });
    alert(error.response.data.message);
  }
};