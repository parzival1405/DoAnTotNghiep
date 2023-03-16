import { GLOBALTYPES } from "../actionType";
import * as api from "../../api";

export const getExaminationLetterByDate = (formData) => async (dispatch) => {
  try {
    const medicalLetterResponse = await api.getMedicalLettersByDate(formData);

    dispatch({
      type: GLOBALTYPES.GET_MEDICAL_LETTER_DATE,
      payload: medicalLetterResponse.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const saveExaminationLetter = (formData) => async (dispatch) => {
  try {
    const { data } = await api.saveMedicalLetters(formData);

    // dispatch({
    //   type: GLOBALTYPES.ADD_EXAMINATION_LETTER,
    //   payload: data,
    // });
  } catch (err) {
    console.log(err);
  }
};
