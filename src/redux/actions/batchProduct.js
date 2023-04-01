import * as api from "../../api";
import { GLOBALTYPES } from "../actionType";

export const saveBatchProduct= (formData) => async (dispatch) => {
  try {
    const { data } = await api.saveBatchDrugs(formData);
    dispatch({
      type: GLOBALTYPES.ADD_BATCH_DRUG,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getAllBatchProduct= () => async (dispatch) => {
    try {
      const { data } = await api.getAllBatchDrugs();
      dispatch({
        type: GLOBALTYPES.GET_ALL_BATCH_DRUG,
        payload: data,
      });
    } catch (err) {
      console.log(err);
    }
  };