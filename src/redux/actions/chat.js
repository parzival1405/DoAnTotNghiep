import { GLOBALTYPES } from "../actionType";

export const ChangeConversation = (item) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.CHANGE_CONVERSATION,
      payload: item
    });
  } catch (error) {
  }
};
