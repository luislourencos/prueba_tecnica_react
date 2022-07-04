import { Landing } from '../../src/screens/Landing';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

describe('Landing', () => {
  beforeEach(() => {
    cy.mount(
      <BrowserRouter>
        <Landing />
      </BrowserRouter>
    );
  });
  it('Render  Landing correctly', () => {
    cy.get('[data-testid=landing]').should('be.visible');
    cy.get('[data-testid=exercice-box]').should('be.visible');
    cy.get('[data-testid=exercice-box]').should('have.length', 2);
  });
});
