import { GLOBALTYPES } from "../actionType";
const initState = {
  services: [],
  departmentServices: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case GLOBALTYPES.GET_ALL_SERVICE:
      return {
        ...state,
        services: action.payload,
      };
    case GLOBALTYPES.GET_ALL_DEPARTMENT_SERVICE:
      return {
        ...state,
        departmentServices: action.payload,
      };
    case GLOBALTYPES.ADD_DEPARTMENT_SERVICE:
      return {
        ...state,
        departmentServices: [action.payload,...state.departmentServices],
      };
      case GLOBALTYPES.UPDATE_SERVICE:
      return {
        ...state,
        services: state.services.map((item) => item.id === action.payload.id ? action.payload : item),
      };
      
    case GLOBALTYPES.CLEAR:
      return initState;
    default:
      return state;
  }
};
