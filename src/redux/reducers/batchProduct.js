import { GLOBALTYPES } from "../actionType";

const initState = {
  batchProducts: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case GLOBALTYPES.ADD_BATCH_DRUG:
      return {
        ...state,
        batchProducts: [action.payload, ...state.batchProducts],
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
