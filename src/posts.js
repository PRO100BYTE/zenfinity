// Импортируем axios библиотеку для выполнения HTTP запросов
import axios from 'axios';

// Создаем функцию fetchPosts, которая принимает параметр page
export const fetchPosts = (page) => {
  // Возвращаем промис
  return new Promise((resolve, reject) => {
    // Отправляем GET запрос к сервису https://jsonplaceholder.typicode.com/posts
    // с параметрами _page и _limit
    axios.get('https://jsonplaceholder.typicode.com/posts', {
      params: {
        _page: page,
        _limit: 5
      }
    })
      .then((response) => {
        // Если запрос успешный
        // Получаем данные из ответа
        const data = response.data;
        // Разрешаем промис в массив постов
        resolve(data);
      })
      .catch((error) => {
        // Если запрос неудачный
        // Получаем сообщение об ошибке из ошибки
        const message = error.message;
        // Отклоняем промис в ошибку
        reject(new Error(message));
      });
  });
};
