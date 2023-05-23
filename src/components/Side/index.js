import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GLOBALTYPES } from "../../redux/actionType";
import {
  callAPIForAccountSide,
  callAPIForAddPrescriptionSide,
  callAPIForAddProductSide,
  callAPIForAddSupplierSide,
  callAPIForMedicalExaminationSide,
  callAPIForPatientReceptionSide,
  callAPIForPatientSide,
  callAPIForProductSide,
  callAPIForScheduleSide,
  callAPIForServiceListSide,
  callAPIServicePaymentSide,
  getCategoryProductExamination,
} from "../../redux/actions/callAPI";
import { getCurrentDateString } from "../../utils/Calc";
import { items } from "../../utils/Items";
import Loading from "../Loading";
import AccountSide from "./AccountSide";
import AddProductSide from "./AddProductSide";
import AddServiceGroupsSide from "./AddServiceSide";
import AddSupplierSide from "./AddSupplierSide";
import AdviseSide from "./AdviseSide";
import FileManagementSide from "./FileManagementSide";
import InventorySide from "./InventorySide";
import Layout from "./Layout";
import MedicalExaminationSide from "./MedicalExaminationSide";
import PatientReceptionSide from "./PatientReceptionSide";
import PatientSide from "./PatientSide";
import PermissionSide from "./PermissionSide";
import PrescriptionSide from "./PrescriptionSide";
import ProductGroupsSide from "./ProductGroupsSide";
import ProductSide from "./ProductSide";
import SaleReportSide from "./SaleReportSide";
import ScheduleSide from "./ScheduleSide";
import ServiceListSide from "./ServiceListSide";
import ServicePaymentSide from "./ServicePaymentSide";
import useStyle from "./styles";

const permission = {
  admin: ["ADMIN"],
  doctor: ["DOCTOR"],
  reception: ["RECEPTIONIST"],
  drugDealer: ["DRUG_DEALER"],
};

