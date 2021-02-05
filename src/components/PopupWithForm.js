import React from "react";

const PopupWithForm = (props) => {
  return (
    <div
      className={`popup popup_theme_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
      onClick={props.onClose}
    >
      <div className={`popup__container popup__container_theme_${props.name}`}>
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть"
        />
        <form
          className={`form form_type_${props.name}`}
          name={props.name}
          onSubmit={props.onSubmit}
          noValidate
        >
          <h2 className="form__title">{props.title}</h2>
          {props.children}
          <button type="submit" className="form__submit-button">
            {props.submitText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
