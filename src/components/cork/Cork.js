import React from 'react';
import './cork.css'

const Cork = (props) => (
  <section id={props.id} className='order-background'>
    <div className='border'>
      <div className='preparing-order'>
        <h1 className='cork-titles'>{props.name || 'PREPARANDO'}</h1>
        <div className='orders-wrap'>
          {props.children}
        </div>
      </div>
      <div className='ready-order'>
        <h1 className='cork-titles'>PRONTOS </h1>
        <div className='orders-wrap'>
          {props.secondChildren}
        </div>
      </div>
    </div>
  </section>
)

export default Cork;