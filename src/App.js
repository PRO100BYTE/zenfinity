import React, { useState, useEffect } from 'react';
import { View, Panel, PanelHeader, PanelHeaderBack, Group, CellButton, Div, Text, Caption, Counter } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { Icon28CommentOutline, Icon28BookmarkOutline, Icon28LikeOutline } from '@vkontakte/icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FixedSizeList as List } from 'react-window';
import localforage from 'localforage';
import Header from './Header';
import Footer from './Footer';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    // Загрузить посты из локального хранилища, если есть
    localforage.getItem('posts').then((value) => {
      if (value) {
        setPosts(value);
      }
    });
  }, []);

  useEffect(() => {
    // Сохранить посты в локальное хранилище при изменении
    localforage.setItem('posts', posts);
  }, [posts]);

  const fetchPosts = () => {
    // Загрузить посты с сервера
    fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=5`)
      .then((response) => response.json())
      .then((data) => {
        // Сортировать посты по дате и рейтингу
        data.sort((a, b) => {
          // Сгенерировать случайные значения для лайков, комментариев и просмотров
          a.likes = Math.floor(Math.random() * 1000);
          a.comments = Math.floor(Math.random() * 500);
          a.views = Math.floor(Math.random() * 2000);
          // Вычислить рейтинг по формуле
          a.rating = a.likes * 0.5 + a.comments * 0.3 + a.views * 0.2;
          b.rating = b.likes * 0.5 + b.comments * 0.3 + b.views * 0.2;
          // Сравнить дату и рейтинг
          if (a.date > b.date) return -1;
          if (a.date < b.date) return 1;
          if (a.rating > b.rating) return -1;
          if (a.rating < b.rating) return 1;
          return 0;
        });
        // Фильтровать посты, чтобы не было повторений
        data = data.filter((post) => !posts.some((p) => p.id === post.id));
        // Добавить посты в состояние
        setPosts((prevPosts) => [...prevPosts, ...data]);
        // Увеличить номер страницы
        setPage((prevPage) => prevPage + 1);
        // Проверить, есть ли еще посты для загрузки
        if (data.length < 5) {
          setHasMore(false);
        }
      });
  };

  const Post = ({ index, style }) => {
    // Компонент для отображения одного поста
    const post = posts[index];
    // Состояние для лайка, комментирования и сохранения
    const [liked, setLiked] = useState(false);
    const [commented, setCommented] = useState(false);
    const [saved, setSaved] = useState(false);
    return (
      <Div style={style}>
        <div style={{ backgroundColor: '#CCCCCC', borderRadius: '10px', padding: '10px', maxWidth: '600px', marginTop: '20px' }}>
          <Caption level="2" weight="regular" style={{ color: '#000000' }}>
            {post.title}
          </Caption>
          <Text weight="regular" style={{ color: '#000000' }}>
            {post.body}
          </Text>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Icon28LikeOutline fill={liked ? '#FF0000' : '#000000'} onClick={() => {
                // Изменить состояние лайка и счетчик лайков
                setLiked((prevLiked) => !prevLiked);
                post.likes += liked ? -1 : 1;
                // Вывести сообщение о недоступности функции
                alert('Лайк пока недоступен');
              }} />
              <Counter mode="secondary" style={{ marginLeft: '5px' }}>
                {post.likes}
              </Counter>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Icon28CommentOutline fill={commented ? '#FF0000' : '#000000'} onClick={() => {
                // Изменить состояние комментирования и счетчик комментариев
                setCommented((prevCommented) => !prevCommented);
                post.comments += commented ? -1 : 1;
                // Вывести сообщение о недоступности функции
                alert('Комментирование пока недоступно');
              }} />
              <Counter mode="secondary" style={{ marginLeft: '5px' }}>
                {post.comments}
              </Counter>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Icon28BookmarkOutline fill={saved ? '#FF0000' : '#000000'} onClick={() => {
                // Изменить состояние сохранения и счетчик просмотров
                setSaved((prevSaved) => !prevSaved);
                post.views += saved ? -1 : 1;
                // Вывести сообщение о недоступности функции
                alert('Сохранение пока недоступно');
              }} />
              <Counter mode="secondary" style={{ marginLeft: '5px' }}>
                {post.views}
              </Counter>
            </div>
          </div>
        </div>
      </Div>
    );
  };

  return (
    <View activePanel="main" style={{ backgroundColor: '#000000' }}>
      <Header />
      <Panel id="main">
        <Group header={<Header mode="secondary">Бесконечная лента публикаций</Header>}>
          <InfiniteScroll
            dataLength={posts.length}
            next={fetchPosts}
            hasMore={hasMore}
            loader={<h4>Загрузка...</h4>}
            endMessage={<h4>Больше нет публикаций</h4>}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {posts.map((post, index) => (
                <Post key={post.id} index={index} style={{ width: '80%' }} />
              ))}
            </div>
          </InfiniteScroll>
        </Group>
      </Panel>
      <Footer />
    </View>
  );
};

export default App;
