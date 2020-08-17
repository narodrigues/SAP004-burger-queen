import React from 'react';

const Input = props =>
  <input
    checked={props.checked}
    className={props.className}
    id={props.id}
    max={props.max}
    min={props.min}
    name={props.name}
    placeholder={props.placeholder}
    onChange={props.onChange}
    type={props.type} 
    value={props.value}
  />

export default Input;