import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
  const initialData = {
    email: '',
    password: '',
  };
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

    onRegister(data)
      .then(resetForm);
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form onSubmit={handleSubmit} className="form form_theme_dark" autoComplete="off">
        <input id="email" name="email" type="email" value={data.email} onChange={handleChange} className="form__item form__item form__item_theme_dark" placeholder="Email" />
        <input id="password" name="password" type="password" value={data.password} onChange={handleChange} className="form__item form__item form__item_theme_dark" placeholder="Пароль" />
        <button type="submit" className="form__button">Зарегистрироваться</button>
      </form>
      <p className="auth__alternate">Уже регистрировались? <Link className="auth__link" to="/sign-in">Войти</Link></p>
    </div>
  );
}

export default Register;