import { GLOBALTYPES } from "../actionType";

const initState = {
  client:null
};

export default (state = initState, action) => {
  switch (action.type) {
    case GLOBALTYPES.INIT_STOMP:
      return {
        ...state,
        client:action.payload,
      };
    default:
      return state;
  }
};
