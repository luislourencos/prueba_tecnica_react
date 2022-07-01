import { render, screen } from '@testing-library/react';
import React from 'react';
import { ExerciceBox } from './ExerciceBox';
jest.mock('./styles.css', () => '');
describe('component ExerciceBox', () => {
  const mockClick = jest.fn();
  const text = 'Test';
  beforeEach(() => {
    render(<ExerciceBox title={text} onClick={mockClick} />);
  });
  it('should render the title correcly', () => {
    const getElementText = screen.getByText('Test');
    expect(getElementText).toBeInTheDocument();
  });
  it('should work click in button', () => {
    const getElementText = screen.getByText('Test');
    getElementText.click();
    expect(mockClick).toBeCalled();
    expect(mockClick).toBeCalledTimes(1);
  });
});
