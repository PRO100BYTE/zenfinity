import React from 'react';
import Post from './Post';
import './Postlist.css';

function PostList({ posts, limit }) {
  // Функция для сортировки постов по некоторым правилам
  // В данном случае, сортируем сначала по дате публикации в обратном порядке, затем по рейтингу в обратном порядке
  const sortPosts = (posts) => {
    return posts.sort((a, b) => {
      // Сравниваем даты публикации
      const dateDiff = new Date(b.publishedAt) - new Date(a.publishedAt);
      // Если даты равны, сравниваем рейтинги
      if (dateDiff === 0) {
        // Вычисляем рейтинги для каждого поста
        const ratingA = calculateRating(a);
        const ratingB = calculateRating(b);
        // Возвращаем разницу между рейтингами
        return ratingB - ratingA;
      }
      // Иначе возвращаем разницу между датами
      return dateDiff;
    });
  };

  // Функция для вычисления рейтинга поста
  // В данном случае, используем формулу: rating = likes * 0.5 + comments * 0.3 + views * 0.2
  const calculateRating = (post) => {
    return post.likes * 0.5 + post.comments * 0.3 + post.views * 0.2;
  };


  // Функция для удаления дубликатов постов по заголовку
  // В данном случае, используем Set для хранения уникальных заголовков и фильтруем массив постов
  const removeDuplicates = (posts) => {
  // Создаем пустой Set для хранения уникальных заголовков
    const titles = new Set();
    // Фильтруем массив постов, добавляя заголовки в Set и проверяя, не повторяются ли они
      return posts.filter((post) => {
      // Если заголовок уже есть в Set, значит пост повторяется и его нужно пропустить
        if (titles.has(post.title)) {
          return false;
        }
      // Иначе добавляем заголовок в Set и возвращаем true, чтобы оставить пост в массиве
      titles.add(post.title);
      return true;
    });
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
