import React, { Component } from "react";
import './register.css';
import Button from '../../components/button/Button';
// import Overlay from '../../components/overlay/overlay';
import Input from '../../components/input/Input';

export default class Register extends Component {
  render() {
    return (
      <form className='form-register modal-main'>
        <Input type='text' placeholder='nome' id='emal-login' />
        <Input type='email' placeholder='email@exemple.com' id='emal-register' />
        <Input type='password' placeholder='senha' id='password-register' />
        <label htmlFor='option'>COZINHA</label>
        <Input type='radio' className='radio-button' name='option' id='kitchen' />
        <label htmlFor='option'>SALÃO</label>
        <Input type='radio' className='radio-button' name='option' id='hall' />
        <Button id='btn-cancel' className='button' name='Cancelar' />
        <Button id='btn-confirm' className='button' name='Confirmar' />
      </form>

    )
  }
}