export const GLOBALTYPES = {
  //Chat
  ONLINE_DOCTOR:"ONLINE_DOCTOR",
  RECEIVE_MESSAGE:"RECEIVE_MESSAGE", 
  CHANGE_CONVERSATION:"CHANGE_CONVERSATION",
  CREATE_CONVERSATION:"CREATE_CONVERSATION",
  // patient
  UPDATE_PATIENT: "UPDATE_PATIENT",
  // prescription
  UPDATE_PAID_PRESCRIPTION:"UPDATE_PAID_PRESCRIPTION",
  ALL_UNPAID_PRESCRIPTION:"ALL_UNPAID_PRESCRIPTION",
  ADD_PRESCRIPTION: "ADD_PRESCRIPTION",
  // socket
  ADD_SOCKET: "ADD_SOCKET",
  // staff
  GET_ALL_DOCTOR: "GET_ALL_DOCTOR",
  ADD_STAFF: "ADD_STAFF",
  GET_ALL_STAFF: "GET_ALL_STAFF",
  // batch drug
  UPDATE_NEW_PRODUCT_IN_BATCH:'UPDATE_NEW_PRODUCT_IN_BATCH',
  RESPONSE_NEW_PRODUCT:"RESPONSE_NEW_PRODUCT",
  ADD_NEW_PRODUCT_TO_BATCH: "ADD_NEW_PRODUCT_TO_BATCH",
  REMOVE_NEW_PRODUCT_IN_BATCH: "REMOVE_NEW_PRODUCT_IN_BATCH",
  ADD_DRUG_BY_ANOTHER_MODAL: "ADD_DRUG_BY_ANOTHER_MODAL",
  ADD_BATCH_DRUG: "ADD_BATCH_DRUG",
  GET_ALL_BATCH_DRUG: "GET_ALL_BATCH_DRUG",
  //
  ADD_SUPPLIER: "ADD_SUPPLIER",
  GET_ALL_SUPPLIER: "GET_ALL_SUPPLIER",
  ADD_DEPARTMENT_SERVICE: "ADD_DEPARTMENT_SERVICE",
  GET_ALL_DEPARTMENT_SERVICE: "GET_ALL_DEPARTMENT_SERVICE",

  UPDATE_DRUGS: "UPDATE_DRUGS",
  ADD_DRUGS: "ADD_DRUGS",
  ALL_CATEGORY: "ALL_CATEGORY",
  ADD_CATEGORY: "ADD_CATEGORY",
  UPDATE_CATEGORY: "UPDATE_CATEGORY",

  UPDATE_DATA_CURRENT_EXAMINATION: "UPDATE_DATA_CURRENT_EXAMINATION",
  ALL_EXAMINATION_ROLE_DOCTOR: "ALL_EXAMINATION_ROLE_DOCTOR",
  DOCTOR_RECEIVE_EXAMINATION: "DOCTOR_RECEIVE_EXAMINATION",
  UPDATE_FIELD_CURRENT_PATIENT: "UPDATE_FIELD_CURRENT_PATIENT",
  GET_ALL_PRODUCT: "GET_ALL_PRODUCT",
  INIT_STOMP: "INIT_STOMP",
  HISTORY_MEDICINE_OF_SERVICE: "HISTORY_MEDICINE_OF_SERVICE",
  GET_ALL_EXAMINATION: "GET_ALL_EXAMINATION",
  ADD_EXAMINATION: "ADD_EXAMINATION",

  // letter
  GET_MEDICAL_LETTER: "GET_MEDICAL_LETTER",
  GET_ALL_MEDICAL_LETTER: "GET_ALL_MEDICAL_LETTER",
  GET_MEDICAL_LETTER_DATE: "GET_MEDICAL_LETTER_DATE",
  ADD_EXAMINATION_LETTER: "ADD_EXAMINATION_LETTER",
  ADD_MEDICAL_LETTER: "ADD_MEDICAL_LETTER",
  UPDATE_MEDICAL_LETTER: "UPDATE_MEDICAL_LETTER",
  GET_MEDICAL_LETTER_BY_ID: "GET_MEDICAL_LETTER_BY_ID",
  // service
  ALL_UNPAID_SERVICE_CLS:"ALL_UNPAID_SERVICE_CLS",
  UPDATE_UNPAID_SERVICE_CLS:"UPDATE_UNPAID_SERVICE_CLS",
  UNPAID_SERVICE_CLS:"UNPAID_SERVICE_CLS",
  UPDATE_DONE_SERVICE_CLS:"UPDATE_DONE_SERVICE_CLS",
  UPDATE_ARRAY_SERVICE_AVAILABLE:"UPDATE_ARRAY_SERVICE_AVAILABLE",
  ALL_ARRAY_SERVICE_AVAILABLE:"ALL_ARRAY_SERVICE_AVAILABLE",
  ADD_OR_UPDATE_ARRAY_SERVICE_AVAILABLE: "ADD_ARRAY_SERVICE_AVAILABLE",
  GET_ALL_SERVICE: "GET_ALL_SERVICE",
  UPDATE_SERVICE: "UPDATE_SERVICE",
  // current patient
  CLEAR_SERVICE_AND_DRUG: "CLEAR_SERVICE_AND_DRUG",
  PRESCRIPTION_CURRENT_PATIENT: "PRESCRIPTION_CURRENT_PATIENT",
  UPDATE_MEDICINE_OF_PRESCRIPTION: "UPDATE_MEDICINE_OF_PRESCRIPTION",
  REMOVE_MEDICINE_OF_PRESCRIPTION: "REMOVE_MEDICINE_OF_PRESCRIPTION",
  ADD_MEDICINE_OF_PRESCRIPTION: "ADD_MEDICINE_OF_PRESCRIPTION",
  CLEAR_CURRENT_PATIENT: "CLEAR_CURRENT_PATIENT",
  ALL_CLINICAL_SERVICE_CURRENT_PATIENT: "ALL_CLINICAL_SERVICE_CURRENT_PATIENT",
  ADD_PATIENT_CLINICAL_SERVICE: "ADD_PATIENT_CLINICAL_SERVICE",
  REMOVE_PATIENT_CLINICAL_SERVICE: "REMOVE_PATIENT_CLINICAL_SERVICE",
  GET_ALL_SERVICE_AVAILABLE: "GET_ALL_SERVICE_AVAILABLE",

  ADD: "ADD",
  DOCTOR_VIEW:'DOCTOR_VIEW',
  ADD_BY_ANOTHER_MODAL: "ADD_BY_ANOTHER_MODAL",
  EDIT: "EDIT",
  RECEIVE: "RECEIVE",
  VIEW: "VIEW",
  AUTH: "AUTH",
  LOGOUT: "LOGOUT",
  REGISTER: "REGISTER",
  ALERT: "ALERT",
  SOCKET: "SOCKET",
  ONLINE: "ONLINE",
  SHOW_OTP_MODAL: "SHOW_OTP_MODAL",
  HIDE_MODAL: "HIDE_MODAL",
  START_LOADING: "START_LOADING",
  END_LOADING: "END_LOADING",
  START_LOADING_CALL_API: "START_LOADING_CALL_API",
  END_LOADING_CALL_API: "END_LOADING_CALL_API",
  HIDE_PARENT: "HIDE_PARENT",
  PARENT: "PARENT",
  CHILD: "CHILD",
  EXAMINATION_INFORMATION: " EXAMINATION_INFORMATION",
  PRESCRIPTION: " PRESCRIPTION",
  EXAMINATION_HISTORY: " EXAMINATION_HISTORY",
  HISTORY_MEDICAL_EXAMINATION: "HISTORY_MEDICAL_EXAMINATION",
  CLINICAL_SERVICE: " CLINICAL_SERVICE",
  HIDE_TAB: "HIDE_TAB",
  CURRENT_PATIENT: "CURRENT_PATIENT",
  // modal
  SHOW_CHANGE_PASSWORD_MODAL:"SHOW_CHANGE_PASSWORD_MODAL",
  SHOW_PRIVATE_INFORMATION_MODAL:"SHOW_PRIVATE_INFORMATION_MODAL",
  SHOW_DETAIL_MEDICAL_HISTORY:"SHOW_DETAIL_MEDICAL_HISTORY",
  SHOW_SERVICE_PAYMENT_MODAL:"SHOW_SERVICE_PAYMENT_MODAL",
  SHOW_UPDATE_SERVICE_CLS_MODAL:"SHOW_UPDATE_SERVICE_CLS_MODAL",
  SHOW_ADD_PRESCRIPTION_MODAL:'SHOW_ADD_PRESCRIPTION_MODAL',
  SHOW_READ_QR_CODE: "SHOW_READ_QR_CODE",
  SHOW_PATIENT_RECEPTION_MODAL: "SHOW_PATIENT_RECEPTION_MODAL",
  SHOW_ADD_SCHEDULE_MODAL: "SHOW_ADD_SCHEDULE_MODAL",
  SHOW_ADD_BATCH_PRODUCT_MODAL: "SHOW_ADD_BATCH_PRODUCT_MODAL",
  SHOW_ADD_SUPPLIER_MODAL: "SHOW_ADD_SUPPLIER_MODAL",
  SHOW_ADD_DRUG_MODAL: "SHOW_ADD_DRUG_MODAL",
  SHOW_ADD_ACCOUNT_STAFF_MODAL: "SHOW_ADD_ACCOUNT_STAFF_MODAL",
  SHOW_PERMISSION_MODAL: "SHOW_PERMISSION_MODAL",
  SHOW_PATIENT_MODAL: "SHOW_PATIENT_MODAL",
  SHOW_ADD_PRODUCT_GROUPS_MODAL: "SHOW_ADD_PRODUCT_GROUPS_MODAL",
  SHOW_ADD_SERVICE_MODAL: "SHOW_ADD_SERVICE_MODAL",
  SHOW_ADD_TYPE_SERVICE_GROUPS_MODAL: "SHOW_ADD_TYPE_SERVICE_GROUPS_MODAL",
  GET_ALL_PATIENT: "GET_ALL_PATIENT",
  CLEAR: "CLEAR",
};
