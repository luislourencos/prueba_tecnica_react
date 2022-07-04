import { Exercice2 } from '../../src/screens/Exercice2';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

describe('Exercice2', () => {
  beforeEach(() => {
    cy.mount(
      <BrowserRouter>
        <Exercice2 />
      </BrowserRouter>
    );
  });
  it('Render Exercice2 correctly', () => {
    cy.get('[data-testid=exercice2]').should('be.visible');
    cy.get('[data-testid=range]').should('be.visible');
    cy.wait(1000);
    cy.get('[data-testid=label]')
      .first()
      .should('contain.text', 1.99);
    cy.get('[data-testid=label]')
      .last()
      .should('contain.text', 70.99);
  });
});
