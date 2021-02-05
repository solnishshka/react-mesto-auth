import logo from "../images/logo.svg";
import { Link } from "react-router-dom";
import React, { useState } from "react";

function Header(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  return (
    <header className="header">
      {props.loggedIn && isOpen && (
        <div className="header__menu">
          <p
            className={`header__email header__email_theme_menu ${
              isOpen && "header__email_visible"
            }`}
          >
            {props.email}
          </p>
          <button
            type="button"
            className={`header__button header__button_theme_menu ${
              isOpen && "header__button_visible"
            }`}
            onClick={() => props.handleLogout()}
          >
            {props.text}
          </button>
        </div>
      )}
      <div className="header__container">
        <img src={logo} alt="Логотип сервиса Место" className="header__logo" />
        {!props.loggedIn && (
          <Link className="header__link" to={props.link}>
            {props.text}
          </Link>
        )}
        {props.loggedIn && (
          <>
            <p className="header__email">{props.email}</p>

            <button
              type="button"
              className="header__button"
              onClick={() => props.handleLogout()}
            >
              {props.text}
            </button>
            <button
              className={`header__burger-menu ${
                isOpen && "header__burger-menu_opened"
              }`}
              onClick={toggleMenu}
            />
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
