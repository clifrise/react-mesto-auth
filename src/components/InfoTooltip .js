import React from 'react';

import successIcon from '../images/success_true.svg';
import faildIcon from '../images/success_false.svg';

function InfoTooltip(props) {
  return (
    <section className={`popup popup_tooltip ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_theme_tooltip">     
        <div className="tooltip">
          <img src={props.success ? successIcon : faildIcon} alt={'Результат регистрации'} className="tooltip__image" />
          <p className="tooltip__description">
            {props.success
              ? 'Вы успешно зарегистрировались!' 
              : 'Что-то пошло не так! Попробуйте ещё раз.'}
          </p>
        </div> 
        <button className="popup__close" type="button" onClick={props.onClose}></button>
      </div>
    </section>
  );
}

export default InfoTooltip;