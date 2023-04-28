import { GLOBALTYPES } from "../actionType";
import * as api from "../../api";
import { getCurrentDateString } from "../../utils/Calc";

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

export const getMedicalLettersById = (id, modal) => async (dispatch) => {
  try {
    const medicalLetterResponse = await api.getMedicalLettersById(id);

    dispatch({
      type: GLOBALTYPES.HIDE_MODAL,
      payload: modal,
    });

    dispatch({
      type: GLOBALTYPES.SHOW_ADD_SCHEDULE_MODAL,
      payload: { type: GLOBALTYPES.EDIT, data: medicalLetterResponse?.data },
    });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.HIDE_MODAL,
      payload: modal,
    });
  }
};

export const saveExaminationLetter = (formData) => async (dispatch) => {
  try {
    const { data } = await api.saveMedicalLetters(formData);

    if (data.date == getCurrentDateString()) {
      dispatch({
        type: GLOBALTYPES.ADD_MEDICAL_LETTER,
        payload: data,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const updateMedicalLetter = (formData, id) => async (dispatch) => {
  try {
    const { data } = await api.updateMedicalLetter(formData, id);

    if (data.date == getCurrentDateString()) {
      dispatch({
        type: GLOBALTYPES.UPDATE_MEDICAL_LETTER,
        payload: data,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const saveExaminationFromLetter =
  (sendData, client, socket) => async (dispatch) => {
    try {
      const medicalExamination = await api.saveExamination(sendData);

      const letterUpdateResponse = await api.updateMedicalLetter(
        { status: "DONE" },
        sendData.letterId
      );

      dispatch({
        type: GLOBALTYPES.UPDATE_MEDICAL_LETTER,
        payload: letterUpdateResponse.data,
      });

      if (medicalExamination.data.doctor == null) {
        client.publish({
          destination: `/queue/${medicalExamination.data.medicalExaminationDetailsResponses[0].service.medicalDepartment.codeDepartment}`,
          body: JSON.stringify(medicalExamination.data),
        });
      } else {
        socket.emit(
          "newMedicalExamination",
          JSON.stringify(medicalExamination.data)
        );
      }
      dispatch({
        type: GLOBALTYPES.ADD_EXAMINATION,
        payload: medicalExamination.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
