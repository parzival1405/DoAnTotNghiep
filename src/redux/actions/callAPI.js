import { GLOBALTYPES } from "../actionType";
import * as api from "../../api";

export const callAPIForPatientReceptionSide =(formData) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.START_LOADING_CALL_API,
      });

      const serviceResponse = await api.getAllService();
      dispatch({
        type: GLOBALTYPES.GET_ALL_SERVICE,
        payload: serviceResponse.data,
      });

      const examinationResponse = await api.getExaminationsCurrentDayAndRoom(
        formData
      );
      dispatch({
        type: GLOBALTYPES.GET_ALL_EXAMINATION,
        payload: examinationResponse.data,
      });

      const staffResponse = await api.getAllStaffByRole("DOCTOR");
      dispatch({
        type: GLOBALTYPES.GET_ALL_DOCTOR,
        payload: staffResponse.data,
      });

      dispatch({
        type: GLOBALTYPES.END_LOADING_CALL_API,
      });
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.END_LOADING_CALL_API,
      });
    }
  };

export const callAPIForPatientSide = () => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.START_LOADING_CALL_API,
    });

    const patientResponse = await api.getAllPatient();
    dispatch({
      type: GLOBALTYPES.GET_ALL_PATIENT,
      payload: patientResponse.data,
    });

    dispatch({
      type: GLOBALTYPES.END_LOADING_CALL_API,
    });
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.END_LOADING_CALL_API,
    });
  }
};

export const callAPIForScheduleSide = (data) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.START_LOADING_CALL_API,
    });
    const medicalLetterResponse = await api.getMedicalLettersByDate(data);

    dispatch({
      type: GLOBALTYPES.GET_ALL_MEDICAL_LETTER,
      payload: medicalLetterResponse.data,
    });

    dispatch({
      type: GLOBALTYPES.END_LOADING_CALL_API,
    });
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.END_LOADING_CALL_API,
    });
  }
};

export const callAPIForMedicalExaminationSide = (formData) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.START_LOADING_CALL_API,
      });
      const examinationResponse = await api.getExaminationsCurrentDayAndRoom(
        formData
      );
      //
      dispatch({
        type: GLOBALTYPES.ALL_EXAMINATION_ROLE_DOCTOR,
        payload: examinationResponse.data,
      });

      dispatch({
        type: GLOBALTYPES.END_LOADING_CALL_API,
      });
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.END_LOADING_CALL_API,
      });
    }
  };

export const callAPIForProductSide = () => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.START_LOADING_CALL_API,
    });

    const productResponse = await api.getAllProduct();
    dispatch({
      type: GLOBALTYPES.GET_ALL_PRODUCT,
      payload: productResponse.data,
    });

    const categoryResponse = await api.getAllCategoryDrugs();

    dispatch({
      type: GLOBALTYPES.ALL_CATEGORY,
      payload: categoryResponse.data,
    });

    dispatch({
      type: GLOBALTYPES.END_LOADING_CALL_API,
    });
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.END_LOADING_CALL_API,
    });
  }
};

export const getCategoryProductExamination = () => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.START_LOADING_CALL_API,
    });

    const categoryResponse = await api.getAllCategoryDrugs();

    dispatch({
      type: GLOBALTYPES.ALL_CATEGORY,
      payload: categoryResponse.data,
    });

    dispatch({
      type: GLOBALTYPES.END_LOADING_CALL_API,
    });
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.END_LOADING_CALL_API,
    });
  }
};

export const callAPIForServiceListSide = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.START_LOADING_CALL_API,
    });

    const { data } = await api.getExaminationsCurrentDayAndRoom(formData);

    let arrayService = []
    for (let i = 0; i < data.length; i++) {
      const service = data[i].medicalExaminationDetailsResponses.filter(
        (item, index) => index != 0
      );
  
      const serviceCLS = service.map((item) => ({
        id: data[i].id,
        doctor: data[i].doctor,
        updatedDate: data[i].updatedDate,
        patient: data[i].patient.fullName,
        diagnose: data[i].diagnose,
        ...item,
      }));

      arrayService.push(...serviceCLS)
    }

    console.log(arrayService);

    dispatch({
      type: GLOBALTYPES.GET_ALL_SERVICE_AVAILABLE,
      payload: arrayService,
    });

    dispatch({
      type: GLOBALTYPES.END_LOADING_CALL_API,
    });
  } catch (error) {
    console.log(error)
    dispatch({
      type: GLOBALTYPES.END_LOADING_CALL_API,
    });
  }
};

export const callAPIForAddSupplierSide = () => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.START_LOADING_CALL_API,
    });

    const supplierResponse = await api.getAllSupplier();
    dispatch({
      type: GLOBALTYPES.GET_ALL_SUPPLIER,
      payload: supplierResponse.data,
    });

    dispatch({
      type: GLOBALTYPES.END_LOADING_CALL_API,
    });
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.END_LOADING_CALL_API,
    });
  }
};

export const callAPIForAddProductSide = () => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.START_LOADING_CALL_API,
    });

    const supplierResponse = await api.getAllSupplier();
    dispatch({
      type: GLOBALTYPES.GET_ALL_SUPPLIER,
      payload: supplierResponse.data,
    });

    const productResponse = await api.getAllProduct();
    dispatch({
      type: GLOBALTYPES.GET_ALL_PRODUCT,
      payload: productResponse.data,
    });

    const categoryResponse = await api.getAllCategoryDrugs();

    dispatch({
      type: GLOBALTYPES.ALL_CATEGORY,
      payload: categoryResponse.data,
    });

    const batchDrugsResponse = await api.getAllBatchDrugs();

    dispatch({
      type: GLOBALTYPES.GET_ALL_BATCH_DRUG,
      payload: batchDrugsResponse.data,
    });

    dispatch({
      type: GLOBALTYPES.END_LOADING_CALL_API,
    });
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.END_LOADING_CALL_API,
    });
  }
};

export const callAPIForAccountSide = () => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.START_LOADING_CALL_API,
    });

    const staffResponse = await api.getAllUser();
    dispatch({
      type: GLOBALTYPES.GET_ALL_STAFF,
      payload: staffResponse.data,
    });

    dispatch({
      type: GLOBALTYPES.END_LOADING_CALL_API,
    });
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.END_LOADING_CALL_API,
    });
  }
};

export const callAPIForAddPrescriptionSide = () => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.START_LOADING_CALL_API,
    });

    const productResponse = await api.getAllProduct();
    dispatch({
      type: GLOBALTYPES.GET_ALL_PRODUCT,
      payload: productResponse.data,
    });

    const categoryResponse = await api.getAllCategoryDrugs();

    dispatch({
      type: GLOBALTYPES.ALL_CATEGORY,
      payload: categoryResponse.data,
    });

    dispatch({
      type: GLOBALTYPES.END_LOADING_CALL_API,
    });
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.END_LOADING_CALL_API,
    });
  }
};
