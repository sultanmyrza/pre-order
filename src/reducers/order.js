import {
  SET_ORDER_TYPE,
  SET_ORDER_TIME,
  SET_ORDER_TABLE,
  ORDER_ADD_ITEM,
  ORDER_REMOVE_ITEM,
  CANCEL_ORDER,
  CHANGE_ORDER_TYPE,
  FINISH_ORDER,
} from '../actions/orderActionTypes';

let orderInitialState = {
  itemsByIds: {},
  totalPrice: 0,
  totalCookTime: 0,
  totalItems: 0,
};

export default function orders(state = orderInitialState, action) {
  let newState;
  let itemId;
  switch (action.type) {
    case SET_ORDER_TYPE:
      return {
        ...state,
        type: action.orderType,
      };
    case SET_ORDER_TIME:
      return {
        ...state,
        time: action.time,
      };
    case SET_ORDER_TABLE:
      return {
        ...state,
        tables: action.tables,
      };
    case ORDER_ADD_ITEM:
      itemId = action.item.id;
      newState = {
        ...state,
        itemsByIds: {
          ...state.itemsByIds,
          [itemId]: order(state.itemsByIds[itemId], action),
        },
      };
      newState.totalPrice = sumUp(newState.itemsByIds, 'price');
      newState.totalCookTime = sumUp(newState.itemsByIds, 'cookTimeInSec');
      newState.totalItems = sumUp(newState.itemsByIds, 'quantity');
      return newState;
    case ORDER_REMOVE_ITEM:
      itemId = action.item.id;
      newState = {
        ...state,
        itemsByIds: {
          ...state.itemsByIds,
          [itemId]: order(state.itemsByIds[action.item.id], action),
        },
      };
      newState.totalPrice = sumUp(newState.itemsByIds, 'price');
      newState.totalCookTime = sumUp(newState.itemsByIds, 'cookTimeInSec');
      newState.totalItems = sumUp(newState.itemsByIds, 'quantity');
      return newState;
    case CANCEL_ORDER:
      return {
        itemsByIds: {},
        totalCookTime: 0,
        totalPrice: 0,
        totalItems: 0,
      };
    case CHANGE_ORDER_TYPE:
      newState = { ...state, type: action.orderType };
      if (action.orderType === 'pickup') {
        delete newState.tables;
        return newState;
      } else {
        newState.tables = 1;
        return newState;
      }
    case FINISH_ORDER:
      return {
        ...state,
        consumer: action.consumer,
        provider: action.provider,
        orderNumber: action.orderNumber,
        timestamp: action.timestamp,
        status: action.status,
      };
    default:
      return state;
  }
}

function sumUp(items, key) {
  let totalSum = Object.keys(items).reduce((sum, item) => {
    item = items[item];
    if (item === undefined) {
      return 0;
    }
    let value = item[key];
    let quantity = item.quantity;
    if (key !== 'quantity') {
      return sum + value * quantity;
    } else {
      return sum + value;
    }
  }, 0);
  return totalSum;
}

function order(state, action) {
  switch (action.type) {
    case ORDER_ADD_ITEM:
      if (state === undefined) {
        return {
          ...action.item,
          quantity: 1,
        };
      } else {
        return {
          ...state,
          id: action.item.id,
          quantity: state.quantity + 1,
        };
      }
    case ORDER_REMOVE_ITEM:
      if (state === undefined || state.quantity <= 1) {
        return undefined;
      } else {
        return {
          ...state,
          quantity: state.quantity - 1,
        };
      }
    default:
      return state;
  }
}
