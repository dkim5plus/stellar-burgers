import { burgerConstructorReducer } from '../slices/constructorSlice';
import { rootReducer } from '../store';

describe('Проверка корневого редьюсера rootReducer', () => {
  it('Проверка', () => {
    const initialState = {
      burgerConstructor: {
        ingredients: [],
        bun: null
      },
      feed: {
        orders: [],
        total: 0,
        totalToday: 0,
        error: null,
        isLoading: false
      },
      ingredients: {
        ingredients: [],
        isLoading: false,
        error: null
      },
      order: {
        orders: [],
        orderData: null,
        orderRequest: false,
        isLoading: false,
        error: null
      },
      user: {
        userData: null,
        isAuth: false,
        loading: false,
        error: null
      }
    };
    const state = rootReducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });
});
