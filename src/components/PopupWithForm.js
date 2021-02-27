import React from 'react';

function PopupWithForm(props) {
  return (
    <section className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_theme_edit-form">
        <h2 className="popup__title">{`${props.title}`}</h2>
        <form className="form form_place" name={`${props.name}`}  onSubmit={props.onSubmit} noValidate>
          {props.children}
        </form>
        <button className="popup__close" type="button" onClick={props.onClose}></button>
      </div>
    </section>
  );
}

export default PopupWithForm;