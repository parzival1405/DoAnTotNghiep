import * as api from "../../api";
import { GLOBALTYPES } from "../actionType";
const qs = require("qs");

export const login = (formData, navigate) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.START_LOADING,
    });
    const { data } = await api.login(qs.stringify(formData));
    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: data,
    });

    navigate("/Homepage");

    dispatch({
      type: GLOBALTYPES.END_LOADING,
    });

    localStorage.setItem("firstLogin", true);
    localStorage.setItem("token", data.access_token);
    localStorage.setItem("refreshToken", data.refresh_token);
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.END_LOADING,
    });
    alert(error.response.data.message);
  }
};

export const refreshToken = () => async (dispatch) => {
  const firstLogin = JSON.parse(localStorage.getItem("firstLogin"));
  if (firstLogin) {
    try {
      dispatch({
        type: GLOBALTYPES.START_LOADING,
      });
      const { data } = await api.refreshLogin();
      console.log(data);
      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: data,
      });

      dispatch({
        type: GLOBALTYPES.END_LOADING,
      });

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("refreshToken", data.refresh_token);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.END_LOADING,
      });
      alert(err.response.data.message);
    }
  }
};

export const logout = (navigate) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.START_LOADING,
    });
    dispatch({
      type: GLOBALTYPES.LOGOUT,
    });
    dispatch({
      type: GLOBALTYPES.END_LOADING,
    });
    // dispatch({
    //   type: GLOBALTYPES.CLEAR,
    // });
    localStorage.clear();
    navigate("/login");
  } catch (error) {
    console.log(error);
  }
};

export const forgotPassword = (data, navigate) => async (dispatch) => {
  try {
    await api.forgotPassword(data.phone_number);
    alert("Lấy lại mật khẩu thành công");
    navigate("/login");
  } catch (error) {
    console.log(error);
  }
};

// export const refreshToken = () => async (dispatch) => {
//   const firstLogin = JSON.parse(sessionStorage.getItem("firstLogin"));
//   if (firstLogin) {
//     try {
//       const { data } = await api.refreshLogin();
//       dispatch({
//         type: GLOBALTYPES.AUTH,
//         data,
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   }
// };

// export const signup = (formData, navigate) => async (dispatch) => {
//   try {
//     const { data } = await api.signUp(formData);
//     dispatch({ type: GLOBALTYPES.AUTH, data });
//     navigate("/Homepage");
//   } catch (error) {
//     alert(error.response.data.message);
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
