import './button.css';
import React from 'react';

const Button = props => (
  <button
    className={`standard-btn ${props.className}`}
    id={props.id}
    onClick={props.handleClick}
    value={props.value}
  >
    {props.name}{props.children}
  </button>
)

export default Button;