import { GLOBALTYPES } from "../../actionType";
const initState = {
  medicineOfPrescription: [],
  addOrDeleteDrug: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case GLOBALTYPES.PRESCRIPTION_CURRENT_PATIENT:
      return {
        ...state,
        medicineOfPrescription: action.payload,
      };
    case GLOBALTYPES.ADD_MEDICINE_OF_PRESCRIPTION:
      const medicineOfPrescription = state.medicineOfPrescription;
      const finder = medicineOfPrescription.find(
        (e) => e.id == action.payload.id
      );
      if (!finder) {
        return {
          ...state,
          medicineOfPrescription: [
            action.payload,
            ...state.medicineOfPrescription,
          ],
          addOrDeleteDrug: [
            {
              drugId: action.payload.id,
              quantity: 0,
              designate: "",
              type: "add",
            },
            ...state.addOrDeleteDrug,
          ],
        };
      } else {
        return {
          ...state,
        };
      }
    case GLOBALTYPES.REMOVE_MEDICINE_OF_PRESCRIPTION:
      const addOrDeleteDrug = state.addOrDeleteDrug;
      const finder2 = addOrDeleteDrug?.find(
        (e) => e?.drugId == action.payload.id
      );
      if (!finder2) {
        return {
          ...state,
          medicineOfPrescription: state.medicineOfPrescription.filter(
            (item) => item.id !== action.payload.id
          ),
          addOrDeleteDrug: [
            { drugId: action.payload.id, type: "delete" },
            ...state.addOrDeleteDrug,
          ],
        };
      } else {
        if (finder2.type == "add") {
          return {
            ...state,
            medicineOfPrescription: state.medicineOfPrescription.filter(
              (item) => item.id !== action.payload.id
            ),
            addOrDeleteDrug: state.addOrDeleteDrug.filter(
              (item) => item.drugId != finder2.drugId
            ),
          };
        }
      }
    case GLOBALTYPES.UPDATE_MEDICINE_OF_PRESCRIPTION:
      const { designate, purchaseQuantity } = action.payload;
      const addOrDeleteDrug2 = state.addOrDeleteDrug.find(
        (e) => e.drugId == action.payload.id
      );
      if (!addOrDeleteDrug2) {
        return {
          ...state,
          addOrDeleteDrug: [
            {
              drugId: action.payload.id,
              quantity: purchaseQuantity,
              designate: designate,
              type: "update",
            },
            ...state.addOrDeleteDrug,
          ],
        };
      } else {
        return {
          ...state,
          medicineOfPrescription: state.medicineOfPrescription.map((item) =>
            item.id == action.payload.id
              ? { ...item, purchaseQuantity: purchaseQuantity, designate: designate }
              : item
          ),
          addOrDeleteDrug: state.addOrDeleteDrug.map((item) =>
            item.drugId == action.payload.id
              ? { ...item, quantity: purchaseQuantity, designate: designate }
              : item
          ),
        };
      }
    case GLOBALTYPES.CLEAR_SERVICE_AND_DRUG: {
      return {
        ...state,
        addOrDeleteDrug: [],
      };
    }

    default:
      return state;
  }
};
