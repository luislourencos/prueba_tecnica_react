import { ExerciceBox } from '../../src/components/ExerciceBox/ExerciceBox';
import React from 'react';

describe('ExerciceBox', () => {
  const title = 'Title';
  let count = 0;
  const onClick = () => count++;

  beforeEach(() => {
    cy.mount(<ExerciceBox title={title} onClick={() => onClick()} />);
  });
  it('Expect render title correcly', () => {
    cy.get('[data-testid=exercice-box-title]').should('contain.text', title);
  });
  it('Expect click correcly', () => {
    cy.get('[data-testid=exercice-box]')
      .click()
      .then(() => {
        expect(count).equal(1);
      });
    cy.get('[data-testid=exercice-box]')
      .click()
      .then(() => {
        expect(count).equal(2);
        expect(count).not.equal(3);
      });
  });
});
