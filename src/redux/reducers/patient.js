import { GLOBALTYPES } from "../actionType";
const initState = {
  patients: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case GLOBALTYPES.GET_ALL_PATIENT:
      return {
        ...state,
        patients: action.payload,
      };
    case GLOBALTYPES.CLEAR:
      return initState;

    default:
      return state;
  }
};
