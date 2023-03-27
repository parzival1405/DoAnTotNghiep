import { GLOBALTYPES } from "../actionType";
import * as api from "../../api";
export const getAllExamination = () => async (dispatch) => {
  try {
    const { data } = await api.getAllExamination();
    dispatch({
      type: GLOBALTYPES.GET_ALL_EXAMINATION,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const saveExamination = (formData, client) => async (dispatch) => {
  const sendData = {
    patient: formData.patient,
    diagnose: formData.diagnose,
    doctorId: formData.doctor.id,
    status: formData.status,
    receptionId: formData.reception.id,
    description: formData.description,
    note: formData.note,
  };
  try {
    const { data } = await api.saveExamination(sendData);
    console.log(formData);
    client.publish({
      destination: `/queue/${formData.service.medicalDepartment.codeDepartment}`,
      body: JSON.stringify(data),
    });

    dispatch({
      type: GLOBALTYPES.ADD_EXAMINATION,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const addExaminationRoleDoctor = (data) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.DOCTOR_RECEIVE_EXAMINATION,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateMedicalExamination = (formData) => async (dispatch) => {
  const { currentPatient, clinicalService } = formData;
  try {
    const sendData = {
      doctorId: currentPatient.doctor.id,
      diagnose: currentPatient.diagnose,
      status: currentPatient.status,
      receptionId: currentPatient.receptionId,
      description: currentPatient.description,
      note: currentPatient.note,
      result: currentPatient.result,
      dateRecheckUp: currentPatient.dateRecheckUp,
      totalPrice: currentPatient.totalPrice,
      buyMedicine: currentPatient.buyMedicine,
      weight: currentPatient.weight,
      height: currentPatient.height,
      heartbeat: currentPatient.heartbeat,
      bloodPressure: currentPatient.bloodPressure,
      temperature: currentPatient.temperature,
      para: currentPatient.para,
      medicalExaminationDetailsRequests: clinicalService.map(
        (item) => ({
          unitPrice: item.price,
          quality: item.quantity,
          serviceId: item.id,
          roomId: 1,
        })
      ),
    };
    console.log(sendData);
    const {data} = await api.updateMedicalExamination(sendData,currentPatient.id);
    console.log(data);
    dispatch({
      type: GLOBALTYPES.UPDATE_DATA_CURRENT_EXAMINATION,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};
