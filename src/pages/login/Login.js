import React, { Component } from "react";
import Header from '../../components/header/Header';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import './login.css';

export default class Login extends Component {
  render() {
    return (
      <section className='flex-row-desk'>
        <Header />
        <div>
          <form className='form-login'>
            <Input type='email' placeholder='email@exemple.com' id='emal-login' />
            <Input type='password' placeholder='senha' id='password-login' />
            <div className='div-buttons-login'>
              <Button id='btn-confirm' className='button' name='Entrar' />
              <span>Ainda não é registrado?</span>
              <Button id='btn-register' className='button' name='Registrar-se' />
            </div>
          </form>
        </div>
        
      </section>
    )
  }
}