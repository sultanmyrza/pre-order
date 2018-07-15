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

describe('ORDER REDUCER', () => {
  it('set order type', () => {
    const stateBefore = {
      type: undefined,
    };
    const action1 = {
      type: SET_ORDER_TYPE,
      orderType: 'pickup',
    };
    const action2 = {
      type: SET_ORDER_TYPE,
      orderType: 'reservation',
    };
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
    const action = {
      type: SET_ORDER_TIME,
      time: '16:00',
    };
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
    const action = {
      type: SET_ORDER_TABLE,
      tables: 3,
    };
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
    };
    const action = {
      type: ORDER_ADD_ITEM,
      item: {
        id: 1,
        price: 7900,
        cookTimeInSec: 180,
      },
    };
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
    };
    const action = {
      type: ORDER_ADD_ITEM,
      item: {
        id: 1,
        price: 8600,
        cookTimeInSec: 120,
      },
    };
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
    };

    Object.freeze(stateBefore);
    expect(orders(stateBefore, action)).toEqual(stateAfter);
  });

  it('decrease quantity of non existing item  ', () => {
    const stateBefore = {
      itemsByIds: {},
    };
    const action = {
      type: ORDER_REMOVE_ITEM,
      item: {
        id: 1,
        price: 7900,
        cookTimeInSec: 180,
      },
    };
    const stateAfter = {
      itemsByIds: {},
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
    };
    const action = {
      type: ORDER_REMOVE_ITEM,
      item: {
        id: 1,
        price: 7900,
        cookTimeInSec: 180,
      },
    };
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
    };
    const action = {
      type: ORDER_REMOVE_ITEM,
      item: {
        id: 1,
        price: 7900,
        cookTimeInSec: 180,
      },
    };
    const stateAfter = {
      itemsByIds: {},
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
    };
    const action = {
      type: CANCEL_ORDER,
    };
    const stateAfter = {};

    Object.freeze(stateBefore);
    expect(orders(stateBefore, action)).toEqual(stateAfter);
  });

  it('change order type from pickup to reservation', () => {
    const stateBefore = {
      type: 'pickup',
      time: '16:00',
    };
    const action = {
      type: CHANGE_ORDER_TYPE,
      orderType: 'reservation',
    };
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
    const action = {
      type: CHANGE_ORDER_TYPE,
      orderType: 'pickup',
    };
    const stateAfter = {
      type: 'pickup',
      time: '16:00',
    };

    Object.freeze(stateBefore);

    expect(orders(stateBefore, action)).toEqual(stateAfter);
  });
});
