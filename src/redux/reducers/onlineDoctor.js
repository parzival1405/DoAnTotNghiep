import { GLOBALTYPES } from "../actionType";

const initialState = {
  numberOfDoctorOnline: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GLOBALTYPES.ONLINE_DOCTOR:
      return {
        numberOfOnline: action.payload,
      };
    default:
      return state;
  }
};
