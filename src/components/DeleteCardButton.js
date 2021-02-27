import React from 'react';

function DeleteCardButton(props) {
  if (props.isOwn) {
    return (
      <button className="element__delete" type="button" onClick={props.handleDelete}></button> 
    )
  } else {
    return null;
  }
}

export default DeleteCardButton;