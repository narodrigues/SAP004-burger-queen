import './button.css';
import React from 'react';

const Button = props => (
  <button id={props.id} value={props.value} className={`standard-btn ${props.className}`} onClick={props.handleClick}>
    {props.name}{props.children}
  </button>
)

export default Button;