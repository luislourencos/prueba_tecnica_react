import React from 'react';
import './styles.css';
export const Spinner = () => {
  return (
    <div className="spinner-container" data-testid="spinner">
      <div className="spinner" />
    </div>
  );
};
