import { GLOBALTYPES } from "../actionType";
const initState = {
  servicesAvailable: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case GLOBALTYPES.GET_ALL_SERVICE_AVAILABLE:
      return {
        ...state,
        servicesAvailable: action.payload,
      };
    default:
      return state;
  }
};
