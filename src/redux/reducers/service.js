import { GLOBALTYPES } from "../actionType";
const initState = {
  services: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case GLOBALTYPES.GET_ALL_SERVICE:
      return {
        ...state,
        services: action.payload,
      };
    case GLOBALTYPES.CLEAR:
      return initState;

    default:
      return state;
  }
};
