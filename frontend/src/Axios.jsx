import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000/api/';

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  // headers: {
  //   Authorization: localStorage.getItem('access_token')
  //     ? `Bearer ${localStorage.getItem('access_token')}`
  //     : null,
  //   'Content-Type': 'application/json',
  //   accept: 'application/json',
  // },
});

axiosInstance.interceptors.request.use(
  config => {
    if (!config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Добавляем интерсептор для обработки ответов
axiosInstance.interceptors.response.use(
  // Функция обработки успешного ответа
  response => {
    return response; // Просто возвращаем ответ, если всё прошло успешно
  },
  // Функция обработки ошибки
  async function (error) {
    const originalRequest = error.config; // Сохраняем оригинальный запрос, чтобы использовать его позже

    // Проверка, есть ли response в ошибке
    if (typeof error.response === 'undefined') {
      // Если нет, выводим сообщение об ошибке, возможно, проблема с CORS
      alert(
        'A server/network error occurred. ' +
          'Looks like CORS might be the problem. ' +
          'Sorry about this - we will get it fixed shortly.',
      );
      return Promise.reject(error); // Отклоняем промис с ошибкой
    }

    // Обработка ошибки 401 при попытке обновления токена
    if (
      error.response.status === 401 &&
      originalRequest.url === baseURL + 'token/refresh/'
    ) {
      // Если обновление токена не удалось, перенаправляем пользователя на страницу логина
      window.location.href = '/login/';
      return Promise.reject(error); // Отклоняем промис с ошибкой
    }

    // Обработка ошибки 401, связанной с невалидным токеном
    if (
      error.response.data.code === 'token_not_valid' &&
      error.response.status === 401 &&
      error.response.statusText === 'Unauthorized'
    ) {
      const refreshToken = localStorage.getItem('refresh_token'); // Получаем refresh токен из localStorage

      if (refreshToken) {
        // Декодируем токен для получения времени его истечения
        const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

        // Текущая дата в секундах
        const now = Math.ceil(Date.now() / 1000);
        console.log(tokenParts.exp);

        if (tokenParts.exp > now) {
          // Если токен ещё не истёк, отправляем запрос на его обновление
          return axiosInstance
            .post('/token/refresh/', { refresh: refreshToken })
            .then(response => {
              // Сохраняем новые токены в localStorage
              localStorage.setItem('access_token', response.data.access);
              localStorage.setItem('refresh_token', response.data.refresh);

              // Обновляем заголовки с новым access токеном
              axiosInstance.defaults.headers['Authorization'] =
                'JWT ' + response.data.access;
              originalRequest.headers['Authorization'] = 'JWT ' + response.data.access;

              // Повторяем оригинальный запрос с новым токеном
              return axiosInstance(originalRequest);
            })
            .catch(err => {
              console.log(err); // Логируем ошибку при обновлении токена
            });
        } else {
          // Если refresh токен истёк, перенаправляем пользователя на страницу логина
          console.log('Refresh token is expired', tokenParts.exp, now);
          window.location.href = '/login/';
        }
      } else {
        // Если refresh токен отсутствует, перенаправляем пользователя на страницу логина
        console.log('Refresh token not available.');
        window.location.href = '/login/';
      }
    }

    // Пропускаем специфическую обработку ошибок, которая может быть определена в других частях приложения
    return Promise.reject(error); // Отклоняем промис с ошибкой
  },
);

export default axiosInstance;
