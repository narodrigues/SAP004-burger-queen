import React from 'react';
import './button.css'

const Button = (props) => (
  <button id={props.id} className={`standard-btn ${props.class}`} onClick={props.handleClick}>
    {props.name}{props.children}
  </button>
)

export default Button;