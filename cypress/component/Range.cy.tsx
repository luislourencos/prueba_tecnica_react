import { Range } from '../../src/components';
import React from 'react';
describe('Range', () => {
  it('Render Range min and max correctly', () => {
    const min = 1;
    const max = 80;

    cy.mount(<Range min={min} max={max} />);
    cy.get('[data-testid=range]').should('be.visible');
    cy.get('[data-testid=input]')
      .first()
      .should('contain.value', min);
    cy.get('[data-testid=input]')
      .last()
      .should('contain.value', max);
  });
  it('Render Range range correctly', () => {
    const range = [2.99, 5.66, 60.99];
    let minValue = 0;
    let maxValue = 0;
    cy.mount(
      <Range
        min={range[0]}
        max={range[range.length - 1]}
        range={range}
        onChangeMinValue={(value: number) => (minValue = value)}
        onChangeMaxValue={(value: number) => (maxValue = value)}
      />
    );
    cy.get('[data-testid=range]').should('be.visible');
    cy.get('[data-testid=label]')
      .first()
      .should('contain.text', range[0]);
    cy.get('[data-testid=label]')
      .last()
      .should('contain.text', range[2]);
  });
});
