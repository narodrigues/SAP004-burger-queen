import React, { useState } from "react";
import Header from '../../components/header/Header';
import Register from '../register/Register';
import Button from '../../components/button/Button';
import Modal from '../../components/modal/Modal';
import Input from '../../components/input/Input';
import firebase from '../../configure-firebase';
import './login.css';

export default function Login() {
  const [modalRegister, setModalRegister] = useState(false);
  const [register, setRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const changeShow = (e, show) => {
    e.preventDefault();
    setRegister(!show)
  }

  function closeModal() {
    setModalRegister(false);
  }

  const login = (e, email, password) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => alert(error.code));
  }
  
  return (
    <section className='flex-row-desk'>
      <Header />
      <div>
        <form className='form-login'>
          <Input type='email' placeholder='email@exemple.com' id='emal-login' onChange={(e) => setEmail(e.target.value)}/>
          <Input type='password' placeholder='senha' id='password-login' onChange={(e) => setPassword(e.target.value)}/>
          <div className='div-buttons-login'>
            <Button id='btn-login' className='button' name='Entrar' handleClick={(e) => login(e, email, password)}/>
            <span>Ainda não é registrado?</span>
            <Button id='btn-register' className='button' name='Registrar-se' handleClick={(e) => changeShow(e, register)}/>
          </div>
        </form>
      </div>
      <Modal show={register}>
        <Register closeModal={closeModal}/>
      </Modal>
    </section>
  )
}
