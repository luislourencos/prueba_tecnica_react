import { Input } from '../../src/components';
import React from 'react';
describe('Input', () => {
  beforeEach(() => {});
  it('Render Input correctly', () => {
    const value = 50;
    let newValue = 0;
    cy.mount(
      <Input value={value} onChange={(value: number) => (newValue = value)} />
    );
    cy.get('[data-testid=input-container]').should('be.visible');
    cy.get('[data-testid=input]').should('contain.value', value);
    cy.get('[data-testid=input]')
      .click()
      .clear()
      .type('123')
      .type('{enter}')
      .then(() => {
        expect(newValue).equal(123);
      });
  });
});
