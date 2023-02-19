import { GLOBALTYPES } from "../actionType";

export const ShowExaminationInformation = () => async (dispatch) => {
  try {
    dispatch({
      type:GLOBALTYPES.EXAMINATION_INFORMATION,
    });
  } catch (err) {}
};

export const ShowPrescription = () => async (dispatch) => {
    try {
      dispatch({
        type:GLOBALTYPES.PRESCRIPTION,
      });
    } catch (err) {}
  };

  export const ShowExaminationHistory = () => async (dispatch) => {
    try {
      dispatch({
        type:GLOBALTYPES.EXAMINATION_HISTORY,
      });
    } catch (err) {}
  };

  export const ShowClinicalService = () => async (dispatch) => {
    try {
      dispatch({
        type:GLOBALTYPES.CLINICAL_SERVICE,
      });
    } catch (err) {}
  };

