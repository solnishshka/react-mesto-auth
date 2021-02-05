import PopupWithForm from "./PopupWithForm";
import React from "react";

export default function AddPlacePopup(props) {
  const [cardName, setCardName] = React.useState("");
  const [cardUrl, setCardUrl] = React.useState("");

  React.useEffect(() => {
    if (!props.isOpen) {
      setCardName("");
      setCardUrl("");
    }
  }, [props.isOpen]);

  function handleChangeCardName(e) {
    setCardName(e.target.value);
  }

  function handleChangeCardUrl(e) {
    setCardUrl(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddNewCard({
      link: cardUrl,
      name: cardName,
    });
  }

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      submitText={props.submitText}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="name"
        placeholder="Название места"
        className="form__item form__item_el_title"
        id="cardTitle"
        minLength="2"
        maxLength="30"
        onChange={handleChangeCardName}
        value={cardName}
        required
      />
      <span className="form__item-error" id="cardTitle-error"></span>
      <input
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        className="form__item form__item_el_link"
        id="cardLink"
        onChange={handleChangeCardUrl}
        value={cardUrl}
        required
      />
      <span className="form__item-error" id="cardLink-error"></span>
    </PopupWithForm>
  );
}
