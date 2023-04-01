import { GLOBALTYPES } from "../actionType";
const initState = {
  suppliers: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case GLOBALTYPES.ADD_SUPPLIER:
      return {
        ...state,
        suppliers: [action.payload,...state.suppliers],
      };
      case GLOBALTYPES.GET_ALL_SUPPLIER:
      return {
        ...state,
        suppliers: action.payload
      };
    case GLOBALTYPES.CLEAR:
      return initState;
    default:
      return state;
  }
};
