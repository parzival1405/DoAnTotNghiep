export const bloodResultColumn = [
  { field: "thongSo", editable: false,flex: 1, headerName: "Thông số" },
  { field: "nam", editable: false,flex: 1, headerName: "Nam" },
  { field: "nu", editable: false,flex: 1, headerName: "Nữ" },
  { field: "donVi", editable: false,flex: 1, headerName: "Đơn vị" },
  { field: "ketQua", editable: true,flex: 1, headerName: "Kết quả" },
];

export const bloodResult = [
  { id:1, thongSo: "Hồng cầu",nam: "4.29-5.70", nu: "3.72-5.06", donVi: "10^12/L", ketQua:""},
  { id:2, thongSo: "Hematocrit",nam: "0.38-0.50", nu: "30.35-0.47", donVi: "L/L", ketQua:""},
  { id:3, thongSo: "Hemoglobin",nam: "133-166", nu: "110-147", donVi: "g/L", ketQua:""},
  { id:4, thongSo: "Bạch cầu",nam: "3.58-8.15", nu: "3.17-8.4", donVi: "10^9/L", ketQua:""},
  { id:5, thongSo: "Tiểu cầu", nam: "172-359", nu: "167-390", donVi: "10^9/L", ketQua:""},
];

export const urineResultColumn = [
  { field: "thongSo", editable: false,flex: 1, headerName: "Thông số" },
  { field: "bt", editable: false,flex: 1, headerName: "Trị số bình thường" },
  { field: "ketQua", editable: true,flex: 1, headerName: "Kết quả" },
];

export const urineResult = [
  { id:1, thongSo: "Tỷ trọng",bt:"1,015-1,025",ketQua:""},
  { id:2, thongSo: "pH",bt:"4,8-7,4",ketQua:""},
  { id:3, thongSo: "Tế bào bạch cầu",bt:"<10Ul",ketQua:""},
  { id:4, thongSo: "Tế bào hồng cầu", bt:"<10Ul",ketQua:""},
  { id:5, thongSo: "Nitri",bt:"Âm tính",ketQua:""},
  { id:6, thongSo: "Protetin",bt:"<0.1g/L",ketQua:""},
  { id:7, thongSo: "Glucose",bt:"<0,84 mmol/L",ketQua:""},
  { id:8, thongSo: "Thể cetonic",bt:"<0,84 mmol/L",ketQua:""},
  { id:9, thongSo: "Bilirubin",bt:"<3,4 mmol/L",ketQua:""},
  { id:10, thongSo: "Urobilinogen",bt:"<16,9 mmol/L",ketQua:""},
];
