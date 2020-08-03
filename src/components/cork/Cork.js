import React from 'react';
import './cork.css'

const Cork = (props) => (
  <section id={props.id} className='order-background'>
    <div className='border'>
      <div className='preparing-order'>
        <p className='cork-titles'>PREPARANDO</p>
        <div className='orders-wrap'>
          {props.children}
        </div>
      </div>
      <div className='ready-order'>
        <p className='cork-titles'>PRONTO</p>
      </div>
    </div>
  </section>
)

export default Cork;