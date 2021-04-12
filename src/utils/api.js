import { BASE_URL } from './constants';
class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    const url = this._baseUrl+'/users/me';
    return fetch(url, {
      method: 'GET',
      headers: this._headers,
    })
    .then(res => {
      return this._checkStatus(res);
    });
  }

  getInitialCards() {
    const url = this._baseUrl+'/cards';
    return fetch(url, {
      method: 'GET',
      headers: this._headers,
    })
    .then(res => {
      return this._checkStatus(res);
    });
  }

  setUserProfile(name, status) {
    const url = this._baseUrl+'/users/me';
    return fetch(url, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: status,
      }),
    })
    .then(res => {
      return this._checkStatus(res);
    });
  }

  addCard(name, link) {
    const url = this._baseUrl+'/cards';
    return fetch(url, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
    .then(res => {
      return this._checkStatus(res);
    });
  }

  removeCard(cardId) {
    const url = `${this._baseUrl}/cards/${cardId}`;
    return fetch(url, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(res => {
      return this._checkStatus(res);
    });
  }

  addLike(cardId) {
    const url = `${this._baseUrl}/cards/likes/${cardId}`;
    return fetch(url, {
      method: 'PUT',
      headers: this._headers,
    })
    .then(res => {
      return this._checkStatus(res);
    });
  }

  removeLike(cardId) {
    const url = `${this._baseUrl}/cards/likes/${cardId}`;
    return fetch(url, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(res => {
      return this._checkStatus(res);
    });
  }

  setAvatar(link) {
    const url = this._baseUrl+'/users/me/avatar';
    return fetch(url, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    })
    .then(res => {
      return this._checkStatus(res);
    });
  }
}

const api = new Api({
  baseUrl: BASE_URL,
  headers: {
    authorization: localStorage.getItem('jwt'),
    'Content-Type': 'application/json'
  }
});

export default api;