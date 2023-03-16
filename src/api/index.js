import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_URL_SERVER });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${JSON.parse(
      localStorage.getItem("token")
    )}`;
  }
  return req;
});

export const login = (formData) => API.post("api/auth/login", formData);
export const refreshLogin = () => API.post("api/auth/refreshLogin");
export const forgotPassword = (phone_number) =>
  API.post(`api/auth/forgot/password/${phone_number}`);
// medical_examination
export const getAllExamination = () => API.get("api/medical_examinations");
export const saveExamination = (formData) =>
  API.post("api/medical_examinations", formData);

// service
export const getAllService = () => API.get("api/services");
export const getServiceById = (id) => API.get(`api/services/${id}`);
export const saveService = (data) => API.get("api/services", data);
// patient
export const findPatientByPhonenumber = (phoneMumber) =>
  API.get(`api/patients/${phoneMumber}`);
export const getHistoryMedicalExaminationByIdPatient = (id) =>
  API.get(`api/patients/history/${id}`);
export const getAllPatient = () => API.get("api/patients");
//medical_letters
export const getAllMedicalLetters = () => API.get("api/medical_letters");
export const getMedicalLettersByDate = (formData) =>
  API.post("api/medical_letters/date", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const getMedicalLettersById = (id) =>
  API.get(`api/medical_letters/${id}`);
export const editMedicalLetters = (id, formData) =>
  API.put(`api/medical_letters/${id}`, formData);
export const saveMedicalLetters = (formData) =>
  API.post(`api/medical_letters`, formData);
export const searchMedicalLetters = (formData) =>
  API.get("api/medical_letters/search", { param: formData });
// supplier
export const saveSupplier = (formData) => API.post(`api/suppliers`, formData);
export const getAllSupplier = () => API.get("api/suppliers");
// product
export const getAllProduct = () => API.get("/api/drugs");

