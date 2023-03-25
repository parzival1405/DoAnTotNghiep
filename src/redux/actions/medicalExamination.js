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
      diagnose:formData.diagnose,
      doctorId:formData.doctor.id,
      status:formData.status,
      receptionId:formData.reception.id,
      description:formData.description,
      note:formData.note,
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
  try {
    console.log(formData);
    // await api.updateMedicalExamination(formData);
  } catch (err) {
    console.log(err);
  }
};



