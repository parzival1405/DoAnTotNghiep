import * as api from "../../api";
import { GLOBALTYPES } from "../actionType";

export const addOrUpdateServiceAvailable = (data) => async (dispatch) => {
  const data2 = data.serviceAvailable.map((item) => ({
    idMedicalExamination: data.id,
    ...item,
    diagnose: data.diagnose,
    doctor: data.doctor,
    patient: data.patient,
  }));

  try {
    dispatch({
      type: GLOBALTYPES.ADD_OR_UPDATE_ARRAY_SERVICE_AVAILABLE,
      payload: data2,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updatePaymentServiceAvailable =
  (dataMedicalExamination, arrayPaidService, client, socket) =>
  async (dispatch) => {
    try {
      const { data } = await api.updatePaidServiceCLS(arrayPaidService);

      dispatch({
        type: GLOBALTYPES.UPDATE_UNPAID_SERVICE_CLS,
        payload: {
          ...dataMedicalExamination,
          serviceAvailable: [
            dataMedicalExamination.serviceAvailable[0],
            ...data,
          ],
        },
      });

      if (data.length > 0) {
        client.publish({
          destination: `/queue/clinical_service`,
          body: JSON.stringify({
            id: dataMedicalExamination.id,
            doctor: dataMedicalExamination.doctor,
            updatedDate: dataMedicalExamination.updatedDate,
            patient: dataMedicalExamination.patient.fullName,
            diagnose: dataMedicalExamination.diagnose,
            serviceAvailable: data,
          }),
        });
      }
      
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          message: "Thanh toán thành công",
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

export const updateServiceAvailable =
  (id, va, formData, socket) => async (dispatch) => {
    try {
      const { data } = await api.updateServiceCLS(id, formData);

      dispatch({
        type: GLOBALTYPES.UPDATE_ARRAY_SERVICE_AVAILABLE,
        payload: data,
      });

      socket.emit(
        "doneServiceCLS",
        JSON.stringify({ data: data, va: va })
      );
    } catch (err) {
      console.log(err);
    }
  };
