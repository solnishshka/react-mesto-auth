class Api {
  constructor({ url, headers }) {
    this._headers = headers;
    this._url = url;
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    }).then((result) => {
      if (result.ok) {
        return result.json();
      } else return Promise.reject(`Что-то пошло не так: ${result.status}`);
    });
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then((result) => {
      if (result.ok) {
        return result.json();
      } else return Promise.reject(`Что-то пошло не так: ${result.status}`);
    });
  }

  setUserInfo({ name, about }) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((result) => {
      if (result.ok) {
        return result.json();
      } else return Promise.reject(`Что-то пошло не так: ${result.status}`);
    });
  }

  setUserAvatar({ avatar }) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((result) => {
      if (result.ok) {
        return result.json();
      } else return Promise.reject(`Что-то пошло не так: ${result.status}`);
    });
  }

  addNewCard({ link, name }) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((result) => {
      if (result.ok) {
        return result.json();
      } else return Promise.reject(`Что-то пошло не так: ${result.status}`);
    });
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((result) => {
      if (result.ok) {
        return result.json();
      } else return Promise.reject(`Что-то пошло не так: ${result.status}`);
    });
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return fetch(`${this._url}/cards/likes/${id}`, {
        method: "DELETE",
        headers: this._headers,
      }).then((result) => {
        if (result.ok) {
          return result.json();
        } else return Promise.reject(`Что-то пошло не так: ${result.status}`);
      });
    } else {
      return fetch(`${this._url}/cards/likes/${id}`, {
        method: "PUT",
        headers: this._headers,
      }).then((result) => {
        if (result.ok) {
          return result.json();
        } else return Promise.reject(`Что-то пошло не так: ${result.status}`);
      });
    }
  }

  setLike(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: "PUT",
      headers: this._headers,
    }).then((result) => {
      if (result.ok) {
        return result.json();
      } else return Promise.reject(`Что-то пошло не так: ${result.status}`);
    });
  }

  deleteLike(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((result) => {
      if (result.ok) {
        return result.json();
      } else return Promise.reject(`Что-то пошло не так: ${result.status}`);
    });
  }
}

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-17",
  headers: {
    authorization: "159d2343-af0f-47ed-9479-4499ffedf0da",
    "Content-Type": "application/json",
  },
});

export default api;
