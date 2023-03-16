import { GLOBALTYPES } from "../actionType";
const initState = {
  medicalExaminations: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case GLOBALTYPES.GET_ALL_EXAMINATION:
      return {
        ...state,
        medicalExaminations: action.payload,
      };
    case GLOBALTYPES.ADD_EXAMINATION:
      return {
        ...state,
        medicalExaminations: [action.payload,...state.medicalExaminations],
      }
    case GLOBALTYPES.CLEAR:
      return initState;

    default:
      return state;
  }
};
