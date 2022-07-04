import { Exercice1 } from '../../src/screens/Exercice1';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

describe('Exercice1', () => {
  beforeEach(() => {
    cy.mount(
      <BrowserRouter>
        <Exercice1 />
      </BrowserRouter>
    );
  });
  it('Render Exercice1 correctly', () => {
    cy.get('[data-testid=exercice1]').should('be.visible');
    cy.get('[data-testid=range]').should('be.visible');
    cy.wait(1000);
    cy.get('[data-testid=dot-left-value]').should('contain.text', 20);
    cy.get('[data-testid=dot-right-value]').should('contain.text', 150);
  });
  it('Change inputs values', () => {
    cy.get('[data-testid=input]').should('have.length', 2);
    cy.get('[data-testid=input]')
      .first()
      .click()
      .clear()
      .type('123')
      .type('{enter}');
    cy.get('[data-testid=dot-left-value]').should('contain.text', 123);
    cy.get('[data-testid=input]')
      .last()
      .click()
      .clear()
      .type('130')
      .type('{enter}');
    cy.get('[data-testid=dot-left-value]').should('contain.text', 130);
  });
});
