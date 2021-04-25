import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_ADRESS,
  CART_SAVE_PAYMENT_METHOD,
} from "../constences/cartConstence";

export const addToCart = (id, quantity) => async (dispatch, getState) => {
  const response = await axios.get("/api/products/" + id);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: response.data._id,
      name: response.data.name,
      image: response.data.image,
      price: response.data.price,
      countInStock: response.data.countInStock,
      quantity,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  // the raison why we are using JSONStringfy, bzc we can only sore string in local storage
};

export const deleteFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (formData) => (dispatch) => {
  // data is comming from form that we fild up
  dispatch({
    type: CART_SAVE_ADRESS,
    payload: formData,
  });
  localStorage.setItem("shippingAddress", JSON.stringify(formData));
};

export const savePaymentMethod = (formData) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: formData,
  });
  localStorage.setItem("paymentMethod", JSON.stringify(formData));
};
