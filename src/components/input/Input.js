import React from 'react';

const Input = (props) => (
    <input type={props.type} className={props.class} name={props.name} id={props.id} placeholder={props.placeholder}/>
);

export default Input;