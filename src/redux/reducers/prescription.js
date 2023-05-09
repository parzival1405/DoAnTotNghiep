import { GLOBALTYPES } from "../actionType";
const initState = {
  prescription: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case GLOBALTYPES.ADD_PRESCRIPTION:
      let find = state.prescription.find(
        (item) => item.id === action.payload.id
      );
      if (find) {
        return {
          ...state,
          prescription: state.prescription.filter((item) =>
            item.id === action.payload.id ? action.payload : item
          ),
        };
      } else {
        return {
          ...state,
          prescription: [action.payload, ...state.prescription],
        };
      }
    case GLOBALTYPES.ALL_UNPAID_PRESCRIPTION:
      return {
        ...state,
        prescription: action.payload,
      };
    case GLOBALTYPES.UPDATE_PAID_PRESCRIPTION:
      return {
        ...state,
        prescription: state.prescription.filter((item) =>
          item.id === action.payload
            ? { ...item, status: "Đã thanh toán" }
            : item
        ),
      };
    default:
      return state;
  }
};
