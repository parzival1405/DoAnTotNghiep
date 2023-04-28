import { GLOBALTYPES } from "../actionType";
const initState = {
  servicesAvailable: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case GLOBALTYPES.GET_ALL_SERVICE_AVAILABLE:
      return {
        ...state,
        servicesAvailable: action.payload,
      };
    case GLOBALTYPES.ADD_ARRAY_SERVICE_AVAILABLE:
      return {
        ...state,
        servicesAvailable: [...action.payload, ...state.servicesAvailable],
      };
    case GLOBALTYPES.UPDATE_ARRAY_SERVICE_AVAILABLE:
      return {
        ...state,
        servicesAvailable: state.servicesAvailable.map((item) =>
          item.id === action.payload.id
            ? { ...item, 
              result: action.payload.result,
              status:  action.payload.status,
              images : action.payload.image
            }
            : item
        ),
      };

    default:
      return state;
  }
};
