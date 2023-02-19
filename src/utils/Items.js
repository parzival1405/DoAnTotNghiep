import {
  AdminPanelSettings,
  Person,
  PersonAdd,
  Settings,
  LocalHospital,
  MedicalServices,
  Vaccines,
  EventAvailable,
  ExpandMore,
  ExpandLess,
  Sick,
  StackedBarChart,
  SignalCellular0Bar,
  SignalCellularAlt,
  SignalCellularAlt1Bar,
  PriceCheck,
  Warehouse,
  AddBusiness,
  Healing,
  QueryStats,
} from "@mui/icons-material";
import { ListItemAvatar } from "@mui/material";

export const items = [
  {
    id: "ADM",
    name: "Admin",
    icon: <AdminPanelSettings />,
    subMenu: [
      {
        id: "TKNV",
        name: "Tài khoản/nhân viên",
        icon: <PersonAdd />,
        subMenu: [],
      },
      { id: "CDT", name: "Cài đặt", icon: <Settings />, subMenu: [] },
    ],
  },
  {
    id: "LTN",
    name: "Lễ tân",
    icon: <Person />,
    subMenu: [
      { id: "TDBN", name: "Tiếp đón bệnh nhân", icon: <Sick />, subMenu: [] },
      {
        id: "LHK",
        name: "Lịch hẹn khám",
        icon: <EventAvailable />,
        subMenu: [],
      },
    ],
  },
  { id: "HMB", name: "Khám bệnh", icon: <LocalHospital />, subMenu: [] },
  { id: "DV", name: "Dịch vụ", icon: <MedicalServices />, subMenu: [] },
  {
    id: "SP",
    name: "Sản phẩm",
    icon: <Vaccines />,
    subMenu: [
      {
        id: "CHGB",
        name: "Cấu hình giá bán",
        icon: <PriceCheck />,
        subMenu: [],
      },
      { id: "TNK", name: "Tồn kho", icon: <Warehouse />, subMenu: [] },
      {
        id: "NSP",
        name: "Nhập sản phẩm",
        icon: <AddBusiness />,
        subMenu: [],
      },
      { id: "DNT", name: "Đơn thuốc", icon: <Healing />, subMenu: [] },
    ],
  },
  {
    id: "BC",
    name: "Báo cáo",
    icon: <StackedBarChart />,
    subMenu: [
      {
        id: "CTLK",
        name: "Chi tiết loại Khám",
        icon: <SignalCellularAlt />,
        subMenu: [],
      },
      {
        id: "THLK",
        name: "Tổng hợp loại khám",
        icon: <SignalCellularAlt />,
        subMenu: [],
      },
      {
        id: "THDV",
        name: "Tổng hợp dịch vụ",
        icon: <SignalCellularAlt />,
        subMenu: [],
      },
      {
        id: "THDT",
        name: "Tổng hợp doanh thu",
        icon: <QueryStats />,
        subMenu: [],
      },
    ],
  },
];

export const itemMap = new Map([
  ["TKNV", "ADM"],
  ["CDT", "ADM"],

  ["TDBN", "LTN"],
  ["LHK", "LTN"],

  ["CHGB", "SP"],
  ["TNK", "SP"],
  ["NSP", "SP"],
  ["DNT", "SP"],

  ["CTLK", "BC"],
  ["THLK", "BC"],
  ["THDV", "BC"],
  ["THDT", "BC"],
]);
