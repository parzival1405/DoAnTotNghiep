import { GLOBALTYPES } from "../actionType";

export const ShowOTP = () => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.SHOW_OTP_MODAL,
    });
  } catch (err) {
    
  }
};

export const hideModal = (modal) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.HIDE_MODAL,
      payload: modal,
    });
  } catch (err) {}
};
