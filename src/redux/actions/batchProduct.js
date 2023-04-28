import * as api from "../../api";
import { GLOBALTYPES } from "../actionType";
import axios from "axios";

export const saveBatchProduct = (formData) => async (dispatch) => {
  try {
    const { data } = await api.saveBatchDrugs(formData);
    dispatch({
      type: GLOBALTYPES.ADD_BATCH_DRUG,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};
export const saveArrayDrug = (arrayDrug) => async (dispatch) => {
  try {
    Promise.all(
      arrayDrug.map(async (item) => {
        const headers = {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        };
        const data = {
          name: item.name,
          description: item.description,
          benefit: item.benefit || "benefit",
          price: item.price,
          vienVi: item.vienVi,
          viHop: item.viHop,
          hopThung: item.hopThung,
          categoryDrugId: item.categoryDrugId,
          note: item.note,
        };

        return axios.post(
          `${process.env.REACT_APP_URL_SERVER}api/drugs`,
          data,
          {
            headers: headers,
          }
        );
      })
    ).then(function (response) {
      // console.log(response.data);
      arrayDrug.map((item, index) => {
        console.log({ ...item, id: response[index].data.id })
        dispatch({
          type: GLOBALTYPES.RESPONSE_NEW_PRODUCT,
          payload: {
            data: { ...item, id: response[index].data.id },
            oldId: item.id,
          },
        });
      });
    });
  } catch (err) {
    console.log(err);
  }
};

export const newProductFromAddProductModal = (data) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.ADD_DRUG_BY_ANOTHER_MODAL,
      payload: { data: data, type: "NEW" },
    });
  } catch (err) {
    console.log(err);
  }
};

export const addNewProductToBatch = (data) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.ADD_NEW_PRODUCT_TO_BATCH,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const removeNewProductInBatch = (data) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.REMOVE_NEW_PRODUCT_IN_BATCH,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateNewProductInBatch = (data) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.UPDATE_NEW_PRODUCT_IN_BATCH,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getAllBatchProduct = () => async (dispatch) => {
  try {
    const { data } = await api.getAllBatchDrugs();
    dispatch({
      type: GLOBALTYPES.GET_ALL_BATCH_DRUG,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};
