import React from 'react';
import './styles.css';

export const ExerciceBox = ({ title, onClick }: IExerciceBox) => {
  return (
    <div
      className={'exercice-box primary-background'}
      onClick={onClick}
      data-testid="exercice-box"
    >
      <p className={'box-title main-color'} data-testid="exercice-box-title">
        {title}
      </p>
    </div>
  );
};
