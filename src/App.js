import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Postlist from './components/Postlist';
import './App.css';

function App() {
  // Состояние для хранения списка постов
  const [posts, setPosts] = useState([]);

  // Состояние для хранения номера текущей страницы
  const [page, setPage] = useState(1);

  // Состояние для хранения статуса загрузки
  const [loading, setLoading] = useState(false);

  // Состояние для хранения статуса завершения
  const [finished, setFinished] = useState(false);

  // Константа для хранения значения лимита
  const LIMIT = 10;

  // Функция для получения постов из API
  const fetchPosts = async () => {
    setLoading(true); // Устанавливаем статус загрузки в true
    const apiUrl = `https://public-api.wordpress.com/rest/v1.1/sites/en.blog.wordpress.com/posts?page=${page}&number=${LIMIT}`; // API адрес для получения постов с указанием страницы и лимита
    const response = await fetch(apiUrl); // Отправляем запрос к API
    const data = await response.json(); // Получаем данные в формате JSON
    const items = data.posts; // Извлекаем массив постов из данных
    if (items.length > 0) { // Если массив не пустой, добавляем его к текущему списку постов
      setPosts(prevPosts => [...prevPosts, ...items]);
    }
    if (items.length < LIMIT) { // Если длина массива меньше лимита, устанавливаем статус завершения в true
      setFinished(true);
    }
    setLoading(false); // Устанавливаем статус загрузки в false
  };

  // Вызываем функцию для получения постов при первом рендеринге компонента и при изменении страницы
  useEffect(() => {
    fetchPosts();
  }, [page]);

  // Функция для обработки события скролла окна
  const handleScroll = () => {
    // Получаем высоту документа, окна и позицию скролла
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const scrollTop = window.pageYOffset;

    // Если пользователь достиг конца страницы и загрузка не идет и не завершена, увеличиваем номер страницы на 1
    if (scrollTop + windowHeight >= documentHeight && !loading && !finished) {
      setPage(prevPage => prevPage + 1);
    }
  };

  // Добавляем обработчик события скролла к окну с помощью useEffect
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, finished]);

  return (
    <div className="App">
      <Header /> {/* Отображаем компонент хедера */}
      <Postlist posts={posts} /> {/* Отображаем компонент списка постов с текущим списком постов */}
      {loading && <div className="post-loader"></div>} {/* Отображаем анимацию подгрузки постов при необходимости */}
      {finished && <div className="no-more-posts">Вы посмотрели все посты, неплохо! :)</div>} {/* Отображаем сообщение о завершении при необходимости */}
      <Footer /> {/* Отображаем компонент футера */}
    </div>
  );
}

export default App;
