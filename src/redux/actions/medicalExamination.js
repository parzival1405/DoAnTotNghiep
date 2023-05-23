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

export const saveExamination =
  (formData, client, socket) => async (dispatch) => {
    const sendData = {
      patient: formData.patient,
      diagnose: formData.diagnose,
      doctorId: formData.doctor?.id,
      status: formData.status,
      receptionId: formData.reception.id,
      description: formData.description,
      note: formData.note,
      medicalExaminationDetailsRequests: [
        { serviceId: formData.service.id, status: "DOING" },
      ],
    };

    try {
      const { data } = await api.saveExamination(sendData);

      if (data.doctor == null) {
  
        client.publish({
          destination: `/queue/${formData.service.medicalDepartment.codeDepartment}`,
          body: JSON.stringify(data),
        });

      } else {
        socket.emit("newMedicalExamination", JSON.stringify(data));
      }

      socket.emit("sendNewMedicalExaminationToAllDoctor",formData.service.medicalDepartment.id);

      dispatch({
        type: GLOBALTYPES.ADD_EXAMINATION,
        payload: data,
      });
    } catch (err) {
      console.log(err);
    }
  };

export const addExaminationRoleDoctor = (data, id) => async (dispatch) => {
  try {
    if (data.doctor == null) {
      const medicalExaminationResponse = await api.updateMedicalExamination(
        {
          doctorId: id,
        },
        data.id
      );
      dispatch({
        type: GLOBALTYPES.DOCTOR_RECEIVE_EXAMINATION,
        payload: medicalExaminationResponse.data,
      });
    } else {
      dispatch({
        type: GLOBALTYPES.DOCTOR_RECEIVE_EXAMINATION,
        payload: data,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const updateMedicalExamination =
  (formData, client, socket) => async (dispatch) => {
    const { currentPatient, addOrDelete, addOrDeleteDrug, check } = formData;

    try {
      const sendData = {
        doctorId: currentPatient.doctor.id,
        diagnose: currentPatient.diagnose,
        receptionId: currentPatient.receptionId,
        description: currentPatient.description,
        note: currentPatient.note,
        dateRecheckUp: currentPatient.dateRecheckUp,
        totalPrice: currentPatient.totalPrice,
        buyMedicine: currentPatient.buyMedicine,
        weight: currentPatient.weight,
        height: currentPatient.height,
        heartbeat: currentPatient.heartbeat,
        bloodPressure: currentPatient.bloodPressure,
        temperature: currentPatient.temperature,
        para: currentPatient.para,
        codeicd: currentPatient.codeicd,
        pathological: currentPatient.pathological,
        result: currentPatient.result,
        medicalExaminationDetailsRequests: addOrDelete,
        detailMedicineRequests: addOrDeleteDrug,
        status: check?.value ? check.value : "DOING",
      };

      const { data } = await api.updateMedicalExamination(
        sendData,
        currentPatient.id
      );

      dispatch({
        type: GLOBALTYPES.UPDATE_DATA_CURRENT_EXAMINATION,
        payload: data,
      });

      dispatch({
        type: GLOBALTYPES.CLEAR_SERVICE_AND_DRUG,
      });
      if (addOrDelete) {
        socket.emit(
          "servicePayment",
          JSON.stringify({
            id: data.id,
            doctor: data.doctor,
            updatedDate: data.updatedDate,
            patient: data.patient,
            diagnose: data.diagnose,
            serviceAvailable: data.medicalExaminationDetailsResponses,
          })
        );
      }

      if (addOrDeleteDrug) {
        client.publish({
          destination: `/queue/prescription`,
          body: JSON.stringify({
            id: data.id,
            updatedDate: data.updatedDate,
            doctor: data.doctor.fullName,
            updatedDate: data.doctor.updatedDate,
            patient: data.patient.fullname,
            note: data.note,
            prescription: data.detailMedicineResponses,
          }),
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

export const buyMedicineMedicalExamination = (id) => async (dispatch) => {
  try {
    await api.buyMedicineMedicalExamination(id);
    dispatch({
      type: GLOBALTYPES.UPDATE_PAID_PRESCRIPTION,
      payload: id,
    });
  } catch (err) {
    console.log(err);
  }
};

export const searchMedicalExamination = (filter,debouncedValue) => async (dispatch) => {
  try {
    const examinationResponse = await api.searchMedicalExamination(
      filter,debouncedValue
    );
    //
    dispatch({
      type: GLOBALTYPES.ALL_EXAMINATION_ROLE_DOCTOR,
      payload: examinationResponse.data,
    });
  } catch (err) {
    console.log(err);
  }
};


export const searchByDoctorRoom = (formData) => async (dispatch) => {
  try {
    const examinationResponse = await api.getExaminationsCurrentDayAndRoom(
      formData
    );
    //
    dispatch({
      type: GLOBALTYPES.ALL_EXAMINATION_ROLE_DOCTOR,
      payload: examinationResponse.data,
    });
    
  } catch (err) {
    console.log(err);
  }
};


