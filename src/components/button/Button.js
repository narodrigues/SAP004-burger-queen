import React from 'react';
import './button.css'

const Button = (props) => (
  <button id={props.id} className={`standard-btn ${props.class}`} onClick={props.handleClick}>{props.name}</button>
)

export default Button;