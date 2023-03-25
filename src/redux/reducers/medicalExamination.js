import { GLOBALTYPES } from "../actionType";
const initState = {
  medicalExaminations: [],
  medicalExaminationsDoctorData: [],
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
      console.log(state.medicalExaminationsDoctorData);
      return {
        ...state,
        medicalExaminationsDoctorData:
          state.medicalExaminationsDoctorData.length == 0
            ? [action.payload]
            : [action.payload, ...state.medicalExaminationsDoctorData],
      };
    case GLOBALTYPES.CLEAR:
      return initState;

    default:
      return state;
  }
};
