import React from 'react';
import Button from '../button/Button';
import './modalConfirm.css'

export default function ModalConfirm() {
  return (
    <div className='confirm-request'>
      <div>
        <p>PEDIDO REGISTRADO</p>
      </div>
      <div className='btn-confirms'>
        <Button id='btn-confirm' className='button' name='PRÓXIMO PEDIDO' />
      </div>
    </div>
  )
}