import { GLOBALTYPES } from "../actionType";

export const setCurrentPatient = (patient) => async (dispatch) => {
  try {
    dispatch({
      type:GLOBALTYPES.CURRENT_PATIENT,
      payload:patient
    });
  } catch (err) {}
};

// export const re = () => async (dispatch) => {
//     try {
//       dispatch({
//         type:GLOBALTYPES.CURRENT_PATIENT,
//       });
//     } catch (err) {}
//   };