import { GLOBALTYPES } from "../actionType";

const initState = {
  isLoading: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case GLOBALTYPES.START_LOADING:
      return {
        isLoading: true,
      };
    case GLOBALTYPES.END_LOADING:
      return {
        isLoading: false,
      };
    default:
      return state;
  }
};
