import React from 'react';
import DeleteCardButton from './DeleteCardButton';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = isLiked ? 'element__like element__like_active' : 'element__like'; 

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLike() {
    props.onCardLike(props.card);
  }

  function handleDelete() {
    props.onCardDelete(props.card);
  }
  
  return (
    <article className="element">
      <DeleteCardButton isOwn={isOwn} handleDelete={handleDelete}/>                  
      <img src={props.card.link} alt={props.card.name} className="element__image" onClick={handleClick} />
      <div className="element__info">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__likes">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLike}></button>
          <span className="element__likes-amount">{props.card.likes.length}</span>
        </div>
      </div>
    </article>
  );
}

export default Card;