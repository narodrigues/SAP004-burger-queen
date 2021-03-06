import React from 'react';

const Input = props =>
  <input
    checked={props.checked}
    type={props.type} className={props.class}
    name={props.name}
    value={props.value}
    id={props.id}
    placeholder={props.placeholder}
    min={props.min}
    max={props.max}
    onChange={props.onChange}
  />

export default Input;