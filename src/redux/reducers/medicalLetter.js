import { GLOBALTYPES } from "../actionType";

const initState = {
  medicalLetters: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case GLOBALTYPES.GET_ALL_MEDICAL_LETTER:
      return {
        ...state,
        medicalLetters: action.payload,
      };
    case GLOBALTYPES.ADD_MEDICAL_LETTER:
      return {
        ...state,
        medicalLetters: [action.payload, ...state.medicalLetters],
      };
    case GLOBALTYPES.UPDATE_MEDICAL_LETTER:
      return {
        ...state,
        medicalLetters: state.medicalLetters.map((letter) =>
        letter.id == action.payload.id ? action.payload : letter
      ),
      };

    case GLOBALTYPES.CLEAR:
      return initState;

    default:
      return state;
  }
};
