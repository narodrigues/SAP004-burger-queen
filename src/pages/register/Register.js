import React, { Component } from "react";
import './register.css';
import Button from '../../components/button/Button';
import Overlay from '../../components/overlay/overlay';
import Input from '../../components/input/Input';

export default class Register extends Component {
  render() {
    return (
      <section>
        <Overlay className='overlay' />
        <div>
          <form className='form-register'>
            <Input type='text' placeholder='nome' id='emal-login' />
            <Input type='email' placeholder='email@exemple.com' id='emal-register' />
            <Input type='password' placeholder='senha' id='password-register' />
            <label for='kitchen'>COZINHA</label>
            <Input type='radio' className='radio-button' name='kitchen' id='persona-kitchen' />
            <label for='hall'>SALÃO</label>
            <Input type='radio' className='radio-button' name='hall' id='persona-hall' />
            <Button id='btn-cancel' className='button' name='Cancelar' />
            <Button id='btn-confirm' className='button' name='Confirmar' />
          </form>
        </div>
      </section>
    )
  }
}