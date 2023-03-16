import { GLOBALTYPES } from "../actionType";
const initState = {
  products: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case GLOBALTYPES.GET_ALL_PRODUCT:
      return {
        ...state,
        products: action.payload,
      };
    case GLOBALTYPES.CLEAR:
      return initState;

    default:
      return state;
  }
};