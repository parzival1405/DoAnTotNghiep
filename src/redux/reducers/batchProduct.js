import { GLOBALTYPES } from "../actionType";

const initState = {
  batchProducts: [],
  newAddProducts: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case GLOBALTYPES.ADD_BATCH_DRUG:
      return {
        ...state,
        batchProducts: [action.payload, ...state.batchProducts],
      };
    case GLOBALTYPES.ADD_DRUG_BY_ANOTHER_MODAL:
      return {
        ...state,
        newAddProducts: [
          { ...action.payload.data, type: action.payload.type },
          ...state.newAddProducts,
        ],
      };
    case GLOBALTYPES.RESPONSE_NEW_PRODUCT:
      return {
        ...state,
        newAddProducts: state.newAddProducts.map((item) =>
          item.id == action.payload.oldId ? action.payload.data : item
        ),
      };
    case GLOBALTYPES.ADD_NEW_PRODUCT_TO_BATCH:
      return {
        ...state,
        newAddProducts: [action.payload, ...state.newAddProducts],
      };
    case GLOBALTYPES.UPDATE_NEW_PRODUCT_IN_BATCH:
      return {
        ...state,
        newAddProducts: state.newAddProducts.map((item) =>
          item.id == action.payload.id ? {
            ...item,
            quantity: action.payload.quantity,
            unit: action.payload.unit,
            price: parseInt(action.payload.price),
          } : item
        ),
      };

    case GLOBALTYPES.REMOVE_NEW_PRODUCT_IN_BATCH:
      return {
        ...state,
        newAddProducts: state.newAddProducts.filter(
          (product) => product.id != action.payload.id
        ),
      };

    case GLOBALTYPES.GET_ALL_BATCH_DRUG:
      return {
        ...state,
        batchProducts: action.payload,
      };

    default:
      return state;
  }
};
