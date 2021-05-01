import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCSESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REST,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCSESS,
  ORDER_DETAILS_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCSESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_DELETE_REQUEST,
  ORDER_LIST_DELETE_SUCCSESS,
  ORDER_LIST_DELETE_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCSESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REST,
  ORDER_MY_LIST_REQUEST,
  ORDER_MY_LIST_SUCCSESS,
  ORDER_MY_LIST_FAIL,
} from "../constences/orderConstence";

import axios from "axios";

export const createAnOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    const {
      userLogin: { userDetail },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userDetail.token,
      },
    };
    const response = await axios.post("/api/orders", order, config);

    dispatch({
      type: ORDER_CREATE_SUCCSESS,

      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userDetail },
    } = getState();
    const config = {
      headers: {
        Authorization: "Bearer " + userDetail.token,
      },
    };
    const response = await axios.get("/api/orders/" + id, config);

    dispatch({
      type: ORDER_DETAILS_SUCCSESS,

      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,

      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const orderPaid = (orderId, paymentResult) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST,
    });

    const {
      userLogin: { userDetail },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userDetail.token,
      },
    };
    const response = await axios.put(
      "/api/orders/" + orderId + "/paid",
      paymentResult,
      config
    );

    dispatch({
      type: ORDER_PAY_SUCCSESS,
      payload: response.data,
    });
    dispatch({
      type: ORDER_CREATE_REST,
    });
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_REQUEST,
    });

    const {
      userLogin: { userDetail },
    } = getState();
    const config = {
      headers: {
        Authorization: "Bearer " + userDetail.token,
      },
    };
    const response = await axios.get("/api/orders/", config);

    dispatch({
      type: ORDER_LIST_SUCCSESS,

      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,

      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getMyOrderList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_MY_LIST_REQUEST,
    });

    const {
      userLogin: { userDetail },
    } = getState();
    const config = {
      headers: {
        Authorization: "Bearer " + userDetail.token,
      },
    };
    const response = await axios.get("/api/orders/myorders", config);

    dispatch({
      type: ORDER_MY_LIST_SUCCSESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_MY_LIST_FAIL,

      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteOrderList = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_DELETE_REQUEST,
    });

    const {
      userLogin: { userDetail },
    } = getState();
    const config = {
      headers: {
        Authorization: "Bearer " + userDetail.token,
      },
    };
    await axios.delete("/api/orders/" + id, config);

    dispatch({
      type: ORDER_LIST_DELETE_SUCCSESS,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_DELETE_FAIL,

      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
