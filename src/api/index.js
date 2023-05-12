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
// auth
export const login = (formData) => API.post("api/auth/login", formData);
export const refreshLogin = (formData) =>
  API.post("api/auth/refresh_token", formData);
export const forgotPassword = (phone_number) =>
  API.post(`api/auth/forgot/password/${phone_number}`);
export const register = (formData) => API.post("api/auth/register", formData);
export const changePassword = (phoneNumber, formData) =>
  API.post(`api/auth/password/${phoneNumber}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
// user
export const saveImage = (formData) =>
  API.post("api/users/avatar", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const getAllUser = () => API.get("api/users");
export const getAllStaffByRole = (role) =>
  API.get(`api/users/roles?role=${role}`);
// medical_examination
export const buyMedicineMedicalExamination = (id) =>
  API.put(`/api/medical_examinations/export/${id}`);
export const getAllExamination = () => API.get("api/medical_examinations");
export const getExaminationsCurrentDayAndRoom = (formData) =>
  API.post("api/medical_examinations/date", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const saveExamination = (formData) =>
  API.post("api/medical_examinations", formData);
export const updateMedicalExamination = (formData, id) =>
  API.put(`api/medical_examinations/${id}`, formData);
export const getMedicalExaminationById = (id) =>
  API.get(`api/medical_examinations/${id}`);
export const searchMedicalExamination = (filter,debouncedValue) =>
  API.get(`api/medical_examinations/search?type=${filter}&keyword=${debouncedValue}`)
// service
export const getAllService = () => API.get("api/services");
export const getAllServiceCLS = (formData) =>
  API.get(`api/services/cls?cls=${formData}`);
export const getServiceById = (id) => API.get(`api/services/${id}`);
export const saveService = (data) => API.get("api/services", data);
export const updateService = (formData) =>
  API.put(`api/services/${formData.id}`, formData);
export const updateServiceCLS = (id, formData) =>
  API.put(`api/medical_detail_examinations/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const updatePaidServiceCLS = (formData) =>
  API.put(`api/medical_detail_examinations/paid`, formData);

// patient
export const findPatientByPhonenumber = (phoneMumber) =>
  API.get(`api/patients/${phoneMumber}`);
export const getHistoryMedicalExaminationByIdPatient = (id) =>
  API.get(`api/patients/history/${id}`);
export const getAllPatient = () => API.get("api/patients");
export const updatePatient = (formData) =>
  API.put(`api/patients/${formData.id}`, formData);
//medical_letters

export const updateMedicalLetter = (formData, id) =>
  API.put(`api/medical_letters/${id}`, formData);
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

// batch_drugs
export const saveBatchDrugs = (formData) =>
  API.post(`api/batch_drugs`, formData);
export const getAllBatchDrugs = () => API.get(`api/batch_drugs`);
// category drug
export const saveCategoryDrugs = (formData) =>
  API.post(`api/category_drugs`, formData);
export const updateCategoryDrugs = (formData) =>
  API.put(`api/category_drugs/${formData.id}`, formData);

export const getAllCategoryDrugs = () => API.get(`api/category_drugs`);
export const getCategoryDrugById = (id) => API.get(`api/category_drugs/${id}`);
// medical department
export const saveMedicalDepartment = (formData) =>
  API.post(`api/medical_departments`, formData);
export const getAllMedicalDepartment = () => API.get(`api/medical_departments`);
export const getMedicalDepartmentById = (id) =>
  API.get(`api/medical_departments/${id}`);
// medicines
export const saveMedicine = (formData) => API.post(`api/medicines`, formData);
export const getMedicineByPatientId = (id) =>
  API.get(`api/medicines/patients/${id}`);
export const getMedicineById = (id) => API.get(`api/medicines/${id}`);
// drug
export const saveDrug = (formData) => API.post(`api/drugs`, formData);
export const updateDrug = (formData) =>
  API.put(`api/drugs/${formData.id}`, formData);
