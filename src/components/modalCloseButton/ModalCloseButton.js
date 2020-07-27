import React from 'react';
import './modalCloseButton.css'

const CloseModal = (props) => (
  <button id={props.id} className='close-modal' onClick={props.onClick}>{props.name}</button>
)

export default CloseModal;