import React, {useState, useEffect, useCallback} from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip ';
import PlaceRemoveConfirmation from './PlaceRemoveConfirmation';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Footer from './Footer';
import * as auth from '../utils/auth';

import api from "../utils/api";

function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const history = useHistory();

  const authCheck = useCallback(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.data.email)
            history.push('/cards');
          }
        })
        .catch(() => history.push('/sign-in'));
    }
  }, [history])

  useEffect(() => {
    authCheck();
  }, [])

  const handleLogin = ({ email, password }) => {
    return auth.login(email, password)
      .then(res => {      
        if (res.token) {
          setEmail(email);
          setLoggedIn(true);
          localStorage.setItem('jwt', res.token);
          history.push('/cards');
        };
      })
      .catch(res => {
        console.log(res);      
      })
  }

  const handleRegister = ({ email, password }) => {
    return auth.register(email, password)
      .then(res => { 
        setSuccess(true);
        setInfoTooltipPopupOpen(true);
        history.push('/sign-in');
        return res;
      })
      .catch(res => {
        setInfoTooltipPopupOpen(true);
        console.log(res);      
      })
  }

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setEmail('');
    setLoggedIn(false);
    history.push('/sign-in');
  }

  useEffect(() => {
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

  useEffect(() => {
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
    setInfoTooltipPopupOpen(false);
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
          <Header email={email} isLogged={loggedIn} onLogout={handleLogout}/>
          <Switch>            
            <Route path="/sign-up">              
              <Register onRegister={handleRegister} />
            </Route>
            <Route path="/sign-in">              
              <Login onLogin={handleLogin} />
            </Route>
            <ProtectedRoute 
              path="/cards" 
              loggedIn={loggedIn}
              component={Main}
              onEditProfile={handleEditProfileClick} 
              onAddPlace={handleAddPlaceClick} 
              onEditAvatar={handleEditAvatarClick} 
              onCardClick={handleCardClick} 
              cards={cards} 
              handleCardLike={handleCardLike} 
              handleCardDelete={handleCardDelete}>              
            </ProtectedRoute>
            <Route>
              {loggedIn ? <Redirect to="/cards" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>
          <Footer />
        </div>
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />  
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace}/> 
        <PopupWithForm title="Вы уверены?" name="place-remove">
          <PlaceRemoveConfirmation />
        </PopupWithForm>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip isOpen={isInfoTooltipPopupOpen} onClose={closeAllPopups} success={success}/>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
