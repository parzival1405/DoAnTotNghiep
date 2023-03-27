import { GLOBALTYPES } from "../actionType";
const initState = {
  products: null,
  category: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case GLOBALTYPES.GET_ALL_PRODUCT:
      return {
        ...state,
        products: action.payload,
      };
    case GLOBALTYPES.ADD_DRUGS:
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case GLOBALTYPES.ALL_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };
    case GLOBALTYPES.ADD_CATEGORY:
      return {
        ...state,
        category: [...state.category, action.payload],
      };

    case GLOBALTYPES.CLEAR:
      return initState;

    default:
      return state;
  }
};
