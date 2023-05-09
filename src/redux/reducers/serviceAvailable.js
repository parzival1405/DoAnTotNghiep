import { GLOBALTYPES } from "../actionType";
const initState = {
  servicesAvailable: [],
  servicesAvailableUnpaid: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case GLOBALTYPES.GET_ALL_SERVICE_AVAILABLE:
      return {
        ...state,
        servicesAvailable: action.payload,
      };
    //
    case GLOBALTYPES.ADD_OR_UPDATE_ARRAY_SERVICE_AVAILABLE:
      let currentServicesAvailable = state.servicesAvailable;
      let newServicesAvailable = action.payload;
      let contain = currentServicesAvailable.filter(
        (item) => item.idMedicalExamination
      );
      let newSV = [];
      for (let i = 0; i < newServicesAvailable.length; i++) {
        let find = currentServicesAvailable.find(
          (item) =>
            item.idMedicalExamination ===
              newServicesAvailable[i].idMedicalExamination &&
            item.id === newServicesAvailable[i].id
        );
        if (!find) {
          newSV.push(newServicesAvailable[i]);
        }
      }

      return {
        ...state,
        servicesAvailable: [...newSV, ...state.servicesAvailable],
      };
    //
    case GLOBALTYPES.UPDATE_ARRAY_SERVICE_AVAILABLE:
      return {
        ...state,
        servicesAvailable: state.servicesAvailable.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                result: action.payload.result,
                status: action.payload.status,
                images: action.payload.image,
              }
            : item
        ),
      };
    //
    case GLOBALTYPES.ALL_UNPAID_SERVICE_CLS:
      return {
        ...state,
        servicesAvailableUnpaid: action.payload,
      };
    //
    case GLOBALTYPES.UNPAID_SERVICE_CLS:
      let find = state.servicesAvailableUnpaid.find(
        (item) => item.id === action.payload.id
      );
      if (find) {
        return {
          ...state,
          servicesAvailableUnpaid: state.servicesAvailableUnpaid.map(
            (item) => (item.id === action.payload.id ? action.payload : item)
          ),
        };
      } else {
        return {
          ...state,
          servicesAvailableUnpaid: [
            action.payload,
            ...state.servicesAvailableUnpaid,
          ],
        };
      }
    //
    case GLOBALTYPES.UPDATE_UNPAID_SERVICE_CLS:
      return {
        ...state,
        servicesAvailableUnpaid: state.servicesAvailableUnpaid.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    //
    default:
      return state;
  }
};
