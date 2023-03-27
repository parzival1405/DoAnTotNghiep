import { GLOBALTYPES } from "../actionType";
import { itemMap } from "../../utils/Items";
import { getHistoryMedicalExaminationByIdPatient } from "../../api";
import { setField } from "../../utils/Calc";
const initState = {
  currentPatient: null,
  historyMedicalExamination: [],
  clinicalService: [],
  historyMedicine: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case GLOBALTYPES.CURRENT_PATIENT:
      return {
        ...state,
        currentPatient: action.payload,
      };
    case GLOBALTYPES.UPDATE_CURRENT_PATIENT:
      const inf = state.currentPatient;
      setField(action.payload.fieldName, action.payload.fieldData, inf);
      return {
        ...state,
        currentPatient: inf,
      };
    case GLOBALTYPES.HISTORY_MEDICINE_OF_SERVICE:
      return {
        ...state,
        historyMedicine: action.payload,
      };
    case GLOBALTYPES.HISTORY_MEDICAL_EXAMINATION:
      return {
        ...state,
        historyMedicalExamination: action.payload,
      };

    case GLOBALTYPES.ADD_PATIENT_CLINICAL_SERVICE:
      return {
        ...state,
        clinicalService: [action.payload, ...state.clinicalService],
      };
    case GLOBALTYPES.REMOVE_PATIENT_CLINICAL_SERVICE:
      return {
        ...state,
        clinicalService: state.clinicalService.filter(
          (service) => service.id !== action.payload.id
        ),
      };
    case GLOBALTYPES.UPDATE_DATA_CURRENT_EXAMINATION:
      const newDataExamination = action.payload;
      return {
        ...state,
        currentPatient: newDataExamination
      };

    default:
      return state;
  }
};
