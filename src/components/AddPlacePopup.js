import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props){

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name,
      link,
    });
  }

  return (
    <PopupWithForm title="Новое место" name="place-add"  isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <input id="place-name" onChange={handleNameChange} type="text" className="form__item form__item_el_name" name="place-name" placeholder="Название" required minLength="2" maxLength="30" />
      <span id="place-name-error" className="form__item-error"></span>
      <input id="place-link" onChange={handleLinkChange} type="url" className="form__item form__item_el_status" name="place-link" placeholder="Ссылка на картинку" required />
      <span id="place-link-error" className="form__item-error"></span>
      <button className="popup__button" type="submit">Сохранить</button>
    </PopupWithForm>
  );
}

export default AddPlacePopup;