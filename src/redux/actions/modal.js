import { GLOBALTYPES } from "../actionType";

export const ShowOTP = () => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.SHOW_OTP_MODAL,
    });
  } catch (err) {
    
  }
};

export const ShowPatientReception = () => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.SHOW_PATIENT_RECEPTION_MODAL,
    });
  } catch (err) {
    
  }
};

export const ShowAddScheduleModal = () => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.SHOW_ADD_SCHEDULE_MODAL,
    });
  } catch (err) {
    
  }
}

export const hideModal = (modal) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.HIDE_MODAL,
      payload: modal,
    });
  } catch (err) {}
};
