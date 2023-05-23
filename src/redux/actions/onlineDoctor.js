import { GLOBALTYPES } from "../actionType";
const qs = require("qs");

export const haveNewMedicalExamination = (client) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.START_LOADING,
    });
  } catch (error) {
    callback(error)
  }
};
