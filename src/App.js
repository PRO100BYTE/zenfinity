import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Postlist from './components/Postlist';
import './App.css';

function App() {
  // Состояние для хранения списка постов
  const [posts, setPosts] = useState([]);

  // Функция для получения постов из API
  const fetchPosts = async () => {
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts'; // API адрес для получения постов
    const response = await fetch(apiUrl); // Отправляем запрос к API
    const data = await response.json(); // Получаем данные в формате JSON
    const items = data.articles; // Извлекаем массив постов из данных
    setPosts(items); // Обновляем состояние списка постов
  };

  // Вызываем функцию для получения постов при первом рендеринге компонента
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="App">
      <Header /> {/* Отображаем компонент хедера */}
      <Postlist posts={posts} /> {/* Отображаем компонент списка постов */}
      <Footer /> {/* Отображаем компонент футера */}
    </div>
  );
}

export default App;
