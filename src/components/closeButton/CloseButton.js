import React from 'react';
import './closeButton.css';

const CloseButton = props => (
  <button id={props.id} className='close-modal' onClick={props.onClick}>{props.name}</button>
);

export default CloseButton;