import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ExerciceBox } from '../../components';
import './styles.css';
export const Landing = () => {
  const navigate = useNavigate();

  const handlerExercice1 = () => navigate('/exercice1');
  const handlerExercice2 = () => navigate('/exercice2');

  return (
    <div className={'landing'}>
      <ExerciceBox title={'Exercice 1'} onClick={handlerExercice1} />
      <ExerciceBox title={'Exercice 2'} onClick={handlerExercice2} />
    </div>
  );
};
