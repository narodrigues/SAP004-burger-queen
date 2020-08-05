import React from 'react';
import { Link } from 'react-router-dom';
import './modalConfirm.css';
import Button from '../button/Button';

export default function ModalConfirm() {
  return (
    <div className='confirm-request'>
      <div>
        <p>PEDIDO REGISTRADO</p>
      </div>
      <div className='btn-confirms'>
        <Button>
          <Link to="/Hall" className='btn-order'>Próximo Pedido</Link>
        </Button>
      </div>
    </div>
  );
}