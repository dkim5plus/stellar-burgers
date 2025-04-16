import {
  addIngredient,
  moveIngredientUp,
  moveIngredientDown,
  removeIngredient,
  clearIngredients,
  initialState,
  burgerConstructorReducer
} from '../slices/constructorSlice';

describe('проверка конструктора', () => {
  const bun = {
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
  };

  const main = {
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
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    __v: 0
  };

  const sauce = {
    id: '3',
    _id: '643d69a5c3f7b9001cfa0943',
    name: 'Соус фирменный Space Sauce',
    type: 'sauce',
    proteins: 50,
    fat: 22,
    carbohydrates: 11,
    calories: 14,
    price: 80,
    image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
    __v: 0
  };

  const filledState = {
    ...initialState,
    bun: bun,
    ingredients: [main, sauce],
    loading: false,
    order: null,
    error: undefined
  };

  it('добавить хлеб', () => {
    const state = burgerConstructorReducer(initialState, addIngredient(bun));
    expect(state.bun).toEqual({
      ...bun,
      id: expect.any(String)
    });
  });

  it('добавить ингредиент', () => {
    const newState = burgerConstructorReducer(
      initialState,
      addIngredient(main)
    );
    expect(newState.ingredients).toHaveLength(1);
  });

  it('удалить ингредиент', () => {
    const stateIngredient = {
      ...initialState,
      ingredients: [main]
    };
    const state = burgerConstructorReducer(
      stateIngredient,
      removeIngredient(main)
    );
    expect(state.ingredients).toHaveLength(0);
  });

  it('поменять ингредиенты', () => {
    let state = burgerConstructorReducer(filledState, moveIngredientUp(1));
    expect(state.ingredients[0]).toEqual(sauce);
    expect(state.ingredients[1]).toEqual(main);
    state = burgerConstructorReducer(state, moveIngredientDown(0));
    expect(state.ingredients[0]).toEqual(main);
    expect(state.ingredients[1]).toEqual(sauce);
  });

  it('Очистка конструктора clearOrder()', () => {
    const newState = burgerConstructorReducer(initialState, clearIngredients());
    expect(newState).toEqual(initialState);
  });
});
