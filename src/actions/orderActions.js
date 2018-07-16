import {
  SET_ORDER_TYPE,
  SET_ORDER_TIME,
  SET_ORDER_TABLE,
  ORDER_ADD_ITEM,
  ORDER_REMOVE_ITEM,
  CANCEL_ORDER,
  CHANGE_ORDER_TYPE,
} from './orderActionTypes';

export const setOrderType = orderType => ({
  type: SET_ORDER_TYPE,
  orderType,
});

export const setOrderTime = orderTime => ({
  type: SET_ORDER_TIME,
  time: orderTime,
});

export const setOrderTable = orderTable => ({
  type: SET_ORDER_TABLE,
  tables: orderTable,
});

export const orderAddItem = item => ({
  type: ORDER_ADD_ITEM,
  item,
});

export const orderRemoveItem = item => ({
  type: ORDER_REMOVE_ITEM,
  item,
});

export const cancelOrder = () => ({
  type: CANCEL_ORDER,
});

export const changeOrderType = orderType => ({
  type: CHANGE_ORDER_TYPE,
  orderType,
});
