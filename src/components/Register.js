import { Link } from "react-router-dom";
import React, { useState } from "react";

export default function Register({ handleRegister }) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  function handleInputChange(evt) {
    const { name, value } = evt.target;
    setFormValue((prevState) => ({ ...prevState, [name]: value }));
  }

  const { email, password } = formValue;

  function handleSubmit(evt) {
    evt.preventDefault();
    handleRegister(email, password);
  }

  return (
    <form
      className="form form_theme_auth"
      name="register"
      onSubmit={handleSubmit}
    >
      <h2 className="form__title form__title_theme_auth">Регистрация</h2>
      <input
        value={email || ""}
        type="email"
        name="email"
        placeholder="Email"
        className="form__item form__item_type_auth form__item_el_email"
        id="email"
        onChange={handleInputChange}
        required
      />
      <span className="form__item-error" id="email-error"></span>
      <input
        value={password || ""}
        type="password"
        name="password"
        placeholder="Пароль"
        className="form__item form__item_type_auth form__item_el_password"
        id="password"
        onChange={handleInputChange}
        required
      />
      <span className="form__item-error" id="password-error"></span>
      <button
        type="submit"
        className="form__submit-button form__submit-button_theme_auth"
      >
        Зарегистрироваться
      </button>
      <p className="form__text">
        Уже зарегистрированы?
        <Link to="/sign-in" className="form__link">
          Войти
        </Link>
      </p>
    </form>
  );
}
