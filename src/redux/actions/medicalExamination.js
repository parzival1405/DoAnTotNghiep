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

  export const saveExamination = (formData,client) => async (dispatch) => {
    try {
      client.publish({ destination: '/queue/bn', body: JSON.stringify( formData ) })
    } catch (err) {
      console.log(err)
    }
  };

  export const addExamination = (data) => async (dispatch) => {
    try {
      dispatch({
        type:GLOBALTYPES.ADD_EXAMINATION,
        payload:data
      });

    } catch (err) {
      console.log(err)
    }
  };
  