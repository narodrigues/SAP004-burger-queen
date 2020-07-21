import React, { Component } from "react";
import Header from '../../components/header/Header';
import Register from '../register/Register';
import Button from '../../components/button/Button';
import Modal from '../../components/modal/Modal';
import Input from '../../components/input/Input';
import './login.css';

export default class Login extends Component {
  state = { show: false };

  showModalRegister = (e) => {
    e.preventDefault()
    this.setState({ show: true });
  };

  render() {
    return (
      <section className='flex-row-desk'>
        <Header />
        <div>
          <form className='form-login'>
            <Input type='email' placeholder='email@exemple.com' id='emal-login' />
            <Input type='password' placeholder='senha' id='password-login' />
            <div className='div-buttons-login'>
              <Button id='btn-login' className='button' name='Entrar' />
              <span>Ainda não é registrado?</span>
              <Button handleClick={this.showModalRegister} id='btn-register' className='button' name='Registrar-se' />
            </div>
          </form>
        </div>
        <Modal show={this.state.show}>
          <Register />
        </Modal>
      </section>
    )
  }
}