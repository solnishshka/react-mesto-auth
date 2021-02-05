import PopupWithForm from "./PopupWithForm";
import React, { useRef, useEffect } from "react";

export default function EditAvatarPopup(props) {
  const imageRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: imageRef.current.value,
    });
  }

  useEffect(() => {
    if (props.isOpen) {
      imageRef.current.value = "";
    }
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      submitText={props.submitText}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        name="avatarLink"
        placeholder="Ссылка на аватарку"
        className="form__item form__item_el_link-avatar"
        id="avatarLink"
        ref={imageRef}
        required
      />
      <span className="form__item-error" id="avatarLink-error"></span>
    </PopupWithForm>
  );
}
