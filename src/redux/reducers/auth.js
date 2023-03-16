import { GLOBALTYPES } from "../actionType";

const initState = {
  user:null
};

export default (state = initState, action) => {
  switch (action.type) {
    case GLOBALTYPES.AUTH:
      return {
        ...state,
        user:action.payload,
      };
    case GLOBALTYPES.LOGOUT:
      return initState;
    default:
      return state;
  }
};
