import { GLOBALTYPES } from "../actionType";
const initState = {
  products: [],
  category: [],
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
        products: [action.payload,...state.products],
      };
    case GLOBALTYPES.UPDATE_DRUGS:
      return {
        ...state,
        products: state.products.map((item) =>
          item.id == action.payload.id ? action.payload : item
        ),
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
    case GLOBALTYPES.UPDATE_CATEGORY:
      return {
        ...state,
        category: state.category.map((item) =>
          item.id == action.payload.id ? action.payload : item
        ),
      };
    case GLOBALTYPES.CLEAR:
      return initState;

    default:
      return state;
  }
};
