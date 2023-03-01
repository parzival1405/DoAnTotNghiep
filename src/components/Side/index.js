import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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

function Side() {
  const { IDSelected, ParentWithSelectedChild } = useSelector(
    (state) => state.sidebar
  );
  const [item, setItem] = useState();

  useEffect(() => {
    var FindCurrentSide = () => {
      for (let i = 0; i < items.length; i++) {
        if (items[i].id == ParentWithSelectedChild) {
          return items[i].subMenu.find((i) => i.id == IDSelected);
        } else if (items[i].id == IDSelected) {
          return items[i];
        }
      }
    };

    setItem(FindCurrentSide());
  }, [IDSelected]);

  return (
    item?.id && (
      <Layout item={item}>
        {/* {item?.id == "TKNV" && <AccountSide item={item} />}
        {item?.id == "CDT" && <SettingSide item={item} />} */}
        {item?.id == "LHK" && <ScheduleSide item={item} />}
        {item?.id == "QLTT" && <FileManagementSide item={item} />}
        {item?.id == "TDBN" && <PatientReceptionSide item={item} />}
        {item?.id == "HMB" && <MedicalExaminationSide item={item} />}
        {item?.id == "DSDV" && <ServiceListSide item={item} />}
        {item?.id == "NSP" && <AddProductSide item={item} />}
        {item?.id == "TNK" && <InventorySide item={item} />}
        {/* 
        {item?.id == "CHGB" && <ConfigSellingPriceSide item={item} />}
         */}
      </Layout>
    )
  );
}

export default Side;
