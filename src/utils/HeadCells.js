import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { GridEditInputCell } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";

export const headCellsPatientSide = [
  { id: "id", numeric: false, label: "Id bệnh nhân" },
  { id: "fullName", numeric: false, label: "Tên bệnh nhân" },
  { id: "dateOfBirth", numeric: false, label: "Tuổi", type: "age" },
  { id: "phoneNumber", numeric: false, label: "Số điện thoại" },
];

export const headCellsMedicalExaminationSide = [
  { id: "id", numeric: false, sizeCellWidth: 50, label: "Id" },
  { id: "patient.fullName", numeric: false, label: "Tên bệnh nhân" },
  {
    id: "patient.dateOfBirth",
    sizeCellWidth: 70,
    numeric: true,
    label: "Tuổi",
    type: "age",
  },
  {
    id: "category.service.name",
    sizeCellWidth: 200,
    numeric: false,
    label: "Loại khám",
  },
  { id: "diagnose", numeric: false, label: "CĐ Lâm sàng" },
  { id: "result", numeric: false, label: "Kết luận" },
  { id: "status", numeric: false, label: "Trạng thái" },
];

export const headCellsPatientReceptionSide = [
  { id: "id", numeric: false, label: "Id phiếu khám" },
  { id: "patient.fullName", numeric: false, label: "Tên bệnh nhân" },
  { id: "patient.dateOfBirth", numeric: true, label: "Tuổi", type: "age" },
  {
    id: "category.service.name",
    sizeCellWidth: 200,
    numeric: false,
    label: "Loại khám",
  },
  { id: "detail", numeric: false, label: "CĐ Lâm sàng" },
  { id: "result", numeric: false, label: "Kết luận" },
  { id: "status", numeric: false, label: "Trạng thái" },
];

export const headCellsScheduleSide = [
  { id: "id", numeric: false, sizeCellWidth: 100, label: "Mã phiếu" },
  { id: "patientName", numeric: false, label: "Tên bệnh nhân" },
  {
    id: "sex",
    numeric: false,
    sizeCellWidth: 100,
    label: "Giới tính",
    type: "gender",
  },
  { id: "date", numeric: false, label: "Ngày hẹn khám" },
  {
    id: "service.name",
    numeric: false,
    sizeCellWidth: 140,
    label: "Kiểu khám",
  },
  // { id: "cause", numeric: false, label: "Lý do" },
  // { id: "note", numeric: false, label: "Ghi chú" },
  { id: "status", numeric: false, sizeCellWidth: 140, label: "Trạng thái" },
];

export const headCellsMedicalExaminationHistory = [
  { id: "createdDate", numeric: false, label: "Ngày khám", type: "date" },
  { id: "doctor.fullName", numeric: false, label: "Bác sĩ khám" },
  { id: "note", numeric: false, label: "Ghi chú" },
  { id: "diagnose", numeric: false, label: "Chuẩn đoán" },
  { id: "conclude", numeric: false, label: "Kết luận" },
];

export const headCellsClinicalServiceCurrentPatient = [
  { id: "service.id", numeric: false, label: "Id dịch vụ" },
  {
    id: "service.name",
    sizeCellWidth: 300,
    numeric: false,
    label: "Tên dịch vụ",
  },
  {
    id: "service.medicalDepartment.name",
    numeric: false,
    label: "Phòng ban",
  },
  { id: "service.price", numeric: false, label: "Giá" },
  // {
  //   id: "totalPrice",
  //   numeric: true,
  //   calc: { fun: (quantity, price) => TotalPrice(quantity, price) },
  //   label: "Thành tiền",
  // },
  { id: "status", numeric: false, label: "Trạng thái" },
];

export const headCellsClinicalServiceCurrentPatientDetail = [
  {
    id: "service.name",
    sizeCellWidth: 300,
    numeric: false,
    label: "Tên dịch vụ",
  },
  {
    id: "service.medicalDepartment.name",
    numeric: false,
    label: "Phòng ban",
  },
  { id: "service.price", numeric: false, label: "Giá" },
  { id: "status", numeric: false, label: "Trạng thái" },
];

