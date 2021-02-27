import React from 'react';

function ImagePopup(props) {
  return(
    <section className={`popup popup_lightbox ${props.card ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_theme_lightbox">     
        <div className="lightbox">
          <img src={props.card ? props.card.link : '#'} alt={props.card ? props.card.name : ''} className="lightbox__image" />
          <p className="lightbox__title">{props.card ? props.card.name : ''}</p>
        </div> 
        <button className="popup__close" type="button" onClick={props.onClose}></button>
      </div>
    </section>
  );
}

export default ImagePopup;