import React from 'react';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import PlaceRemoveConfirmation from './PlaceRemoveConfirmation';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Footer from './Footer';

import api from "../utils/api";

function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getInitialCards()
      .then((initialCards) => {
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const likeRequest = !isLiked ? api.addLike(card._id) : api.removeLike(card._id);
    likeRequest
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      }).catch((err) => {
        console.log(err);
      });    
  } 

  function handleCardDelete(card) {
    api.removeCard(card._id)
    .then(() => {
      const newCards = cards.filter((c) => !(c._id === card._id));
      setCards(newCards);
    }).catch((err) => {
      console.log(err);
    });    
  }

  React.useEffect(() => {
    api.getUserInfo()
      .then((initialUser) => {
        setCurrentUser(initialUser);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);
       
  function handleEditProfileClick(event) {
    setEditProfilePopupOpen(true);
  }
  
  function handleAddPlaceClick(event) {
    setAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick(event) {
    setEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  function handleUpdateUser(userData) {
    api.setUserProfile(userData.name, userData.about)
    .then((newUser) => {      
      setCurrentUser(newUser);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleUpdateAvatar(link) {
    api.setAvatar(link.avatar)
    .then((newUser) => {      
      setCurrentUser(newUser);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleAddPlace(cardData) {
    api.addCard(cardData.name, cardData.link)
    .then((newCard) => {      
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  return (
    <div className="root">
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header />
          <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} cards={cards} handleCardLike={handleCardLike} handleCardDelete={handleCardDelete}/>
          <Footer />
        </div>
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />  
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace}/> 
        <PopupWithForm title="Вы уверены?" name="place-remove">
          <PlaceRemoveConfirmation />
        </PopupWithForm>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} /> 
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
