// Импортируем React, ReactDOM и App компонент
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Отрисовываем App компонент в элементе с id root
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
