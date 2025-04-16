import {
  initialState,
  clearOrderData,
  orderReducer,
  getOrders,
  getOrderData,
  createOrder
} from '../slices/orderSlice';

describe('проверка создания заказа', () => {
  it('обработка pending', () => {
    const action = { type: createOrder.pending.type };
    const state = orderReducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('обработка fulfilled', () => {
    const mockOrder = {
      ingredients: ['item1', 'item2', 'item3'],
      _id: '67f93007e8e61d001cec1e71',
      status: 'done',
      name: 'Space флюоресцентный био-марсианский бургер',
      createdAt: '2025-04-11T15:06:47.176Z',
      updatedAt: '2025-04-11T15:06:47.861Z',
      number: 74306,
      price: 2480
    };
    const action = {
      type: createOrder.fulfilled.type,
      payload: { order: mockOrder }
    };
    const state = orderReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.orderData).toBe(mockOrder);
    expect(state.error).toBeNull();
  });

  it('обработка rejected', () => {
    const action = {
      type: createOrder.rejected.type,
      error: { message: 'Ошибка создания заказа' }
    };
    const state = orderReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка создания заказа');
  });
});
