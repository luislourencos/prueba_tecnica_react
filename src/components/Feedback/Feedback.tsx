import React from 'react';
import './styles.css';

export const Feedback = ({ text = '' }: { text: string }) => {
  return (
    !!text && (
      <p data-testid="feedback" className="feedback">
        {text}
      </p>
    )
  );
};
