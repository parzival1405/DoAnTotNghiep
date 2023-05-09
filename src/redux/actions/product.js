import * as api from "../../api";
import { GLOBALTYPES } from "../actionType";

export const addCategory = (formData) => async (dispatch) => {
  try {
    const { data } = await api.saveCategoryDrugs(formData);
    dispatch({
      type: GLOBALTYPES.ADD_CATEGORY,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateCategory = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updateCategoryDrugs(formData);
    dispatch({
      type: GLOBALTYPES.UPDATE_CATEGORY,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getAllProduct = () => async (dispatch) => {
  try {
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
  } catch (err) {
    console.log(err);
  }
};

export const addProduct = (formData) => async (dispatch) => {
  try {
    console.log(formData);
    const { data } = await api.saveDrug(formData);

    dispatch({
      type: GLOBALTYPES.ADD_DRUGS,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateProduct = (formData) => async (dispatch) => {
  const { data } = await api.updateDrug(formData);

    dispatch({
      type: GLOBALTYPES.UPDATE_DRUGS,
      payload: data,
    });
} 
export const addOrUpdatePrescription = (data) => async (dispatch) => {
  try {
    const data2 = {
      id: data.id,
      doctor: data.doctor,
      updatedDate: data.updatedDate,
      patient: data.patient,
      diagnose: data.diagnose,
      prescription: data.detailMedicineResponses,
    }

    dispatch({
      type: GLOBALTYPES.ADD_PRESCRIPTION,
      payload: data2,
    });
  } catch (err) {
    console.log(err);
  }
};

