import React, { useState } from "react";

export default function Login({ handleLogin }) {
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
    handleLogin(email, password);
  }

  return (
    <form className="form form_theme_auth" name="login" onSubmit={handleSubmit}>
      <h2 className="form__title form__title_theme_auth">Вход</h2>
      <input
        onChange={handleInputChange}
        type="email"
        name="email"
        value={email}
        placeholder="Email"
        className="form__item form__item_type_auth form__item_el_email"
        id="email"
        required
      />
      <span className="form__item-error" id="email-error"></span>
      <input
        onChange={handleInputChange}
        type="password"
        name="password"
        value={password}
        placeholder="Пароль"
        className="form__item form__item_type_auth form__item_el_password"
        id="password"
        required
      />
      <span className="form__item-error" id="password-error"></span>
      <button
        type="submit"
        className="form__submit-button form__submit-button_theme_auth"
      >
        Войти
      </button>
    </form>
  );
}
