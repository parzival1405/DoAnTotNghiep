import { GLOBALTYPES } from "../actionType";

const initType = {
  open: false,
  typeOpenModal: GLOBALTYPES.ADD,
  data: null,
};

export default function modalReducers(
  state = {
    isShowOTP: initType,
    isShowPatientReceptionModal: initType,
    isShowAddScheduleModal: initType,
    isShowAddBatchProductModal: initType,
    isShowAddSupplierModal: initType,
    isShowAddDrugModal: initType,
    isShowAddAccountStaffModal: initType,
    isShowPermissionModal: initType,
    isShowPatientModal: initType,
    isShowAddProductGroupsModal: initType,
    isShowAddServiceModal: initType,
    isShowAddTypeServiceGroupsModal: initType,
  },
  action
) {
  switch (action.type) {
    case GLOBALTYPES.SHOW_ADD_ACCOUNT_STAFF_MODAL:
      return {
        ...state,
        isShowAddAccountStaffModal: {
          open: true,
          typeOpenModal: action.payload.type,
          data: action.payload.data,
        },
      };
    case GLOBALTYPES.SHOW_ADD_SERVICE_MODAL:
      return {
        ...state,
        isShowAddServiceModal: {
          open: true,
          typeOpenModal: action.payload.type,
          data: action.payload.data,
        },
      };
    case GLOBALTYPES.SHOW_ADD_TYPE_SERVICE_GROUPS_MODAL:
      return {
        ...state,
        isShowAddTypeServiceGroupsModal: {
          open: true,
          typeOpenModal: action.payload.type,
          data: action.payload.data,
        },
      };
    case GLOBALTYPES.SHOW_ADD_PRODUCT_GROUPS_MODAL:
      return {
        ...state,
        isShowAddProductGroupsModal: {
          open: true,
          typeOpenModal: action.payload.type,
          data: action.payload.data,
        },
      };
    case GLOBALTYPES.SHOW_PATIENT_MODAL:
      return {
        ...state,
        isShowPatientModal: {
          open: true,
          typeOpenModal: action.payload.type,
          data: action.payload.data,
        },
      };

    case GLOBALTYPES.SHOW_OTP_MODAL:
      return {
        ...state,
        isShowOTP: {
          open: true,
          typeOpenModal: action.payload,
        },
      };
    case GLOBALTYPES.SHOW_ADD_SUPPLIER_MODAL:
      return {
        ...state,
        isShowAddSupplierModal: {
          open: true,
          typeOpenModal: action.payload.type,
          data: action.payload.data,
        },
      };
    case GLOBALTYPES.SHOW_PERMISSION_MODAL:
      return {
        ...state,
        isShowPermissionModal: {
          open: true,
          typeOpenModal: action.payload.type,
          data: action.payload.data,
        },
      };
    case GLOBALTYPES.SHOW_ADD_DRUG_MODAL:
      return {
        ...state,
        isShowAddDrugModal: {
          open: true,
          typeOpenModal: action.payload.type,
          data: action.payload.data,
        },
      };
    case GLOBALTYPES.SHOW_PATIENT_RECEPTION_MODAL:
      return {
        ...state,
        isShowPatientReceptionModal: {
          open: true,
          typeOpenModal: action.payload.type,
          data: action.payload.data,
        },
      };
    case GLOBALTYPES.SHOW_ADD_SCHEDULE_MODAL:
      return {
        ...state,
        isShowAddScheduleModal: {
          open: true,
          typeOpenModal: action.payload.type,
          data: action.payload.data,
        },
      };
    case GLOBALTYPES.SHOW_ADD_BATCH_PRODUCT_MODAL:
      return {
        ...state,
        isShowAddBatchProductModal: {
          open: true,
          typeOpenModal: action.payload.type,
          data: action.payload.data,
        },
      };
    default:
      return state;
    case GLOBALTYPES.HIDE_MODAL:
      let modal = action.payload;
      state[modal] = initType;
      return {
        ...state,
      };
  }
}
