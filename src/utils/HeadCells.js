export const headCellsPatientSide = [
  { id: "id", numeric: false, label: "Id bệnh nhân" },
  { id: "fullName", numeric: false, label: "Tên bệnh nhân" },
  { id: "dateOfBirth", numeric: false, label: "Tuổi" },
  { id: "phoneNumber", numeric: false, label: "Số điện thoại" },
];

export const headCellsMedicalExaminationSide = [
  { id: "id", numeric: false, label: "Id bệnh nhân" },
  { id: "patient.fullName", numeric: false, label: "Tên bệnh nhân" },
  { id: "patient.dateOfBirth", numeric: true, label: "Tuổi" },
  { id: "category", numeric: false, label: "Loại khám" },
  { id: "diagnose", numeric: false, label: "CĐ Lâm sàng" },
  { id: "result", numeric: false, label: "Kết luận" },
  { id: "status", numeric: false, label: "Trạng thái" },
];

export const headCellsPatientReceptionSide = [
  { id: "id", numeric: false, label: "Id bệnh nhân" },
  { id: "patient.fullName", numeric: false, label: "Tên bệnh nhân" },
  { id: "patient.dateOfBirth", numeric: true, label: "Tuổi" },
  { id: "medicalExaminationDetailsResponses.name", numeric: false, label: "Loại khám" },
  { id: "detail", numeric: false, label: "CĐ Lâm sàng" },
  { id: "result", numeric: false, label: "Kết luận" },
  { id: "status", numeric: false, label: "Trạng thái" },
];

export const headCellsScheduleSide = [
  { id: "id", numeric: false, sizeCellWidth: 100, label: "Mã phiếu" },
  { id: "patient.fullName", numeric: false, label: "Tên bệnh nhân" },
  { id: "patient.sex", numeric: false, sizeCellWidth: 100, label: "Giới tính" },
  { id: "date", numeric: false, label: "Ngày hẹn khám" },
  { id: "service.name", numeric: false, sizeCellWidth: 140, label: "Kiểu khám" },
  // { id: "cause", numeric: false, label: "Lý do" },
  // { id: "note", numeric: false, label: "Ghi chú" },
  { id: "status", numeric: false, sizeCellWidth: 140, label: "Trạng thái" },
];
 
export const headCellsMedicalExaminationHistory = [
  { id: "createdDate", numeric: false, label: "Ngày khám" },
  { id: "doctor.fullName", numeric: false, label: "Bác sĩ khám" },
  { id: "note", numeric: false, label: "Ghi chú" },
  { id: "diagnose", numeric: false, label: "Chuẩn đoán" },
  { id: "conclude", numeric: false, label: "Kết luận" },
];

export const headCellsClinicalServiceCurrentPatient = [
  { id: "id", numeric: false, label: "Id dịch vụ" },
  { id: "name", numeric: false, label: "Tên dịch vụ" },
  { id: "department", numeric: false, label: "Phòng ban" },
  { id: "quantity", numeric: true, editable: true, label: "Số lượng" },
  { id: "price", numeric: true, label: "Giá" },
  // {
  //   id: "totalPrice",
  //   numeric: true,
  //   calc: { fun: (quantity, price) => TotalPrice(quantity, price) },
  //   label: "Thành tiền",
  // },
  { id: "state", numeric: false, label: "Trạng thái" },
];

export const headCellsProductSide = [
  { id: "id", numeric: false, label: "Mã sản phẩm" },
  { id: "name", numeric: false, label: "Tên sản phẩm" },
  { id: "categoryDrug.name", numeric: false, label: "Nhóm sản phẩm" },
  { id: "price", numeric: false, label: "Giá bán" },
  { id: "description", numeric: false, label: "Công dụng" },
  { id: "image", numeric: false, label: "hình ảnh" },
  { id: "state", numeric: false, label: "Trạng thái" },
];

export const headCellsPrescription = [
  { id : "", sizeCellWidth: 50,numeric:false,label:""},
  { id: "id", numeric: false, label: "Mã đơn thuốc" },
  { id: "createdDate", numeric: false, label: "Ngày khám" },
  { id: "note", numeric: false, label: "Ghi chú" },
  { id: "diagnostic", numeric: false, label: "Chuẩn đoán" },
  { id: "totalPrice", numeric: false, label: "Giá tiền" },
];

export const headCollapseCellsPrescription = [
  { id: "drug.name", numeric: false, label: "Tên thuốc" },
  { id: "quality", numeric: false, label: "Số lượng" },
  { id: "designate", numeric: false, label: "Chỉ định" },
  { id: "drug.benefit", numeric: false, label: "Công dụng" },
];


export const headCellsListServiceSide = [
  { id: "id", numeric: false, label: "Mã dịch vụ" },
  { id: "name", numeric: false, label: "Tên dịch vụ" },
  { id: "categoryService.name", numeric: false, label: "Nhóm dịch vụ" },
  { id: "price", numeric: false, label: "Giá" },
  { id: "dosage", numeric: false, label: "Mô tả" },
  { id: "image", numeric: false, label: "Ghi chú" },
  { id: "state", numeric: false, label: "Trạng thái" },
];
