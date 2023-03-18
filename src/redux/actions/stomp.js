import { GLOBALTYPES } from "../actionType";

export const initStomp = (client) => async (dispatch) => {
  try {
    dispatch({
      type:GLOBALTYPES.INIT_STOMP,
      payload:client
    });
  } catch (err) {}
};
