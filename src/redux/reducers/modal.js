import { GLOBALTYPES } from "../actionType";

export default function modalReducers(
  state = {
    isShowOTP: false,
  },
  action
) {
  switch (action.type) {
    case GLOBALTYPES.SHOW_OTP_MODAL:
      return {
        ...state,
        isShowOTP: true,
      };
    default:
      return state;
    case GLOBALTYPES.HIDE_MODAL:
      let modal = action.payload;
      state[modal] = false;
      return {
        ...state,
      };
  }
}
