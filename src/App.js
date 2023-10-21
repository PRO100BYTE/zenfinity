import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Postlist from './components/Postlist';
import './App.css';

function App() {
  // Состояние для хранения списка постов
  const [posts, setPosts] = useState([]);

  // Состояние для хранения количества отображаемых постов
  const [limit, setLimit] = useState(8);

  // Состояние для хранения статуса загрузки
  const [loading, setLoading] = useState(false);

  // Функция для получения постов из API
  const fetchPosts = async () => {
    setLoading(true); // Устанавливаем статус загрузки в true
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts'; // API адрес для получения постов
    const response = await fetch(apiUrl); // Отправляем запрос к API
    const data = await response.json(); // Получаем данные в формате JSON
    const items = data; // Извлекаем массив постов из данных
    setPosts(items); // Обновляем состояние списка постов
    setLoading(false); // Устанавливаем статус загрузки в false
  };

  // Вызываем функцию для получения постов при первом рендеринге компонента
  useEffect(() => {
    fetchPosts();
  }, []);

  // Функция для обработки события скролла окна
  const handleScroll = () => {
    // Получаем высоту документа, окна и позицию скролла
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const scrollTop = window.pageYOffset;

    // Если пользователь достиг конца страницы, увеличиваем лимит отображаемых постов на 8
    if (scrollTop + windowHeight >= documentHeight) {
      setLimit(prevLimit => prevLimit + 8);
      setLoading(true); // Устанавливаем статус загрузки в true
      setTimeout(() => setLoading(false), 1000); // Снимаем статус загрузки через секунду
    }
  };

  // Добавляем обработчик события скролла к окну с помощью useEffect
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App">
      <Header /> {/* Отображаем компонент хедера */}
      {loading && limit === 8 ? ( // Если загрузка идет и лимит равен 8, отображаем анимацию загрузки страницы
        <div className="page-loader"></div>
      ) : ( // Иначе отображаем компонент списка постов с заданным лимитом и анимацию подгрузки постов при необходимости
        <>
          <Postlist posts={posts} limit={limit} />
          {loading && limit > 8 && <div className="post-loader"></div>}
          {!loading && limit >= posts.length && <div className="no-more-posts">Вы посмотрели все посты, неплохо! :)</div>}
        </>
      )}
      <Footer /> {/* Отображаем компонент футера */}
    </div>
  );
}

export default App;
