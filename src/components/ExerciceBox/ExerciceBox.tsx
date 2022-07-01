import React from 'react';
import './styles.css';

export const ExerciceBox = ({ title, onClick }: IExerciceBox) => {
  return (
    <div className={'exercice-box primary-background'} onClick={onClick}>
      <p>{title}</p>
    </div>
  );
};
