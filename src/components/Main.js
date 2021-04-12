import React, {useContext} from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main page__main">
      <section className="profile main__profile">
        <div className="profile__avatar" onClick={props.onEditAvatar} style={ { backgroundImage: props.dataLoaded ? `url(${currentUser.avatar})` : 'none' } } >
          <div className="profile__overlay"></div>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
          <p className="profile__status">{currentUser.about}</p>
        </div>
        <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
      </section>
      <section className="elements">
        {props.cards.map((card) => {
        return (
            <Card key={card._id} card={card} onCardClick={props.onCardClick} onCardLike={props.handleCardLike} onCardDelete={props.handleCardDelete} />
          )
        })}
      </section>
    </main>
  )
}

export default Main;