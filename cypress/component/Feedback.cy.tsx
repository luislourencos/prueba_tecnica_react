import { Feedback } from '../../src/components/Feedback';

import React from 'react';

describe('Feedback', () => {
  const errorText = 'Error';

  beforeEach(() => {
    cy.mount(<Feedback text={errorText} />);
  });
  it('Render  Feedback correctly', () => {
    cy.get('[data-testid=feedback]').should('be.visible');
    cy.get('[data-testid=feedback]').should('contain.text', 'Error');
  });
});
