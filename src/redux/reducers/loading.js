import { GLOBALTYPES } from "../actionType";

const initState = {
  isLoading: false,
  isLoadingCallApi:false
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
      case GLOBALTYPES.START_LOADING_CALL_API:
      return {
        isLoadingCallApi: true,
      };
    case GLOBALTYPES.END_LOADING_CALL_API:
      return {
        isLoadingCallApi: false,
      };
    default:
      return state;
  }
};
