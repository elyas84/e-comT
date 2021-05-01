import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DEATAILS_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_REST,
  PRODUCT_CREATE__REST,
  PRODUCT_UPDATE_FAIL,
} from "../constences/productConstence";

import axios from "axios";

export const getProductList = (keyword = "") => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_LIST_REQUEST,
    });
    const response = await axios.get("/api/products?keyword=" + keyword);
    // const response = await axios.get('https://fakestoreapi.com/products');
    console.log(response)
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const productListDetail = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DETAILS_REQUEST,
    });
    const response = await axios.get("/api/products/" + id);
    // const response = await axios.get("https://fakestoreapi.com/products/"+id);
    dispatch({
      type: PRODUCT_DEATAILS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REQUEST,
    });

    // Descruct from getState()
    const {
      userLogin: { userDetail },
    } = getState();
    const config = {
      headers: {
        Authorization: "Bearer " + userDetail.token,
      },
    };
    const response = await axios.post("/api/products/",product, config);
    // console.log("res:", res)

    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: response.data,
    });

    dispatch({
      type: PRODUCT_CREATE__REST,
      // this is turnng back to empty {}, not using the ACTION
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_UPDATE_REQUEST,
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
      "/api/products/" + product._id,
      product,
      config
    );

    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,

      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
    });

    const {
      userLogin: { userDetail },
    } = getState();
    const config = {
      headers: {
        Authorization: "Bearer " + userDetail.token,
      },
    };
    await axios.delete("/api/products/" + id, config);

    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,

      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
