export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      password,
      email,
    }),
  }).then((result) => {
    if (result.ok) {
      return result.json();
    } else return Promise.reject(`Что-то пошло не так: ${result.status}`);
  });
};

export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      password,
      email,
    }),
  }).then((result) => {
    if (result.ok) {
      return result.json();
    } else return Promise.reject(`Что-то пошло не так: ${result.status}`);
  });
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((result) => {
    if (result.ok) {
      return result.json();
    } else return Promise.reject(`Что-то пошло не так: ${result.status}`);
  });
}