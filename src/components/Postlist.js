import React from 'react';
import Post from './Post';
import './Postlist.css';

function PostList({ posts }) {
  // Функция для сортировки постов по некоторым правилам
  // В данном случае, сортируем по дате публикации в обратном порядке
  const sortPosts = (posts) => {
    return posts.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
  };

  // Функция для удаления дубликатов постов по заголовку
  const removeDuplicates = (posts) => {
    return posts.filter((post, index, array) => array.findIndex(p => p.title === post.title) === index);
  };

  // Получаем отсортированный и уникальный список постов
  const sortedPosts = sortPosts(posts);
  const uniquePosts = removeDuplicates(sortedPosts);

  return (
    <div className="PostList">
      {uniquePosts.map((post, index) => (
        <Post key={index} post={post} />))} {/* Отображаем компонент поста для каждого элемента массива */}
    </div>
  );
}

export default PostList;
