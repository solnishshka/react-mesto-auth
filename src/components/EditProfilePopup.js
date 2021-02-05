import PopupWithForm from "./PopupWithForm";
import React, { useState, useContext, useEffect } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function EditProfilePopup(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  useEffect(() => {
    if (!props.isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [props.isOpen, currentUser]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      submitText={props.submitText}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="userName"
        onChange={handleChangeName}
        placeholder="Имя"
        className="form__item form__item_el_name"
        id="userName"
        maxLength="40"
        minLength="2"
        value={name ? name : ""}
        required
      />
      <span className="form__item-error" id="userName-error"></span>
      <input
        type="text"
        name="userJob"
        onChange={handleChangeDescription}
        placeholder="О себе"
        className="form__item form__item_el_position"
        id="userJob"
        minLength="2"
        maxLength="200"
        value={description ? description : ""}
        required
      />
      <span className="form__item-error" id="userJob-error"></span>
    </PopupWithForm>
  );
}
