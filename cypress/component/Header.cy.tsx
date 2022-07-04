import { Header } from '../../src/components/Header';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

describe('Header', () => {
  const title = 'Title';

  beforeEach(() => {
    cy.mount(
      <BrowserRouter>
        <Header title={title} backButton={true} />
      </BrowserRouter>
    );
  });
  it('Render  Header correctly', () => {
    cy.get('[data-testid=header]').should('be.visible');
    cy.get('[data-testid=header]').should('contain.text', title);
    cy.get('[data-testid=button-back]').should('to.be.visible');
  });
});
