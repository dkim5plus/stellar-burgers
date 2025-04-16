import {
  selectFeed,
  feedReducer,
  getFeeds,
  initialState
} from '../slices/feedSlice';

jest.mock('@api', () => ({
  getFeedsApi: jest.fn()
}));

describe('проверка ленты', () => {
  it('обработка pending', () => {
    const action = { type: getFeeds.pending.type };
    const state = feedReducer(initialState, action);
    expect(state.isLoading).toBe(true);
  });

  it('обработка rejected', () => {
    const error = 'ошибка';
    const action = {
      type: getFeeds.rejected.type,
      error: { message: error }
    };
    const state = feedReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(error);
  });

  it('обработка fulfilled', () => {
    const mockResponse = {
      orders: [
        { _id: '1', number: 1, status: 'done' },
        { _id: '2', number: 2, status: 'pending' }
      ],
      total: 100,
      totalToday: 10
    };
    const action = {
      type: getFeeds.fulfilled.type,
      payload: mockResponse
    };
    const state = feedReducer(initialState, action);
    expect(state.orders).toEqual(mockResponse.orders);
    expect(state.total).toBe(100);
    expect(state.totalToday).toBe(10);
    expect(state.isLoading).toBe(false);
  });
});
