import { setCookie } from "../../src/utils/cookie"

describe('проверяем конструктор бургеров', function () {
    beforeEach(function () {
      cy.intercept('GET', 'api/ingredients', {
         fixture: 'ingredients.json' 
      }).as('getIngredients');
  
      cy.intercept('GET', 'api/auth/user', { 
        fixture: 'user.json' 
      });
  
      cy.intercept('POST', 'api/orders', { 
        fixture: 'order.json' 
      });

      cy.window().then((win) => {
        setCookie('accessToken', 'access-token')
        win.localStorage.setItem('refreshToken', 'refresh-token')
      });

      cy.visit('http://localhost:5000');
    });

    it('получение ингредиентов', () => {
        cy.wait('@getIngredients');
        cy.get('[data-cy=ingredient]').should('have.length', 3)
        cy.contains('Флюоресцентная булка R2-D3').should('be.visible');
        cy.contains('Биокотлета из марсианской Магнолии').scrollIntoView().should('be.visible');
        cy.contains('Соус фирменный Space Sauce').scrollIntoView().should('be.visible')
    });

    it('сборка бургера', () => {
        cy.get('button').filter(':contains("Добавить")').eq(0).click({ force: true })
        cy.get('[data-cy=constructor]').contains('Флюоресцентная булка R2-D3').should('be.visible');
        cy.get('button').filter(':contains("Добавить")').eq(1).click({ force: true })
        cy.get('[data-cy=constructor]').contains('Биокотлета из марсианской Магнолии').should('be.visible');
        cy.get('button').filter(':contains("Добавить")').eq(2).click({ force: true })
        cy.get('[data-cy=constructor]').contains('Соус фирменный Space Sauce').should('be.visible');
        cy.get('button').filter(':contains("Добавить")').eq(1).click({ force: true })
        cy.get('[data-cy=constructor]').find('li').should('have.length', 3)
    });

    it('открытие модалки', function () {
        cy.contains('Детали ингредиента').should('not.exist');  
        cy.contains('Флюоресцентная булка R2-D3').click(); 
        cy.contains('Детали ингредиента').should('exist');
        cy.get('#modals').contains('Флюоресцентная булка R2-D3').should('exist');
    });

    it('закрытие модалки по крестику', function () {
      cy.contains('Флюоресцентная булка R2-D3').click();
      cy.contains('Детали ингредиента').should('exist');
      cy.get('h3').contains('Детали ингредиента').parent().find('button').click();
      cy.contains('Детали ингредиента').should('not.exist');
    });

    it('закрытие модалки по оверлэю', function () {
      cy.contains('Флюоресцентная булка R2-D3').click();  
      cy.contains('Детали ингредиента').should('exist');  
      cy.get('[data-cy=modal-overlay]').click('left', { force: true });
      cy.contains('Детали ингредиента').should('not.exist');
    });

    it('создание заказа', () => {
      cy.get('button').filter(':contains("Добавить")').eq(0).click({ force: true });
      cy.get('button').filter(':contains("Оформить заказ")').eq(0).click({ force: true });
      cy.contains('Ваш заказ начали готовить').should('be.visible');
      cy.contains('74306').should('be.visible');
      cy.get('[data-cy="modal-closeButton"]').click();
      cy.contains('Ваш заказ начали готовить').should('not.exist');
      cy.contains('Выберите булки').should('be.visible');
      cy.contains('Выберите начинку').should('be.visible');
    })
});