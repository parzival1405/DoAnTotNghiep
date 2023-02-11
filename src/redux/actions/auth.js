import * as api from "../../api";
import { GLOBALTYPES } from "../actionType";

export const login = (formData, navigate) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.START_LOADING,
    });
    // const { data } = await api.login(formData);
    // dispatch({
    //   type: GLOBALTYPES.AUTH,
    //   data,
    // });
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await sleep(2000);

    navigate("/Homepage");

    dispatch({
      type: GLOBALTYPES.END_LOADING,
    });
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.END_LOADING,
    });
    alert(error.response.data.message);
  }
};

export const refresh = () => async (dispatch) => {
  const firstLogin = JSON.parse(sessionStorage.getItem("profile"));
  if (firstLogin) {
    try {
      const { data } = await api.refreshLogin();
      dispatch({
        type: GLOBALTYPES.AUTH,
        data,
      });
    } catch (err) {
      console.log(err);
    }
  }
};

// export const signup = (formData, navigate) => async (dispatch) => {
//   try {
//     const { data } = await api.signUp(formData);
//     dispatch({ type: GLOBALTYPES.AUTH, data });
//     navigate("/Homepage");
//   } catch (error) {
//     alert(error.response.data.message);
//   }
// };

// export const logout = (navigate) => async (dispatch) => {
//   try {
//     dispatch({ type: GLOBALTYPES.LOGOUT });
//     dispatch({ type: GLOBALTYPES.DELETE_GROUP });
//     navigate("/login");
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const forgotPassword = (data, navigate) => async (dispatch) => {
//   try {
//     await api.forgotPassword(data);
//     alert("Lấy lại mật khẩu thành công");
//     navigate("/login");
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const updateProfile = (data) => async (dispatch) => {
//   try {
//     await api.updateProfile(data);
//     dispatch({
//       type: GLOBALTYPES.UPDATEPROFILE,
//       data,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };
