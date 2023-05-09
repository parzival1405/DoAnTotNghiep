import { GLOBALTYPES } from "../../actionType";
import { itemMap } from "../../../utils/Items";
import { getHistoryMedicalExaminationByIdPatient } from "../../../api";
import { setField } from "../../../utils/Calc";
const initState = {
  currentPatient: null,
  historyMedicalExamination: [],
  clinicalService: [],
  historyMedicine: [],
  addOrDelete: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case GLOBALTYPES.CLEAR_CURRENT_PATIENT:
      return initState;
    case GLOBALTYPES.CURRENT_PATIENT:
      return {
        ...state,
        currentPatient: action.payload,
        // clinicalService: action.payload.medicalExaminationDetailsResponses,
      };
    case GLOBALTYPES.UPDATE_DONE_SERVICE_CLS:
      console.log(state.clinicalService)
      return {
        ...state,
        clinicalService: state.clinicalService.map((item) =>
          item.id === action.payload.data.id
            ? action.payload.data
            : item
        )
      };
    // update field
    case GLOBALTYPES.UPDATE_FIELD_CURRENT_PATIENT:
      const inf = state.currentPatient;
      setField(action.payload.fieldName, action.payload.fieldData, inf);
      return {
        ...state,
        currentPatient: inf,
      };
    // get
    case GLOBALTYPES.HISTORY_MEDICINE_OF_SERVICE:
      return {
        ...state,
        historyMedicine: action.payload,
      };
    // history medical examination
    case GLOBALTYPES.HISTORY_MEDICAL_EXAMINATION:
      return {
        ...state,
        historyMedicalExamination: action.payload,
      };
    // add clinical service
    case GLOBALTYPES.ALL_CLINICAL_SERVICE_CURRENT_PATIENT:
      return {
        ...state,
        clinicalService: action.payload,
      };
    case GLOBALTYPES.ADD_PATIENT_CLINICAL_SERVICE:
      const clinicalService = state.clinicalService;
      const finder = clinicalService.find(
        (e) => e.service.id == action.payload.service.id
      );
      if (!finder) {
        return {
          ...state,
          clinicalService: [action.payload, ...state.clinicalService],
          addOrDelete: [
            {
              serviceId: action.payload.service.id,
              type: "add",
              status: "DOING",
            },
            ...state.addOrDelete,
          ],
        };
      } else {
        return {
          ...state,
        };
      }
    // remove clinical service
    case GLOBALTYPES.REMOVE_PATIENT_CLINICAL_SERVICE:
      const addOrDelete = state.addOrDelete;
      const finder2 = addOrDelete.find(
        (e) => e.serviceId == action.payload.service.id
      );

      if (!finder2) {
        return {
          ...state,
          clinicalService: state.clinicalService.filter(
            (service) => service.service.id !== action.payload.service.id
          ),
          addOrDelete: [
            { serviceId: action.payload.service.id, type: "delete" },
            ...state.addOrDelete,
          ],
        };
      } else {
        if (finder2.type == "add") {
          return {
            ...state,
            clinicalService: state.clinicalService.filter(
              (service) => service.service.id !== action.payload.service.id
            ),
            addOrDelete: state.addOrDelete.filter(
              (service) => service.serviceId != finder2.serviceId
            ),
          };
        }
        break;
      }

    case GLOBALTYPES.CLEAR_SERVICE_AND_DRUG: {
      return {
        ...state,
        addOrDelete: [],
      };
    }

    case GLOBALTYPES.UPDATE_DATA_CURRENT_EXAMINATION:
      const newDataExamination = action.payload;
      return {
        ...state,
        currentPatient: newDataExamination,
      };
    // add
    default:
      return state;
  }
};
