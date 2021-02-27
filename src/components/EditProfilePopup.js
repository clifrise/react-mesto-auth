import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {

  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState(currentUser.name);
  const [description, setDescription] = React.useState(currentUser.about);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]); 

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm title="Редактировать профиль" name="profile-edit" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <input value={name || ''} onChange={handleNameChange} id="profile-name" type="text" className="form__item form__item_el_name" name="profile-name" required minLength="2" maxLength="40" />
      <span id="profile-name-error" className="form__item-error"></span>
      <input value={description || ''} onChange={handleDescriptionChange} id="profile-status" type="text" className="form__item form__item_el_status" name="profile-status" required minLength="2" maxLength="200" />
      <span id="profile-status-error" className="form__item-error"></span>
      <button className="popup__button" type="submit">Сохранить</button>
    </PopupWithForm>
  )
}

export default EditProfilePopup;