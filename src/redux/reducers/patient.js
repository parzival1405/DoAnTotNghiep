import { GLOBALTYPES } from "../actionType";
import { itemMap } from "../../utils/Items";
const initState = {
  currentPatient : null
};

export default (state = initState, action) => {
  switch (action.type) {
    case GLOBALTYPES.CURRENT_PATIENT:
      return {
        ...state,
        currentPatient: action.payload,
      };
    default:
      return state;
  }
};
