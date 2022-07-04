import { Spinner } from '../../src/components';
import React from 'react';
describe('Spinner', () => {
  beforeEach(() => {
    cy.mount(<Spinner />);
  });
  it('Render Spinner correctly', () => {
    cy.get('[data-testid=spinner]').should('be.visible');
  });
});
