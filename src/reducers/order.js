import {
  SET_ORDER_TYPE,
  SET_ORDER_TIME,
  SET_ORDER_TABLE,
  ORDER_ADD_ITEM,
  ORDER_REMOVE_ITEM,
  CANCEL_ORDER,
  CHANGE_ORDER_TYPE,
} from '../actions/orderActionTypes';

function order(state = undefined, action) {
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

export default function orders(state = {}, action) {
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
      return newState;
    case ORDER_REMOVE_ITEM:
      console.log(ORDER_REMOVE_ITEM);
      itemId = action.item.id;
      console.log(state);
      newState = {
        ...state,
        itemsByIds: {
          ...state.itemsByIds,
          [itemId]: order(state.itemsByIds[action.item.id], action),
        },
      };
      newState.totalPrice = sumUp(newState.itemsByIds, 'price');
      newState.totalCookTime = sumUp(newState.itemsByIds, 'cookTimeInSec');
      console.log(newState);
      return newState;
    case CANCEL_ORDER:
      return {};
    case CHANGE_ORDER_TYPE:
      newState = { ...state, type: action.orderType };
      if (action.orderType === 'pickup') {
        delete newState.tables;
        return newState;
      } else {
        newState.tables = 1;
        return newState;
      }
    default:
      return state;
  }
}

function sumUp(items, key) {
  let totalSum = Object.keys(items).reduce((sum, item) => {
    if (items[item] === undefined) {
      return undefined;
    }
    return sum + items[item][key] * items[item].quantity;
  }, 0);
  return totalSum;
}
