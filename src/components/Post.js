import React from 'react';
import md5 from 'md5'; // Импортируем библиотеку md5
import './Post.css';

function Post({ post }) {
  // Функция для обработки нажатия на кнопку лайка
  const handleLike = () => {
    alert('Извините, функция лайка пока недоступна');
  };

  // Функция для обработки нажатия на кнопку комментария
  const handleComment = () => {
    alert('Извините, функция комментирования пока недоступна');
  };

  // Функция для обработки нажатия на кнопку сохранения
  const handleSave = () => {
    alert('Извините, функция сохранения пока недоступна');
  };

  return (
    <div className="Post">
      <div className="Post-header">
        <img src={`https://www.gravatar.com/avatar/${md5(post.author.email)}`} alt="Автор" className="Post-avatar" /> {/* Отображаем изображение автора поста с использованием Gravatar */}
        <div className="Post-author">{post.author.name}</div> {/* Отображаем имя автора поста */}
      </div>
      <div className="Post-content">
        <h3 className="Post-title">{post.title}</h3> {/* Отображаем заголовок поста */}
        <p className="Post-description">{post.excerpt.slice(0,300)}...</p> {/* Отображаем описание поста, сокращенное до 300 символов */}
        <a href={post.URL} target="_blank" rel="noreferrer" className="Post-link">Читать далее</a> {/* Отображаем ссылку на полный текст поста */}
      </div>
      <div className="Post-footer">
        <div className="Post-buttons">
          <button className="Post-like" onClick={handleLike}> {/* Отображаем кнопку лайка */}
            <i className="fa fa-heart"></i>
          </button>
          <button className="Post-comment" onClick={handleComment}> {/* Отображаем кнопку комментария */}
            <i className="fa fa-comment"></i>
          </button>
          <button className="Post-save" onClick={handleSave}> {/* Отображаем кнопку сохранения */}
            <i className="fa fa-bookmark"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Post;
