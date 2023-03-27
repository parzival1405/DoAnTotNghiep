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

export const addProduct = (formData) => async (dispatch) => {
  try {
    const sendData = {
      name: formData.name,
      description: formData.description,
      benefit: formData.benefit,
      price: formData.price,
      categoryDrugId: formData.category.id,
      note: formData.note,
    };
    const { data } = await api.saveDrug(sendData);

    dispatch({
      type: GLOBALTYPES.ADD_DRUGS,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};
