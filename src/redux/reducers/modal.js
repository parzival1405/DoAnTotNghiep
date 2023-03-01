import { GLOBALTYPES } from "../actionType";

export default function modalReducers(
  state = {
    isShowOTP: false,
    isShowPatientReceptionModal: false,
    isShowAddScheduleModal: false,
    isShowAddProductModal: false,
    isShowAddSupplierModal: false,
    isShowAddDrugModal: false,
  },
  action
) {
  switch (action.type) {
    case GLOBALTYPES.SHOW_OTP_MODAL:
      return {
        ...state,
        isShowOTP: true,
      };
    case GLOBALTYPES.SHOW_ADD_SUPPLIER_MODAL:
      return {
        ...state,
        isShowAddSupplierModal: true,
      };
      case GLOBALTYPES.SHOW_ADD_DRUG_MODAL:
      return {
        ...state,
        isShowAddDrugModal: true,
      };
    case GLOBALTYPES.SHOW_PATIENT_RECEPTION_MODAL:
      return {
        ...state,
        isShowPatientReceptionModal: true,
      };
    case GLOBALTYPES.SHOW_ADD_SCHEDULE_MODAL:
      return {
        ...state,
        isShowAddScheduleModal: true,
      };
    case GLOBALTYPES.SHOW_ADD_PRODUCT_MODAL:
      return {
        ...state,
        isShowAddProductModal: true,
      };
    default:
      return state;
    case GLOBALTYPES.HIDE_MODAL:
      let modal = action.payload;
      state[modal] = false;
      return {
        ...state,
      };
  }
}
