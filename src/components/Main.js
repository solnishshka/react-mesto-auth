import React, { useContext } from "react";
import editAvatarButton from "../images/editAvatarButton.svg";
import Card from "../components/Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div
          className="profile__avatar-container"
          style={{
            backgroundImage: `url(${editAvatarButton})`,
          }}
        >
          <img
            alt="Логотип профиля"
            className="profile__avatar"
            src={currentUser.avatar}
            onClick={props.onEditAvatar}
          />
        </div>
        <div className="profile__profile-info">
          <div className="profile__title-item">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button
              className="profile__edit-button"
              type="button"
              aria-label="Редактировать профиль"
              onClick={props.onEditProfile}
            />
          </div>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          aria-label="Добавить"
          onClick={props.onAddPlace}
        />
      </section>

      <section className="elements">
        {props.cards.map((item) => (
          <Card
            card={item}
            onCardClick={props.onCardClick}
            key={item._id}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
