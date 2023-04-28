import { GLOBALTYPES } from "../actionType";
const initState = {
  prescription: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case GLOBALTYPES.ADD_PRESCRIPTION:
      return {
        ...state,
        prescription: [action.payload,...state.prescription],
      };
      default:
        return state;
    }
}

