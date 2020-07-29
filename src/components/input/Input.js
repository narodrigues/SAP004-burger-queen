import React from 'react';
import './input.css'

const Input = (props) => {
  return (
    <input checked={props.checked} type={props.type} className={props.class} name={props.name} value={props.value} id={props.id} placeholder={props.placeholder} onChange={props.onChange} />
  );
};

export default Input;