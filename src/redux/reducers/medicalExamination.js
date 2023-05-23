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
      case GLOBALTYPES.ALL_EXAMINATION_ROLE_DOCTOR:
        return {
          ...state,
          medicalExaminationsDoctorData: action.payload,
        };
    case GLOBALTYPES.DOCTOR_RECEIVE_EXAMINATION:
      return {
        ...state,
        medicalExaminationsDoctorData: [...state.medicalExaminationsDoctorData,action.payload],
      };
    case GLOBALTYPES.UPDATE_DATA_CURRENT_EXAMINATION:
      const newDataExamination = action.payload;
      return {
        ...state,
        medicalExaminationsDoctorData: state.medicalExaminationsDoctorData.map((ex) =>
          ex.id == newDataExamination.id ? newDataExamination : ex
        ),
      };
    case GLOBALTYPES.CLEAR:
      return initState;

    default:
      return state;
  }
};
