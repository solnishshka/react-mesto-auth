function ImagePopup(props) {
  return (
    <div
      className={`popup popup_theme_preview-image ${
        props.card.isOpen ? "popup_opened" : ""
      }`}
      onClick={props.onClose}
    >
      <div className="popup__container popup__container_theme_preview-image">
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть"
        />
        <figure className="popup__figure">
          <img
            className="popup__image"
            src={props.card.cardImage}
            alt={`На фотографии: ${props.card.cardTitle}`}
          />
          <figcaption className="popup__capture">
            {props.card.cardTitle}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
