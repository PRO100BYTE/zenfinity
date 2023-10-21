// Импортируем React, useState, useEffect, useRef и useLayoutEffect хуки
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
// Импортируем VKUI библиотеку с необходимыми компонентами и иконками
import { View, Panel, PanelHeader, PanelHeaderBack, PanelHeaderButton,
  Group, CellButton, Div, Spinner, Snackbar } from '@vkontakte/vkui';
import { Icon28SearchOutline, Icon28UserCircleOutline,
  Icon28LikeOutline, Icon28CommentOutline,
  Icon28BookmarkOutline } from '@vkontakte/icons';
// Импортируем файл posts.js с функцией для получения постов
import { fetchPosts } from './posts';

// Создаем компонент App
function App() {
  // Создаем состояния posts, loading, error, hasMore и page
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  // Создаем ссылку на элемент loader
  const loader = useRef(null);

  // Создаем функцию handleObserver для наблюдения за элементом loader
  const handleObserver = (entries) => {
    // Получаем первый элемент из массива entries
    const target = entries[0];
    // Если элемент видим на экране и есть еще посты для загрузки
    if (target.isIntersecting && hasMore) {
      // Увеличиваем значение page на единицу
      setPage((prevPage) => prevPage + 1);
    }
  };

  // Используем хук useLayoutEffect для создания наблюдателя за элементом loader
  useLayoutEffect(() => {
    // Создаем экземпляр IntersectionObserver с функцией handleObserver
    const observer = new IntersectionObserver(handleObserver);
    // Если есть ссылка на элемент loader
    if (loader.current) {
      // Начинаем наблюдать за элементом loader
      observer.observe(loader.current);
    }
  }, [loader]);

  // Используем хук useEffect для вызова функции fetchPosts с параметром page
  useEffect(() => {
    // Устанавливаем значение loading в true
    setLoading(true);
    // Обнуляем значение error
    setError('');
    // Вызываем функцию fetchPosts с параметром page
    fetchPosts(page)
      .then((data) => {
        // Если получили данные
        if (data) {
          // Обновляем массив posts с помощью оператора расширения
          setPosts((prevPosts) => [...prevPosts, ...data]);
          // Устанавливаем значение hasMore в зависимости от длины массива data
          setHasMore(data.length > 0);
        }
      })
      .catch((err) => {
        // Если произошла ошибка
        // Устанавливаем значение error в сообщение об ошибке
        setError(err.message);
      })
      .finally(() => {
        // В любом случае
        // Устанавливаем значение loading в false
        setLoading(false);
      });
  }, [page]); // Зависимость от page

  // Возвращаем JSX разметку компонента App
  return (
    <View activePanel="main">
      <Panel id="main">
        <PanelHeader>
          <Div className="header">
            <div className="title">Zenfinity</div>
            <div className="buttons">
              <PanelHeaderButton><Icon28SearchOutline /></PanelHeaderButton>
              <PanelHeaderButton><Icon28UserCircleOutline /></PanelHeaderButton>
            </div>
          </Div>
        </PanelHeader>
        <Group>
          {posts.map((post) => (
            <CellButton key={post.id} multiline>
              <div className="post">
                <div className="author">{post.title}</div>
                <div className="content">{post.body}</div>
                <div className="actions">
                  <Icon28LikeOutline />
                  <Icon28CommentOutline />
                  <Icon28BookmarkOutline />
                </div>
              </div>
            </CellButton>
          ))}
          {loading && (
            <Div className="spinner">
              <Spinner size="large" />
            </Div>
          )}
          {error && (
            <Snackbar>{error}</Snackbar>
          )}
          <div ref={loader} className="loader"></div>
        </Group>
        <Div className="footer">
          Разработано с ❤️ командой PRO100BYTE
        </Div>
      </Panel>
    </View>
  );
}

// Экспортируем компонент App по умолчанию
export default App;
