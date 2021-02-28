import React, { useState } from 'react';

function Login({ onLogin }) {  
  const initialData = {
    email: '',
    password: '',
  }
  const [data, setData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(data => ({
      ...data,
      [name]: value,
    }));
  }

  const resetForm = () => {
    setData(initialData);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!data.email || !data.password) {
      return;
    }

    onLogin(data)
      .then(resetForm)      
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
      <form onSubmit={handleSubmit} className="form form_theme_dark" autoComplete="off">
        <input id="email" name="email" type="email" value={data.email} onChange={handleChange} className="form__item form__item_theme_dark" placeholder="Email" />
        <input id="password" name="password" type="password" value={data.password} onChange={handleChange} className="form__item form__item_theme_dark" placeholder="Пароль" />
        <button type="submit" className="form__button">Войти</button>
      </form>
    </div>
  );
}

export default Login;