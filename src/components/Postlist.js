import React from 'react';
import Post from './Post';
import './Postlist.css';

function PostList({ posts, limit }) {
  // Функция для сортировки постов по некоторым правилам
  // В данном случае, сортируем по дате публикации в обратном порядке и по имени (заголовку) в алфавитном порядке
  const sortPosts = (posts) => {
    return posts.sort((a, b) => {
      // Сравниваем даты публикации
      const dateDiff = new Date(b.publishedAt) - new Date(a.publishedAt);
      // Если даты равны, сравниваем имена (заголовки)
      if (dateDiff === 0) {
        return a.title.localeCompare(b.title);
      }
      // Иначе возвращаем разницу между датами
      return dateDiff;
    });
  };

  // Функция для удаления дубликатов постов по заголовку
  const removeDuplicates = (posts) => {
    return posts.filter((post, index, array) => array.findIndex(p => p.title === post.title) === index);
  };

  // Получаем отсортированный и уникальный список постов
  const sortedPosts = posts ? sortPosts(posts) : []; // Проверяем, что posts не undefined
  const uniquePosts = removeDuplicates(sortedPosts);

  // Получаем список постов, ограниченный заданным лимитом
  const limitedPosts = uniquePosts.slice(0, limit);

  return (
    <div className="PostList">
      {limitedPosts.map((post, index) => (
        <Post key={index} post={post} />))} {/* Отображаем компонент поста для каждого элемента массива */}
    </div>);
}

export default PostList;
