import React, { Component } from "react";
import './register.css';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';

export default class Register extends Component {
  render() {
    return (
      <form className='form-register modal-main overlay'>
        <div className='inputs-text'>
          <Input type='text' placeholder='nome' id='emal-login' />
          <Input type='email' placeholder='email@exemple.com' id='emal-register' />
          <Input type='password' placeholder='senha' id='password-register' />
        </div>
        <div className='select-role'>
          <label htmlFor='kitchen'>COZINHA</label>
          <Input type='radio' className='radio-button' name='option' id='kitchen' />
          <label htmlFor='hall'>SALÃO</label>
          <Input type='radio' className='radio-button' name='option' id='hall' />
        </div>
        <div className='btn-confirms'>
          <Button id='btn-cancel' className='button' name='Cancelar' />
          <Button id='btn-confirm' className='button' name='Confirmar' />
        </div>
      </form>

    )
  }
}