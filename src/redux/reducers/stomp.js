import { GLOBALTYPES } from "../actionType";

const initState = {
  client:null
};

export default (state = initState, action) => {
  switch (action.type) {
    case GLOBALTYPES.INIT_STOMP:
      console.log(action.payload)
      return {
        ...state,
        client:action.payload,
      };
    default:
      return state;
  }
};
