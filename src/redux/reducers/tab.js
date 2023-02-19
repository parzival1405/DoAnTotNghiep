import { GLOBALTYPES } from "../actionType";
import { itemMap } from "../../utils/Items";
const initState = {
  examinationInformation: false,
  clinicalService: false,
  examinationHistory: false,
  prescription: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case GLOBALTYPES.EXAMINATION_INFORMATION:
      return {
        ...state,
        examinationInformation: true,
      };
    case GLOBALTYPES.CLINICAL_SERVICE:
      return {
        ...state,
        clinicalService: true,
      };
    case GLOBALTYPES.EXAMINATION_HISTORY:
      return {
        ...state,
        examinationHistory: true,
      };
    case GLOBALTYPES.PRESCRIPTION:
      return {
        ...state,
        prescription: true,
      };
    default:
      return state;
  }
};
