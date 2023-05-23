import { GLOBALTYPES } from "../actionType";

const initialState = {
  numberOfPending: 0,
  numberOfDoctorOnline: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GLOBALTYPES.ONLINE_DOCTOR:
      return {
        ...state,
        numberOfDoctorOnline: action.payload,
      };
    case GLOBALTYPES.ALL_MEDICAL_EXAMINATION_PENDING:
      return {
        ...state,
        numberOfPending: action.payload,
      };
    case GLOBALTYPES.ADD_ONE_MEDICAL_EXAMINATION_PENDING:
      console.log(state.numberOfPending + 1)
      return {
        ...state,
        numberOfPending: state.numberOfPending + 1,
      };
    default:
      return state;
  }
};
