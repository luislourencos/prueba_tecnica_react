import React from 'react';
import {
  Navigate,
  Route,
  Routes as Switch,
  useLocation,
} from 'react-router-dom';
import { Exercice1 } from '../screens/Exercice1';
import { Landing } from '../screens/Landing';
import { Exercice2 } from '../screens/Exercice2';
import { Header } from '../components';

export const Routes = () => {
  const { pathname } = useLocation();

  const renderHeaderTitle = () => {
    return pathname.includes('exercice1')
      ? 'Exercice 1'
      : pathname.includes('exercice2')
      ? 'Exercice 2'
      : 'React technical test';
  };

  return (
    <div>
      <Header
        title={renderHeaderTitle()}
        backButton={pathname.includes('exercice')}
      />
      <Switch>
        <Route path={'/'} element={<Landing />} />
        <Route path={'/exercice1'} element={<Exercice1 />} />
        <Route path={'/exercice2'} element={<Exercice2 />} />
        <Route path={'*'} element={<Navigate to="/" />} />
      </Switch>
    </div>
  );
};
