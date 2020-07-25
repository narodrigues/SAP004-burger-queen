import React from 'react';
import './cork.css'

const Cork = (props) => (
  // <section id={props.id} className={props.class}>
  <section id={props.id} className='order-background'>
    <div className='preparing-order'>
      <p>PREPARANDO</p>
    </div>
    <div className='ready-order'>
      <p>PRONTO</p>
    </div>
  </section>
)

export default Cork;