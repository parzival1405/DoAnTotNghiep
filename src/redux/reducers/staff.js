import { GLOBALTYPES } from "../actionType";

const initState = {
  staffs: [],
  doctors: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case GLOBALTYPES.ADD_STAFF:
      return {
        ...state,
        staffs: [action.payload, ...state.staffs],
      };
    case GLOBALTYPES.GET_ALL_STAFF:
      return {
        ...state,
        staffs: action.payload,
      };
    case GLOBALTYPES.GET_ALL_DOCTOR:
      return {
        ...state,
        doctors: action.payload,
      };
    default:
      return state;
  }
};
