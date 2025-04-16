import {
  selectIngredients,
  initialState,
  ingredientsReducer,
  getIngredients
} from '../slices/ingredientsSlice';

jest.mock('@api', () => ({
  getIngredientsApi: jest.fn()
}));

describe('проверка ингредиентов', () => {
  it('обработка pending', () => {
    const action = { type: getIngredients.pending.type };
    const state = ingredientsReducer(initialState, action);
    expect(state.isLoading).toBe(true);
  });

  it('обработка rejected', () => {
    const error = new Error('ошибка');

    const action = {
      type: getIngredients.rejected.type,
      error: { message: error.message }
    };

    const state = ingredientsReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(error.message);
  });

  it('обработка fulfilled', () => {
    const mockIngredients = [
      {
        id: '1',
        _id: '643d69a5c3f7b9001cfa093d',
        name: 'Флюоресцентная булка R2-D3',
        type: 'bun',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/bun-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
        __v: 0
      },
      {
        id: '2',
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        __v: 0
      }
    ];

    const action = {
      type: getIngredients.fulfilled.type,
      payload: mockIngredients
    };

    const state = ingredientsReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.ingredients).toEqual(mockIngredients);
  });
});
