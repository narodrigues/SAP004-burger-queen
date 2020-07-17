import React from 'react';
import './button.css'

const Button = (props) => (
  <button id={props.id} className={props.class}>{props.name}</button>
)

export default Button;