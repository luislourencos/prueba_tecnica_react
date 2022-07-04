import React, { useState, useEffect } from 'react';
import './styles.css';

interface IInput {
  value: number;
  disable?: boolean;
  onChange: (value: number) => void;
}
export const Input = ({ value, disable = false, onChange }: IInput) => {
  const [inputValue, setInputValue] = useState(0);
  const [keyEnter, setKeyEnter] = useState(false);

  useEffect(() => {
    if (keyEnter) {
      onChange(inputValue);
    }
  }, [keyEnter]);

  useEffect(() => {
    setInputValue(value);
  }, [value]);
  return (
    <div className="input-container" data-testid={'input-container'}>
      {disable ? (
        <p className="input-label" data-testid="label">
          {value}
        </p>
      ) : (
        <input
          data-testid="input"
          value={inputValue}
          type={'number'}
          className={'input'}
          onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) =>
            setKeyEnter(e.key === 'Enter')
          }
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const value = parseInt(e.target.value) as number;
            setInputValue(value);
          }}
        />
      )}
      <p className="euro">€</p>
    </div>
  );
};
