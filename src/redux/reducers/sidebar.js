
import { GLOBALTYPES } from "../actionType";
import {itemMap} from "../../components/Drawer/Items"
const initState = {
  IDSelected: null,
  IDParent: null,
  ParentWithSelectedChild : null
};

export default (state = initState, action) => {
  switch (action.type) {
    case GLOBALTYPES.PARENT:
      return {
        ...state,
        IDParent: action.payload,
      };
    case GLOBALTYPES.CHILD:
      const IDParent = itemMap.get(action.payload)

      return {
        ...state,
        IDSelected: action.payload,
        ParentWithSelectedChild : IDParent
      };
    case GLOBALTYPES.HIDE_PARENT:
      return {
        ...state,
        IDParent: null,
      };
    default:
      return state;
  }
};
