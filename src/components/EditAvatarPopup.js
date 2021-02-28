import React, {useRef} from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {

  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm title="Обновить аватар" name="avatar-edit" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <input ref={avatarRef} id="avatar-link" type="url" className="form__item form__item_el_status" name="avatar-link" placeholder="Ссылка на картинку" required />
      <span id="avatar-link-error" className="form__item-error"></span>
      <button className="popup__button" type="submit">Сохранить</button>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;