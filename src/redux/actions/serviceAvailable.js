import * as api from "../../api";
import { GLOBALTYPES } from "../actionType";

// export const getAllServiceAvailable = () => async (dispatch) => {
//   try {
//     const { data } = await api.getAllService();
//     dispatch({
//       type: GLOBALTYPES.GET_ALL_SERVICE_AVAILABLE,
//       payload: data,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

export const addServiceAvailable = (data) => async (dispatch) => {
  const data2 = data.serviceAvailable.map((item) => ({
    ...item,
    diagnose: data.diagnose,
    doctor: data.doctor,
    patient:data.patient,
  }));

  try {
    dispatch({
      type: GLOBALTYPES.ADD_ARRAY_SERVICE_AVAILABLE,
      payload: data2,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateServiceAvailable = (id,doctorId,formData,socket) => async (dispatch) => {
  try {
      const { data } = await api.updateServiceCLS(id,formData);

      dispatch({
        type: GLOBALTYPES.UPDATE_ARRAY_SERVICE_AVAILABLE,
        payload: data,
      });

      socket.emit(
        "doneServiceCLS",
        JSON.stringify({data:data,doctorId:doctorId})
      );
  } catch (err) {
    console.log(err);
  }
};
