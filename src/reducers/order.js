import { SET_ORDER_TYPE } from '../actions/orderActionTypes';

export default (order = (state = {}, action) => {
  switch (action.type) {
    case SET_ORDER_TYPE:
      return {
        ...state,
        type: action.orderType,
      };
    default:
      return state;
  }
});
