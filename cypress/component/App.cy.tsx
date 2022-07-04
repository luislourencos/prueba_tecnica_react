import { App } from '../../src/App';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

describe('App', () => {
  beforeEach(() => {
    cy.mount(<App />);
  });
  it('Render App correctly', () => {
    cy.url().should('eq', 'http://localhost:8080/');
    cy.get('[data-testid=header]').should('be.visible');
    cy.get('[data-testid=header]').should(
      'contain.text',
      'React technical test'
    );
    cy.get('[data-testid=exercice-box]').should('be.visible');
    cy.get('[data-testid=exercice-box]').should('have.length', 2);
    cy.get('[data-testid=exercice-box]').then((element) => {
      expect(element[0].innerText).equal('Exercice 1');
      expect(element[1].innerText).equal('Exercice 2');
    });
  });

  it('Press exercice 1 and se the screen', () => {
    cy.get('[data-testid=exercice-box]').then((element) => {
      element[0].click();
    });
    cy.url().should('eq', 'http://localhost:8080/exercice1');
    cy.request('http://localhost:3001/getRangeMinAndMax').then((element) => {
      expect(element.status).equal(200);
      const min = element.body.min;
      const max = element.body.max;
      expect(min).equal(20);
      expect(max).equal(150);
    });

    cy.get('[data-testid=header]').should('be.visible');
    cy.get('[data-testid=header]').should('contain.text', 'Exercice 1');
    cy.get('[data-testid=range]').should('be.visible');
  });
  it('Press back button and return to landing ', () => {
    cy.get('[data-testid=button-back]').click();
    cy.url().should('eq', 'http://localhost:8080/');
    cy.get('[data-testid=header]').should('be.visible');
    cy.get('[data-testid=header]').should(
      'contain.text',
      'React technical test'
    );
    cy.get('[data-testid=exercice-box]').should('be.visible');
    cy.get('[data-testid=exercice-box]').should('have.length', 2);
  });

  it('Press exercice 2 and se the screen', () => {
    cy.get('[data-testid=exercice-box]').then((element) => {
      element[1].click();
    });
    cy.url().should('eq', 'http://localhost:8080/exercice2');
    cy.request('http://localhost:3001/getRangeArray').then((element) => {
      expect(element.status).equal(200);
      const rangeValues = element.body.rangeValues;

      rangeValues.forEach((element2: number) => {
        expect(element2).exist;
      });
      expect(rangeValues.length).equal(6);
    });
    cy.get('[data-testid=header]').should('be.visible');
    cy.get('[data-testid=header]').should('contain.text', 'Exercice 2');
    cy.get('[data-testid=range]').should('be.visible');
  });
});
