import React, { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__like-button ${
    isLiked ? "element__like-button_liked" : ""
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteCard() {
    props.onCardDelete(props.card);
  }

  return (
    <div className="element">
      <img
        className="element__image"
        src={props.card.link}
        onClick={handleClick}
        alt={`На фотографии: ${props.card.name}`}
      />
      <button
        className={`element__delete-button ${
          props.card.owner._id !== currentUser._id
            ? "element__delete-button_hidden"
            : ""
        }`}
        type="button"
        aria-label="Удалить"
        onClick={handleDeleteCard}
      ></button>
      <div className="element__title-item">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__like">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            type="button"
            aria-label="Нравится"
          />
          <p className="element__like-count">{props.card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