export const headCellsPrescriptionDetail = [
  {
    id: "drug.name",
    sizeCellWidth: 300,
    numeric: false,
    label: "Tên thuốc",
  },
  {
    id: "designate",
    numeric: false,
    label: "Chỉ định",
  },
  { id: "quantity", numeric: false, label: "Số lượng" },
];


export const headCellsClinicalServiceCurrentPatientPrint = [
  {
    id: "service.name",
    sizeCellWidth: 300,
    numeric: false,
    label: "Tên dịch vụ",
  },
  {
    id: "service.medicalDepartment.name",
    numeric: false,
    label: "Phòng ban",
  },
  { id: "service.price", numeric: false, label: "Giá" },
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
  { id: "", sizeCellWidth: 50, numeric: false, label: "" },
  { id: "id", numeric: false,sizeCellWidth:100 , label: "Đơn thuốc" },
  { id: "createdDate", numeric: false, label: "Ngày khám", type: "date" },
  { id: "note", numeric: false, label: "Ghi chú" },
  { id: "result", numeric: false, label: "Chuẩn đoán" },
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

export const headCellsListSupplier = [
  { id: "id", sizeCellWidth: 100, numeric: false, label: "Mã NCC" },
  { id: "name", numeric: false, label: "Tên Nhà NCC" },
  { id: "email", numeric: false, label: "Email" },
  { id: "phoneNumber", numeric: false, label: "Điện thoại" },
  { id: "address", numeric: false, label: "Địa chỉ" },
];

export const AddPrescriptionCell = [
  { field: "stt", width: 70, editable: false, headerName: "Stt" },
  { field: "name", editable: false, headerName: "Tên sản phẩm", flex: 1 },

  {
    field: "purchaseQuantity",
    editable: true,
    type: "number",
    headerName: "Số lượng",
    width: 70,
    renderEditCell: (params) => (
      <GridEditInputCell
        {...params}
        inputProps={{
          max: parseInt(params.quantity),
          min: 0,
        }}
      />
    ),
  },
  {
    field: "designate",
    type: "text",
    editable: true,
    headerName: "Chỉ định",
    flex: 1,
  },
  {
    field: "total",
    editable: false,
    type: "number",
    headerName: "Thành tiền",
    valueGetter: (params) =>
      params.row.purchaseQuantity * params.row.price || 0,
    flex: 1,
  },
  {
    field: "action",
    headerName: "",
    width:50,
    sortable: false,
    renderCell: (params) => {
      const onClick = (e) => {
        e.stopPropagation(); // don't select this row after clicking
        params.row.callback()
      };

      return (
        <IconButton aria-label="delete" size="small" onClick={onClick} >
          <Delete />
        </IconButton>
      );
    },
  },
];

export const headCellsProductAddBatchProduct = [
  { field: "stt", width: 70, editable: false, headerName: "Stt" },
  { field: "name", editable: false, headerName: "Tên sản phẩm", flex: 1 },
  {
    field: "unit",
    editable: true,
    headerName: "Đơn vị",
    flex: 1,
    type: "singleSelect",
    valueOptions: [
      { code: "thung", name: "Thùng" },
      { code: "hop", name: "Hộp" },
      { code: "vi", name: "Vỉ" },
      { code: "vien", name: "Viên" },
    ],
    getOptionValue: (value) => value.code,
    getOptionLabel: (value) => value.name,
  },
  {
    field: "quantity",
    editable: true,
    type: "number",
    headerName: "Số lượng",
    width: 100,
  },
  {
    field: "price",
    editable: true,
    type: "number",
    headerName: "Đơn giá",
    flex: 1,
  },
  {
    field: "total",
    editable: false,
    type: "number",
    headerName: "Thành tiền",
    valueGetter: (params) => params.row.quantity * params.row.price || 0,
    flex: 1,
  },
  
];

export const headCellsAddProductSide = [
  { id: "id", numeric: false, label: "Số phiếu" },
  { id: "createdDate", numeric: false, label: "Ngày nhập", type: "date" },
  {
    id: "supplier.name",
    numeric: false,
    sizeCellWidth: 140,
    label: "Nhà cung cấp",
  },
  { id: "totalPrice", numeric: true, label: "Tổng tiền" },
  { id: "paidPrice", numeric: true, label: "Đã trả" },
  { id: "debt", numeric: true, label: "Công nợ" },
  { id: "description", numeric: false, label: "Ghi chú" },
  // { id: "state", numeric: false, label: "Trạng thái" },
];

export const headCellsPrescriptionSide = [
  { id: "id", numeric: false, label: "Số phiếu" },
  { id: "createdDate", numeric: false, label: "Ngày lập", type: "date" },
  {
    id: "patient.fullName",
    numeric: false,
    sizeCellWidth: 140,
    label: "tên bệnh nhân",
  },
  { id: "type", numeric: false, label: "Kiểu đơn" },
  { id: "doctor.fullName", numeric: true, label: "Bác sĩ kê" },
  { id: "note", numeric: false, label: "Ghi chú" },
  { id: "status", numeric: false, label: "Trạng thái" },
];

export const headCellsAccountSide = [
  { id: "avatar", numeric: false, sizeCellWidth: 80, label: "Avatar" },
  { id: "phoneNumber", numeric: false, sizeCellWidth: 120, label: "Tài khoản" },
  {
    id: "fullName",
    numeric: false,
    label: "Họ tên",
  },
  {
    id: "room.medicalDepartment.name",
    numeric: false,
    label: "Khoa",
  },
  { id: "address", numeric: false, label: "Địa chỉ" },
  { id: "state", numeric: false, sizeCellWidth: 100, label: "Trạng thái" },
];

export const HeadCellsServiceAvailableSide = [
  {
    id: "createdDate",
    sizeCellWidth: 120,
    numeric: false,
    label: "Ngày làm DV",
    type: "date",
  },
  {
    id: "patient",
    numeric: false,
    sizeCellWidth: 140,
    label: "Tên bệnh nhân",
  },
  {
    id: "service.name",
    numeric: false,
    sizeCellWidth: 140,
    label: "Tên Dịch vụ",
  },
  {
    id: "doctor.fullName",
    numeric: false,
    sizeCellWidth: 140,
    label: "BS chỉ định",
  },
  { id: "diagnose", numeric: false, label: "Chuẩn đoán" },
  { id: "status", numeric: false, sizeCellWidth: 100, label: "Trạng thái" },
];

export const HeadCellsServiceAvailableUnPaid = [
  {
    id: "id",
    numeric: false,
    sizeCellWidth: 140,
    label: "Id phiếu khám bệnh",
  },
  {
    id: "category.service.name",
    sizeCellWidth: 200,
    numeric: false,
    label: "Loại khám",
  },
  {
    id: "patient.fullName",
    numeric: false,
    sizeCellWidth: 140,
    label: "Tên bệnh nhân",
  },
  {
    id: "doctor.fullName",
    numeric: false,
    sizeCellWidth: 140,
    label: "BS chỉ định",
  },
];

export const headCellsServicePayment = [
  { field: "id", headerName: "ID" },
  {
    field: "name",
    headerName: "Dịch vụ",
    editable: false,
    flex: 1,
  },
  {
    field: "price",
    headerName: "Giá",
    editable: false,
    flex: 1,
  },
];

export const headCellsPrescriptionPayment = [
  { field: "stt", headerName: "Stt" },
  {
    field: "name",
    headerName: "Tên thuốc",
    editable: false,
    flex: 1,
  },
  {
    field: "price",
    headerName: "Giá",
    editable: false,
    flex: 1,
  },
  {
    field: "quantity",
    headerName: "Số lượng",
    editable: false,
    flex: 1,
  },
  {
    field: "totalPrice",
    headerName: "Tổng tiền",
    editable: false,
    flex: 1,
  },
];

export const headCellsPrescriptionPrint = [
  {
    id: "name",
    numeric: false,
    label: "Tên dịch vụ",
  },
  {
    id: "price",
    numeric: false,
    label: "Giá",
  },
  {
    id: "quantity",
    numeric: false,
    label: "Số lượng",
  },
  {
    id: "totalPrice",
    numeric: false,
    label: "Tổng tiền",
  },
];
