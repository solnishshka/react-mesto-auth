import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import { register, login, checkToken } from "../utils/auth";
import CurrentUserContext from "../contexts/CurrentUserContext";
import ConfirmDeletePlacePopup from "./ConfirmDeletePlacePopup";
import { Switch, Route, useHistory, withRouter } from "react-router-dom";
import InfoTooltip from "./InfoTooltip";

function App(props) {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(
    false
  );
  const [isInfoTooltipPopupOpen, setIsTooltipPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({
    isOpen: false,
    cardImage: "",
    cardTitle: "",
  });
  const [cardIdForDelete, setCardIdForDelete] = useState("");
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSuccessRegister, setIsSuccessRegister] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const handleTokenCheck = () => {
    if (localStorage.getItem("jwt")) {
      const token = localStorage.getItem("jwt");

      checkToken(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setUserEmail(res.data.email);
            history.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleRegister = (email, password) => {
    register(email, password)
      .then((result) => {
        if (result) {
          history.push("/sign-in");
          handleInfoTooltipPopupOpen(true);
        }
      })
      .catch((err) => {
        console.log(err);
        handleInfoTooltipPopupOpen(false);
      });
  };

  const handleLogin = (email, password) => {
    login(email, password)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          localStorage.setItem("jwt", res.token);
          setUserEmail(email);
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
        handleInfoTooltipPopupOpen(false);
      });
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    history.push("/sign-in");
  };

  useEffect(() => {
    handleTokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      history.push("/");
    }
  }, [loggedIn]);

  useEffect(() => {
    api
      .getInitialCards()
      .then((items) => {
        setCards(items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(cardId) {
    setIsLoading(true);
    api
      .deleteCard(cardId)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== cardId);
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
        closeAllPopups();
      });
  }

  function handleAddPlaceSubmit(cardData) {
    setIsLoading(true);
    api
      .addNewCard(cardData)
      .then((card) => {
        setCards([card, ...cards]);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
        closeAllPopups();
      });
  }

  function handleEditAvatarClick(e) {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick(e) {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick(e) {
    setIsAddPlacePopupOpen(true);
  }

  function handleDeleteCardClick(e) {
    setIsConfirmDeletePopupOpen(true);
    setCardIdForDelete(e._id);
  }

  function handleCardClick(card) {
    setSelectedCard({
      isOpen: true,
      cardImage: card.link,
      cardTitle: card.name,
    });
  }

  function handleInfoTooltipPopupOpen(success) {
    setIsTooltipPopupOpen(true);
    setIsSuccessRegister(success);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard({
      isOpen: false,
      cardImage: "",
      cardTitle: "",
    });
    setIsTooltipPopupOpen(false);
  }

  function handleOvelayOrCrossClose(evt) {
    if (
      evt.target.classList.contains("popup") ||
      evt.target.classList.contains("popup__close-button")
    ) {
      closeAllPopups();
    }
  }

  const handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      closeAllPopups();
    }
  };

  function handleUpdateUser(userData) {
    setIsLoading(true);
    api
      .setUserInfo(userData)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
        closeAllPopups();
      });
  }

  function handleUpdateAvatar(userAvatar) {
    setIsLoading(true);
    api
      .setUserAvatar(userAvatar)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
        closeAllPopups();
      });
  }

  return (
    <div className="App" onKeyUp={handleEscClose}>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page__container">
          <Switch>
            <Route exact path="/">
              {loggedIn && (
                <Header
                  type="isLoggedIn"
                  loggedIn={loggedIn}
                  text="Выйти"
                  handleLogout={handleLogout}
                  email={userEmail}
                />
              )}
              <ProtectedRoute
                path="/"
                component={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleDeleteCardClick}
                loggedIn={loggedIn}
              />
            </Route>
            <Route path="/sign-up">
              {!loggedIn && (
                <Header type="register" link="/sign-in" text="Войти" />
              )}
              <Register handleRegister={handleRegister} />
            </Route>
            <Route path="/sign-in">
              {!loggedIn && (
                <Header type="login" link="/sign-up" text="Регистрация" />
              )}
              <Login handleLogin={handleLogin} />
            </Route>
          </Switch>
          {loggedIn && <Footer />}
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={handleOvelayOrCrossClose}
            onUpdateUser={handleUpdateUser}
            submitText={isLoading ? "Сохранение..." : "Сохранить"}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={handleOvelayOrCrossClose}
            onUpdateAvatar={handleUpdateAvatar}
            submitText={isLoading ? "Сохранение..." : "Сохранить"}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={handleOvelayOrCrossClose}
            onAddNewCard={handleAddPlaceSubmit}
            submitText={isLoading ? "Сохранение..." : "Создать"}
          />
          <ConfirmDeletePlacePopup
            isOpen={isConfirmDeletePopupOpen}
            onClose={handleOvelayOrCrossClose}
            onDeleteCard={handleCardDelete}
            cardId={cardIdForDelete}
            submitText={isLoading ? "Удаляем..." : "Да"}
          />

          <ImagePopup card={selectedCard} onClose={handleOvelayOrCrossClose} />

          <InfoTooltip
            success={isSuccessRegister}
            isOpen={isInfoTooltipPopupOpen}
            onClose={handleOvelayOrCrossClose}
          />
        </div>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default withRouter(App);
