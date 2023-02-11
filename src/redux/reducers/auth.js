import { GLOBALTYPES } from "../actionType";

const initState = {
  user: null,
  token: null,
  notification: 0,
};

export default (state = initState, action) => {
  switch (action.type) {
    case GLOBALTYPES.AUTH:
      return action.payload;
    case GLOBALTYPES.LOGOUT:
      return action.payload;
    default:
      return state;
  }
};
