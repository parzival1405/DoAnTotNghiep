import { GLOBALTYPES } from "../actionType";
const initState = {
  medicalExaminations: null,
  medicalExaminationsDoctorData: null,
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
        medicalExaminations: [action.payload, ...state.medicalExaminations],
      };

    case GLOBALTYPES.DOCTOR_RECEIVE_EXAMINATION:
      return {
        ...state,
        medicalExaminationsDoctorData:
          state.medicalExaminationsDoctorData == null
            ? [action.payload]
            : [action.payload, ...state.medicalExaminationsDoctorData],
      };
    case GLOBALTYPES.CLEAR:
      return initState;

    default:
      return state;
  }
};
