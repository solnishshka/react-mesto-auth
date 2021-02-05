import PopupWithForm from "./PopupWithForm";

export default function ConfirmDeletePlacePopup(props) {
  function handleSubmit(e) {
    e.preventDefault();

    props.onDeleteCard(props.cardId);
  }

  return (
    <PopupWithForm
      name="apply-delete"
      title="Вы уверены?"
      submitText={props.submitText}
      onClose={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
    />
  );
}
