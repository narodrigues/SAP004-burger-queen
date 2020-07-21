import React, { useState } from "react";
import Header from '../../components/header/Header';
import Register from '../register/Register';
import Button from '../../components/button/Button';
import Modal from '../../components/modal/Modal';
import Input from '../../components/input/Input';
// import firebase from '../../configure-firebase';
import './login.css';

export default function Login() {
  const [modalRegister, setModalRegister] = useState(false);

  return (
    <section className='flex-row-desk'>
      <Header />
      <div>
        <form className='form-login'>
          <Input type='email' placeholder='email@exemple.com' id='email-login' />
          <Input type='password' placeholder='senha' id='password-login' />
          <div className='div-buttons-login'>
            <Button id='btn-login' className='button' name='Entrar' />
            <span>Ainda não é registrado?</span>
          </div>
        </form>
        <Button handleClick={() => setModalRegister(true)} id='btn-register' className='button' name='Registrar-se' />
      </div>
      <Modal show={modalRegister}>
        <Register />
      </Modal>
    </section>
  );
};