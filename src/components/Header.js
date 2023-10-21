import React from 'react';
import './Header.css';

function Header() {
  // Функция для обработки нажатия на кнопку поиска
  const handleSearch = () => {
    alert('Извините, функция поиска пока недоступна');
  };

  // Функция для обработки нажатия на кнопку входа
  const handleLogin = () => {
    alert('Извините, функция входа пока недоступна');
  };

  return (
    <div className="Header">
      <div className="Header-logo">Zenfinity</div> {/* Отображаем логотип проекта */}
      <div className="Header-buttons">
        <button className="Header-search" onClick={handleSearch}> {/* Отображаем кнопку поиска */}
          <i className="fa fa-search"></i>
        </button>
        <button className="Header-login" onClick={handleLogin}> {/* Отображаем кнопку входа */}
          <i className="fa fa-user"></i>
        </button>
      </div>
    </div>
  );
}

export default Header;
