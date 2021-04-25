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


export const createOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true, 
      };

    case ORDER_CREATE_SUCCSESS:
      return {
        loading: false, 
        success: true,
        order: action.payload,
      };

    case ORDER_CREATE_FAIL:
      return {
        loading: false, 
        error: action.payload,
        success: false,
      };
    case ORDER_CREATE_REST:
      return {};

    default:
      return state;
  }
};

export const OrderDetailsReducer = (
  state = { orderItems: [], shippingAddress: {}, loading: true },

  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ORDER_DETAILS_SUCCSESS:
      return {
        loading: false,
        order: action.payload,
      };

    case ORDER_DETAILS_FAIL:
      return {
        loading: false, 
        error: action.payload,
      };

    default:
      return state;
  }
};

export const OrderMyListReducer = (
  state = { Myorders: [] },

  action
) => {
  switch (action.type) {
    case ORDER_MY_LIST_REQUEST:
      return {
        ...state,
        loading: true, 
      };

    case ORDER_MY_LIST_SUCCSESS:
      return {
        loading: false, 
        Myorders: action.payload,
      };

    case ORDER_MY_LIST_FAIL:
      return {
        loading: false, 
        error: action.payload,
      };

    default:
      return state;
  }
};

export const OrderPaysReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return {
        loading: true, 
      };

    case ORDER_PAY_SUCCSESS:
      return {
        loading: false, 
        success: true,
      };

    case ORDER_PAY_FAIL:
      return {
        loading: false, 
        error: action.payload,
      };

    case ORDER_PAY_REST:
      return {};
    default:
      return state;
  }
};

export const OrderListReducer = (
  state = { orderlist: [], loading: true },
  action
) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return {
        loading: true,
      };

    case ORDER_LIST_SUCCSESS:
      return {
        loading: false, 
        orderlist: action.payload,
      };

    case ORDER_LIST_FAIL:
      return {
        loading: false, 
        error: action.payload,
      };

    default:
      return state;
  }
};

export const OrderListDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_LIST_DELETE_REQUEST:
      return {
        loading: true,
      };

    case ORDER_LIST_DELETE_SUCCSESS:
      return {
        loading: false, 
        success: true,
      };
    case ORDER_LIST_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
