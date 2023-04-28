import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { items } from "../../utils/Items";
import AccountSide from "./AccountSide";
import SettingSide from "./PrescriptionSide";
import ScheduleSide from "./ScheduleSide";
import ServiceListSide from "./ServiceListSide";
import MedicalExaminationSide from "./MedicalExaminationSide";
import ConfigSellingPriceSide from "./ConfigSellingPriceSide";
import AddProductSide from "./AddProductSide";
import InventorySide from "./InventorySide";
import PatientReceptionSide from "./PatientReceptionSide";
import Layout from "./Layout";
import FileManagementSide from "./FileManagementSide";
import PermissionSide from "./PermissionSide";
import PatientSide from "./PatientSide";
import ProductSide from "./ProductSide";
import ProductGroupsSide from "./ProductGroupsSide";
import AddServiceGroupsSide from "./AddServiceSide";
import AddSupplierSide from "./AddSupplierSide";
import Loading from "../Loading";
import useStyle from "./styles";
import {
  callAPIForPatientReceptionSide,
  callAPIForPatientSide,
  callAPIForScheduleSide,
  callAPIForMedicalExaminationSide,
  callAPIForProductSide,
  getCategoryProductExamination,
  callAPIForServiceListSide,
  callAPIForAddSupplierSide,
  callAPIForAddProductSide,
  callAPIForAccountSide,
  callAPIForAddPrescriptionSide
} from "../../redux/actions/callAPI";
import { getCurrentDateString } from "../../utils/Calc";
import SaleReportSide from "./SaleReportSide";
import PrescriptionSide from "./PrescriptionSide";
import { GLOBALTYPES } from "../../redux/actionType";
import { receiverExaminationLetterCurrentDate } from "../../redux/actions/medicalLetter";

const permission = {
  admin : ["ADMIN"],
  doctor : ["DOCTOR"],
  reception : ["RECEPTIONIST"],
  drugDealer : ["DRUG_DEALER"],
}

function Side() {
  const { IDSelected, ParentWithSelectedChild } = useSelector(
    (state) => state.sidebar
  );
  const { socket } = useSelector((state) => state.socket);
  const {user} = useSelector((state) => state.auth)
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
        var date = getCurrentDateString()
        var formData = new FormData()
        formData.append("date",date)
        dispatch(callAPIForPatientReceptionSide(formData));
        break;
      case "DSDV":
        var date = getCurrentDateString()
        var formData = new FormData()
        formData.append("date",date)
        dispatch(callAPIForServiceListSide(formData));
        break;
      case "HMB":
        var date = getCurrentDateString()
        var formData = new FormData()
        var currentDay = getCurrentDateString();
        formData.append("date",currentDay)
        formData.append("roomId",user.room.id)
        formData.append("doctorId",user.id)
        dispatch(callAPIForMedicalExaminationSide(formData));
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
        dispatch(callAPIForAddPrescriptionSide());
        break;
    }

    setItem(item);
  }, [IDSelected]);

  useEffect(() => {
    socket?.current.on("receiveMedicalExamination", (data) => {
      console.log(data)
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
    socket?.current.on("receiveDoneServiceCLS", (data) => {
      console.log(data)
      // dispatch({
      //   type: GLOBALTYPES.UPDATE_DONE_SERVICE_CLS,
      //   payload: data,
      // });
    });

    return () => socket?.current.off("receiveDoneServiceCLS");
  }, [socket, dispatch]);
  
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
        {/* 
        {item?.id == "CHGB" && <ConfigSellingPriceSide item={item} />}
         */}
      </Layout>
    )
  );
}

export default Side;
