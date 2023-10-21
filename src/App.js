// Импортируем React, useState, useEffect, useRef и useLayoutEffect хуки
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
// Импортируем VKUI библиотеку с необходимыми компонентами и иконками
import { View, Panel, PanelHeader, PanelHeaderBack, PanelHeaderButton,
  Group, CellButton, Div, Spinner, Snackbar,
  Epic, Tabbar, TabbarItem,
  CardGrid, Card,
  Avatar,
  Text,
  Button } from '@vkontakte/vkui';
import { Icon28SearchOutline, Icon28UserCircleOutline,
  Icon28LikeOutline, Icon28CommentOutline,
  Icon28BookmarkOutline } from '@vkontakte/icons';
// Импортируем файл posts.js с функцией для получения постов
import { fetchPosts } from './posts';
import './style.css';

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

  // Создаем функцию showAlert, которая будет показывать сообщение о недоступности функционала
  const showAlert = () => {
    // Устанавливаем значение error в 'Данный функционал пока недоступен'
    setError('Данный функционал пока недоступен');
  };

  // Возвращаем JSX разметку компонента App
  return (
    <Epic activeStory="main">
      <View id="main" activePanel="main">
        <Panel id="main">
          <PanelHeader
            left={<PanelHeaderButton onClick={showAlert}><Icon28SearchOutline /></PanelHeaderButton>}
            right={<PanelHeaderButton onClick={showAlert}><Icon28UserCircleOutline /></PanelHeaderButton>}
          >
            Zenfinity
          </PanelHeader>
          <Group>
            <CardGrid>
              {posts.map((post) => (
                <Card key={post.id} size="l" mode="shadow">
                  <div className="post">
                    <div className="author">
                      <Avatar size={48} src={`https://i.pravatar.cc/150?u=${post.id}`} />
                      <Text weight="medium">{post.title}</Text>
                    </div>
                    <div className="content">
                      <Text weight="regular">{post.body}</Text>
                    </div>
                    <div className="actions">
                      <Button mode="tertiary" before={<Icon28LikeOutline />} onClick={showAlert}>Нравится</Button>
                      <Button mode="tertiary" before={<Icon28CommentOutline />} onClick={showAlert}>Комментировать</Button>
                      <Button mode="tertiary" before={<Icon28BookmarkOutline />} onClick={showAlert}>Сохранить</Button>
                    </div>
                  </div>
                </Card>
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
            </CardGrid>
          </Group>
          <Div className="footer">
            Проект был разработан с любовью ❤️ командой PRO100BYTE
          </Div>
        </Panel>
      </View>
    </Epic>
  );
}

// Экспортируем компонент App по умолчанию
export default App;
