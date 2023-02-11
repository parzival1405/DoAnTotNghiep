import { GLOBALTYPES } from "../actionType";

export const ShowSide = (ID) => async (dispatch) => {
  try {
    dispatch({
      type:GLOBALTYPES.CHILD,
      payload:ID
    });
  } catch (err) {}
};

export const SetParent = (ID) => async (dispatch) => {
  try {
    dispatch({
      type:GLOBALTYPES.PARENT,
      payload:ID
    });
  } catch (err) {}
};

export const HideParent = (ID) => async (dispatch) => {
  try {
    dispatch({
      type:GLOBALTYPES.HIDE_PARENT,
    });
  } catch (err) {}
};

