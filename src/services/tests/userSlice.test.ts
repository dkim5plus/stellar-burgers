import {
  initialState,
  getUser,
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  selectIsAuthChecked,
  selectUserData,
  userReducer
} from '../slices/userSlice';

jest.mock('@api', () => ({
  getUserApi: jest.fn(),
  registerUserApi: jest.fn(),
  loginUserApi: jest.fn(),
  logoutApi: jest.fn(),
  updateUserApi: jest.fn(),
  getOrdersApi: jest.fn()
}));

describe('тесты данных пользователя', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('получение данных', () => {
    it('pending', () => {
      const action = { type: getUser.pending.type };
      const state = userReducer(initialState, action);
      expect(state.loading).toBe(true);
    });

    it('fulfilled', () => {
      const mock = {
        user: { name: 'Ким Даниил Евгеньевич', email: 'Kim290405@mail.ru' }
      };
      const action = {
        type: getUser.fulfilled.type,
        payload: mock
      };
      const state = userReducer(initialState, action);
      expect(state.userData).toEqual(mock.user);
      expect(state.loading).toBe(false);
    });

    it('rejected', () => {
      const error = new Error('ошибка');
      const action = {
        type: getUser.rejected.type,
        error: { message: error.message }
      };
      const state = userReducer(initialState, action);
      expect(state.error).toBe(error.message);
      expect(state.loading).toBe(false);
    });
  });

  describe('регистрация', () => {
    it('pending', () => {
      const action = { type: registerUser.pending.type };
      const state = userReducer(initialState, action);
      expect(state.loading).toBe(true);
    });

    it('fullfilled', () => {
      const mock = {
        name: 'Ким Даниил Евгеньевич',
        email: 'Kim290405@mail.ru'
      };
      const action = {
        type: registerUser.fulfilled.type,
        payload: mock
      };
      const state = userReducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.userData).toEqual(mock);
      expect(state.isAuth).toBe(true);
    });

    it('rejected', () => {
      const error = new Error('ошибка');
      const action = {
        type: registerUser.rejected.type,
        error: { message: error.message }
      };
      const state = userReducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.error).toBe(error.message);
    });
  });

  describe('авторизация', () => {
    it('pending', () => {
      const action = { type: loginUser.pending.type };
      const state = userReducer(initialState, action);
      expect(state.loading).toBe(true);
    });

    it('fullfilled', () => {
      const mock = {
        name: 'Ким Даниил Евгеньевич',
        email: 'Kim290405@mail.ru'
      };
      const action = {
        type: loginUser.fulfilled.type,
        payload: mock
      };
      const state = userReducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.userData).toEqual(mock);
      expect(state.isAuth).toBe(true);
    });

    it('rejected', () => {
      const error = new Error('ошибка');
      const action = {
        type: loginUser.rejected.type,
        error: { message: error.message }
      };
      const state = userReducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.error).toBe(error.message);
    });
  });

  describe('разлогинивание', () => {
    it('pending', () => {
      const action = { type: logoutUser.pending.type };
      const state = userReducer(initialState, action);
      expect(state.loading).toBe(true);
    });

    it('fullfilled', () => {
      const action = { type: logoutUser.fulfilled.type };
      const state = userReducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.userData).toBeNull();
      expect(state.isAuth).toBe(true);
    });

    it('rejected', () => {
      const error = new Error('ошибка');
      const action = {
        type: logoutUser.rejected.type,
        error: { message: error.message }
      };
      const state = userReducer(initialState, action);
      expect(state.error).toBe(error.message);
      expect(state.loading).toBe(false);
    });
  });

  describe('обновление данных', () => {
    it('pending', () => {
      const action = { type: updateUser.pending.type };
      const state = userReducer(initialState, action);
      expect(state.loading).toBe(true);
    });

    it('fullfilled', () => {
      const mock = {
        name: 'Ким Даниил Евгеньевич',
        email: 'Kim290405@mail.ru'
      };
      const action = {
        type: updateUser.fulfilled.type,
        payload: mock
      };
      const state = userReducer(initialState, action);
      expect(state.userData).toEqual(mock); // Проверяем весь объект
      expect(state.loading).toBe(false);
    });

    it('rejected', () => {
      const error = new Error('ошибка');
      const action = {
        type: updateUser.rejected.type,
        error: { message: error.message }
      };
      const state = userReducer(initialState, action);
      expect(state.error).toBe(error.message);
      expect(state.loading).toBe(false);
    });
  });
});
