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
import AddServiceGroupsSide from "./AddServiceGroupsSide";
import AddSupplierSide from "./AddSupplierSide";
import Loading from "../Loading";
import useStyle from "./styles";
import {
  callAPIForPatientReceptionSide,
  callAPIForPatientSide,
  callAPIForScheduleSide,
  callAPIForMedicalExaminationSide,
  callAPIForProductSide,
} from "../../redux/actions/callAPI";
import { getCurrentDateString } from "../../utils/Calc";

function Side() {
  const { IDSelected, ParentWithSelectedChild } = useSelector(
    (state) => state.sidebar
  );
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
      // dispatch(getAllPatient());
      case "LHK":
        let formData = new FormData();
        formData.append("from", getCurrentDateString());
        formData.append("to", getCurrentDateString());
        dispatch(callAPIForScheduleSide(formData));
        break;
      case "QLTT":
      // dispatch(getAllPatient());
      case "TDBN":
        dispatch(callAPIForPatientReceptionSide());
        break;
      case "DSDV":
      // dispatch(getAllPatient());
      case "HMB":
        // dispatch(callAPIForMedicalExaminationSide());
        break;
      case "NSP":
      // dispatch(getAllPatient());
      case "NQ":
      // dispatch(getAllExamination());
      case "BNN":
        dispatch(callAPIForPatientSide());
        break;
      case "NMSP":
      // dispatch(getAllExamination());
      case "PRD":
        dispatch(callAPIForProductSide());
        break;
      case "DVKM":
      // dispatch(getAllExamination());
      case "NCCDV":
      // dispatch(getAllExamination());
    }

    setItem(item);
  }, [IDSelected]);

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
        {/* 
        {item?.id == "CHGB" && <ConfigSellingPriceSide item={item} />}
         */}
      </Layout>
    )
  );
}

export default Side;
