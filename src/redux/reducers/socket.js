import { GLOBALTYPES } from "../actionType";

const initState = {
  socket : null
}

export default (state = initState, action) => {
  switch (action.type) {
    case GLOBALTYPES.ADD_SOCKET:
        return action.payload;
    default:
      return state;
  }
};