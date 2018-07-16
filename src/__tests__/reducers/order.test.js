import orders from '../../reducers/order';
import {
  SET_ORDER_TYPE,
  SET_ORDER_TIME,
  SET_ORDER_TABLE,
  ORDER_ADD_ITEM,
  ORDER_REMOVE_ITEM,
  CANCEL_ORDER,
  CHANGE_ORDER_TYPE,
} from '../../actions/orderActionTypes';
import {
  setOrderTime,
  setOrderType,
  setOrderTable,
  orderAddItem,
  orderRemoveItem,
  cancelOrder,
  changeOrderType,
} from '../../actions/orderActions';

describe('ORDER REDUCER', () => {
  it('set order type', () => {
    const stateBefore = {
      type: undefined,
    };
    const action1 = setOrderType('pickup');
    const action2 = setOrderType('reservation');
    const stateAfterAction1 = {
      type: 'pickup',
    };
    const stateAfterAction2 = {
      type: 'reservation',
    };

    Object.freeze(stateBefore);
    Object.freeze(action1);
    Object.freeze(action2);
    expect(orders(stateBefore, action1)).toEqual(stateAfterAction1);
    expect(orders(stateBefore, action2)).toEqual(stateAfterAction2);
  });

  it('set order time', () => {
    const stateBefore = {
      time: undefined,
    };
    const action = setOrderTime('16:00');
    const stateAfter = {
      time: '16:00',
    };

    Object.freeze(stateBefore);
    Object.freeze(action);

    expect(orders(stateBefore, action)).toEqual(stateAfter);
  });

  it('set tables', () => {
    const stateBefore = {
      tables: undefined,
    };
    const action = setOrderTable(3);
    const stateAfter = {
      tables: 3,
    };

    Object.freeze(action);
    Object.freeze(stateBefore);

    expect(orders(stateBefore, action)).toEqual(stateAfter);
  });

  it('increase quantity of non existing item  ', () => {
    const stateBefore = {
      itemsByIds: {},
      totalPrice: 0,
      totalCookTime: 0,
      totalItems: 0,
    };
    const action = orderAddItem({
      id: 1,
      price: 7900,
      cookTimeInSec: 180,
    });
    const stateAfter = {
      itemsByIds: {
        1: {
          id: 1,
          price: 7900,
          cookTimeInSec: 180,
          quantity: 1,
        },
      },
      totalPrice: 7900,
      totalCookTime: 180,
      totalItems: 1,
    };

    Object.freeze(stateBefore);
    expect(orders(stateBefore, action)).toEqual(stateAfter);
  });

  it('increase quantity of existing item  ', () => {
    const stateBefore = {
      itemsByIds: {
        1: {
          price: 8600,
          cookTimeInSec: 120,
          quantity: 1,
        },
      },
      totalPrice: 0,
      totalCookTime: 0,
      totalItems: 1,
    };
    const action = orderAddItem({
      id: 1,
      price: 8600,
      cookTimeInSec: 120,
    });
    const stateAfter = {
      itemsByIds: {
        1: {
          id: 1,
          price: 8600,
          cookTimeInSec: 120,
          quantity: 2,
        },
      },
      totalPrice: 2 * 8600,
      totalCookTime: 2 * 120,
      totalItems: 2,
    };

    Object.freeze(stateBefore);
    expect(orders(stateBefore, action)).toEqual(stateAfter);
  });

  it('decrease quantity of non existing item  ', () => {
    const stateBefore = {
      itemsByIds: {},
      totalCookTime: 0,
      totalPrice: 0,
      totalItems: 0,
    };
    const action = orderRemoveItem({
      id: 1,
      price: 7900,
      cookTimeInSec: 180,
    });
    const stateAfter = {
      itemsByIds: {},
      totalCookTime: 0,
      totalPrice: 0,
      totalItems: 0,
    };

    Object.freeze(stateBefore);
    expect(orders(stateBefore, action)).toEqual(stateAfter);
  });

  it('decrease quantity of existing item ', () => {
    const stateBefore = {
      itemsByIds: {
        1: {
          price: 7900,
          cookTimeInSec: 180,
          quantity: 2,
        },
      },
      totalPrice: 7900 * 2,
      totalCookTime: 180 * 2,
      totalItems: 4,
    };
    const action = orderRemoveItem({
      id: 1,
      price: 7900,
      cookTimeInSec: 180,
    });
    const stateAfter = {
      itemsByIds: {
        1: {
          price: 7900,
          cookTimeInSec: 180,
          quantity: 1,
        },
      },
      totalPrice: 7900 * 1,
      totalCookTime: 180 * 1,
      totalItems: 1,
    };

    Object.freeze(stateBefore);
    expect(orders(stateBefore, action)).toEqual(stateAfter);
  });

  it('decrease quantity of existing item qunatity = 1', () => {
    const stateBefore = {
      itemsByIds: {
        1: {
          price: 7900,
          cookTimeInSec: 180,
          quantity: 1,
        },
      },
      totalCookTime: 180,
      totalPrice: 7900,
      totalItems: 1,
    };
    const action = orderRemoveItem({
      id: 1,
      price: 7900,
      cookTimeInSec: 180,
    });
    const stateAfter = {
      itemsByIds: {},
      totalCookTime: 0,
      totalPrice: 0,
      totalItems: 0,
    };

    Object.freeze(stateBefore);
    expect(orders(stateBefore, action)).toEqual(stateAfter);
  });

  it('cancel order', () => {
    const stateBefore = {
      type: 'reservation',
      time: '16:00',
      tables: 3,
      itemsByIds: {
        1: { price: 7900, quantity: 3, cookTimeInSec: 180 },
        2: { price: 8200, quantity: 2, cookTimeInSec: 360 },
      },
      totalCookTime: 180 * 3 + 360 * 2,
      totalPrice: 7900 * 3 + 8200 * 2,
      totalItems: 0,
    };
    const action = cancelOrder();
    const stateAfter = {
      itemsByIds: {},
      totalCookTime: 0,
      totalPrice: 0,
      totalItems: 0,
    };

    Object.freeze(stateBefore);
    expect(orders(stateBefore, action)).toEqual(stateAfter);
  });

  it('change order type from pickup to reservation', () => {
    const stateBefore = {
      type: 'pickup',
      time: '16:00',
    };
    const action = changeOrderType('reservation');
    const stateAfter = {
      type: 'reservation',
      time: '16:00',
      tables: 1,
    };

    Object.freeze(stateBefore);

    expect(orders(stateBefore, action)).toEqual(stateAfter);
  });

  it('change order type from reservation to pickup', () => {
    const stateBefore = {
      type: 'reservation',
      time: '16:00',
      tables: 3,
    };
    const action = changeOrderType('pickup');
    const stateAfter = {
      type: 'pickup',
      time: '16:00',
    };

    Object.freeze(stateBefore);

    expect(orders(stateBefore, action)).toEqual(stateAfter);
  });
});
