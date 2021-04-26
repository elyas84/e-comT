import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REG_REQUEST,
  USER_REG_SUCCESS,
  USER_REG_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_PROFILE_UPDATE_REQUEST,
  USER_PROFILE_UPDATE_SUCCESS,
  USER_PROFILE_UPDATE_FAIL,
} from "../constences/userConstence";

import axios from "axios";
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );
    // console.log("res:", res)

    dispatch({
      type: USER_LOGIN_SUCCESS,
      //   payload: console.log("payload:", res.data),
      payload: response.data,
    });

    localStorage.setItem("userDetail", JSON.stringify(response.data));
  } catch (error) {
    // console.log("error:", error)
    dispatch({
      type: USER_LOGIN_FAIL,
      //    payload: error.res
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const logout = () => (dispatch) => {
  localStorage.removeItem("userDetail");
  localStorage.removeItem("cartItems");
  dispatch({
    type: USER_LOGOUT,
  });
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REG_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      "/api/users/register",
      { name, email, password },
      config
    );

    dispatch({
      type: USER_REG_SUCCESS,
      payload: response.data,
    });

    localStorage.setItem("userDetail", JSON.stringify(response.data));
  } catch (error) {
    dispatch({
      type: USER_REG_FAIL,

      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userProfile = (id) => async (dispatch, getState) => {
  // in this case ID can be a profile
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userDetail },
    } = getState();
    const config = {
      headers: {
        Authorization: "Bearer " + userDetail.token,
      },
    };
    const response = await axios.get("/api/users/" + id, config);
    // console.log("res:", response);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,

      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    });

    const {
      userLogin: { userDetail },
    } = getState();
    const config = {
      headers: {
        Authorization: "Bearer " + userDetail.token,
      },
    };
    const response = await axios.get("/api/users/", config);

    dispatch({
      type: USER_LIST_SUCCESS,

      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,

      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const profileUpdate = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_PROFILE_UPDATE_REQUEST,
    });
    const {
      loginOfUser: { userDetail },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userDetail.token,
      },
    };

    const response = await axios.put("/api/users/profile", user, config);

    // console.log("res: ", res);
    dispatch({
      type: USER_PROFILE_UPDATE_SUCCESS,
      payload: response.data,
      // payload: console.log("payload:", res.data),
      // success: true,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: response.data,
    });

    localStorage.setItem("userDetail", JSON.stringify(response.data));
  } catch (error) {
    dispatch({
      type: USER_PROFILE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    });

    // destructing from getState()
    const {
      userLogin: { userDetail },
    } = getState();
    const config = {
      headers: {
        Authorization: "Bearer " + userDetail.token,
      },
    };
    await axios.delete("/api/users/" + id, config);

    dispatch({
      type: USER_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