function Side() {
  const { IDSelected, ParentWithSelectedChild } = useSelector(
    (state) => state.sidebar
  );
  const { socket } = useSelector((state) => state.socket);
  const { user } = useSelector((state) => state.auth);
  const { client } = useSelector((state) => state.stomp);
  const numberOfDoctorOnline = useSelector((state) => state.onlineDoctor.numberOfDoctorOnline);
  const classes = useStyle();
  const { isLoadingCallApi } = useSelector((state) => state.loading);

  const dispatch = useDispatch();
  const [item, setItem] = useState();

  const FindCurrentSide = () => {
    for (let i = 0; i < items.length; i++) {
      if (items[i].id == ParentWithSelectedChild) {
        return items[i].subMenu.find((i) => i.id == IDSelected);
      } else if (items[i].id == IDSelected) {
        return items[i];
      }
    }
  };

  useEffect(() => {
    const item = FindCurrentSide();

    switch (item.id) {
      case "TKNV":
        dispatch(callAPIForAccountSide());
        break;
      case "LHK":
        var formData = new FormData();
        formData.append("from", getCurrentDateString());
        formData.append("to", getCurrentDateString());
        dispatch(callAPIForScheduleSide(formData));
        break;
      case "QLTT":
        // dispatch(getAllPatient());
        break;
      case "TDBN":
        var date = getCurrentDateString();
        var formData = new FormData();
        formData.append("date", date);
        dispatch(callAPIForPatientReceptionSide(formData));
        break;
      case "DSDV":
        var date = getCurrentDateString();
        var formData = new FormData();
        formData.append("date", date);
        dispatch(callAPIForServiceListSide(formData));
        break;
      case "HMB":
        var currentDay = getCurrentDateString();

        var formData = new FormData();
        formData.append("date", currentDay);
        formData.append("roomId", user.room.id);
        formData.append("doctorId", user.id);

        var formData2 = new FormData();
        formData2.append("date", currentDay);
        formData2.append("departmentId", parseInt(user.room.medicalDepartment.id));
   
        dispatch(callAPIForMedicalExaminationSide(formData,formData2,numberOfDoctorOnline,client));
        break;
      case "NSP":
        dispatch(callAPIForAddProductSide());
        break;
      case "NQ":
        break;
      case "BNN":
        dispatch(callAPIForPatientSide());
        break;
      case "NMSP":
        dispatch(getCategoryProductExamination());
        break;
      case "PRD":
        dispatch(callAPIForProductSide());
        break;
      case "DVKM":
        // dispatch(callAPIForServiceListSide(formData));
        break;
      case "NCCDV":
        dispatch(callAPIForAddSupplierSide());
        break;
      case "DNT":
        var date = getCurrentDateString();
        var formData = new FormData();
        formData.append("date", date);
        dispatch(callAPIForAddPrescriptionSide(formData));
        break;
      case "TTDV":
        var date = getCurrentDateString();
        var formData = new FormData();
        formData.append("date", date);
        dispatch(callAPIServicePaymentSide(formData));
        break;
    }

    setItem(item);
  }, [IDSelected,numberOfDoctorOnline]);

  useEffect(() => {
    socket?.current.on("receiveMedicalExamination", (data) => {
      console.log(data);
      dispatch({
        type: GLOBALTYPES.DOCTOR_RECEIVE_EXAMINATION,
        payload: data,
      });
    });

    return () => socket?.current.off("receiveMedicalExamination");
  }, [socket, dispatch]);

  useEffect(() => {
    socket?.current.on("receiveMedicalLetter", (data) => {
      dispatch({
        type: GLOBALTYPES.ADD_MEDICAL_LETTER,
        payload: data,
      });
    });

    return () => socket?.current.off("receiveMedicalLetter");
  }, [socket, dispatch]);

  useEffect(() => {
    socket?.current.on("receiveMessage", (data) => {
      console.log({
        customerId: data.customerId,
        name: data.name,
        userId: user.id,
      });
      dispatch({
        type: GLOBALTYPES.CREATE_CONVERSATION,
        payload: {
          customerId: data.customerId,
          name: data.name,
          userId: user.id,
        },
      });

      dispatch({
        type: GLOBALTYPES.RECEIVE_MESSAGE,
        payload: { ...data, userId: user.id, sendBy: data.customerId },
      });
    });

    return () => socket?.current.off("receiveMessage");
  }, [socket, dispatch]);

  useEffect(() => {
    socket?.current.on("receiveDoneServiceCLS", (data) => {
      console.log(data);
      dispatch({
        type: GLOBALTYPES.UPDATE_DONE_SERVICE_CLS,
        payload: data,
      });
    });

    return () => socket?.current.off("receiveDoneServiceCLS");
  }, [socket, dispatch]);

  useEffect(() => {
    socket?.current.on("receiveServicePayment", (data) => {
      dispatch({
        type: GLOBALTYPES.UNPAID_SERVICE_CLS,
        payload: data,
      });
    });

    return () => socket?.current.off("receiveServicePayment");
  }, [socket, dispatch]);

  
  useEffect(() => {
    socket?.current.emit("checkDoctorOnline", user.room.medicalDepartment.id);
  }, [socket, user]);

  useEffect(() => {
    socket?.current.on("numberTofDoctorOnlineToMe", (data) => {
      dispatch({
        type: GLOBALTYPES.ONLINE_DOCTOR,
        payload: data,
      });
    });

    return () => socket?.current.off("numberTofDoctorOnlineToMe");
  }, [socket, dispatch]);

  useEffect(() => {
    socket?.current.on("checkUserOnlineToClient", (data) => {
      dispatch({
        type: GLOBALTYPES.ONLINE_DOCTOR,
        payload: data,
      });
    });

    return () => socket?.current.off("checkUserOnlineToClient");
  }, [socket, user]);

  useEffect(() => {
    socket?.current.on("CheckUserOfflineToClient", (data) => {
      dispatch({
        type: GLOBALTYPES.ONLINE_DOCTOR,
        payload: data,
      });
    });

    return () => socket?.current.off("CheckUserOfflineToClient");
  }, [socket, user]);
  

  return isLoadingCallApi ? (
    <Loading className={classes.positionNone} />
  ) : (
    item?.id && (
      <Layout item={item}>
        {/* 
        {item?.id == "CDT" && <SettingSide item={item} />} */}
        {item?.id == "TKNV" && <AccountSide item={item} />}
        {item?.id == "LHK" && <ScheduleSide item={item} />}
        {item?.id == "QLTT" && <FileManagementSide item={item} />}
        {item?.id == "TDBN" && <PatientReceptionSide item={item} />}
        {item?.id == "HMB" && <MedicalExaminationSide item={item} />}
        {item?.id == "DSDV" && <ServiceListSide item={item} />}
        {item?.id == "NSP" && <AddProductSide item={item} />}
        {item?.id == "TNK" && <InventorySide item={item} />}
        {item?.id == "NQ" && <PermissionSide item={item} />}
        {item?.id == "BNN" && <PatientSide item={item} />}
        {item?.id == "NMSP" && <ProductGroupsSide item={item} />}
        {item?.id == "PRD" && <ProductSide item={item} />}
        {item?.id == "DVKM" && <AddServiceGroupsSide item={item} />}
        {item?.id == "NCCDV" && <AddSupplierSide item={item} />}
        {item?.id == "THDT" && <SaleReportSide item={item} />}
        {item?.id == "DNT" && <PrescriptionSide item={item} />}
        {item?.id == "TTDV" && <ServicePaymentSide item={item} />}
        {item?.id == "TUV" && <AdviseSide item={item} />}
        {/* 
        {item?.id == "CHGB" && <ConfigSellingPriceSide item={item} />}
         */}
      </Layout>
    )
  );
}

export default Side;
