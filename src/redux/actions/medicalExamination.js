import { GLOBALTYPES } from "../actionType";
import * as api from "../../api";
export const getAllExamination = () => async (dispatch) => {
    try {
      const {data} = await api.getAllExamination();
      dispatch({
        type:GLOBALTYPES.GET_ALL_EXAMINATION,
        payload:data
      });
    } catch (err) {
      console.log(err)
    }
  };

  export const saveExamination = (formData) => async (dispatch) => {
    try {
      console.log(formData);
      const {data} = await api.saveExamination(formData);
      console.log(data);
      dispatch({
        type:GLOBALTYPES.ADD_EXAMINATION,
        payload:data
      });
    } catch (err) {
      console.log(err)
    }
  };
  