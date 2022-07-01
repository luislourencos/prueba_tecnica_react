import React from 'react';
import './styles.css';
import leftArrow from '../../icons/left-arrow.png';
import { useNavigate } from 'react-router-dom';
interface IHeader {
  title: string;
  backButton?: boolean;
}
export const Header = ({ title, backButton = false }: IHeader) => {
  const navigate = useNavigate();
  return (
    <header className={'header main-background'}>
      {backButton && (
        <img
          className="header-back-button"
          src={leftArrow}
          onClick={() => navigate(-1)}
        />
      )}
      <h1 className={'header-title'}>{title}</h1>
    </header>
  );
};
