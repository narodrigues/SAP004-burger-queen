import './login.css';
import Button from '../../components/button/Button';
import firebase from '../../configure-firebase';
import Header from '../../components/header/Header';
import Input from '../../components/input/Input';
import Modal from '../../components/modal/Modal';
import React, { useState } from "react";
import Register from '../register/Register';

export default function Login() {
  const [modalVisibility, setModalVisibility] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showErrorEmailInvalid, setErrorEmailInvalid] = useState(false);
  const [showErrorPassword, setErrorPassword] = useState(false);

  const changeVisibility = (e, show) => {
    e.preventDefault();
    setModalVisibility(!show);
  }

  const validForm = () => {
    setErrorEmailInvalid(false);
    setErrorPassword(false);

    let isValid = true;
    
    if (!(/\S+@\S+\.\S+/.test(email))) {
      setErrorEmailInvalid(true);
      isValid = false;
    }
    if (!password) {
      setErrorPassword(true);
      isValid = false;
    }
    return isValid;
  }

  const login = (e, email, password) => {
    e.preventDefault();

    const isValid = validForm();
    if (isValid) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(error => console.log(error));
    }
  }

  return (
    <section className='flex-row-desk'>
      <Header className='login'/>
      <div>
        <form className='form-login'>
          <Input type='email' placeholder='email@exemple.com' id='emal-login' onChange={e => setEmail(e.target.value)} />
          {showErrorEmailInvalid && <p className='error-msg'>Este e-mail parece não estar cadastrado. Tente novamente ou cadastre-se.</p>}
          <Input type='password' placeholder='senha' id='password-login' onChange={e => setPassword(e.target.value)} />
          {showErrorPassword && <p className='error-msg'>Sua senha deve ter mais de 6 dígitos.</p>}
          <div className='div-buttons-login'>
        
            <Button id='btn-login' className='button' name='Entrar' handleClick={e => login(e, email, password)} />
            <span>Ainda não é registrado? <button className='register-link' onClick={e => changeVisibility(e, modalVisibility)}>Registre-se</button></span>
          </div>
        </form>
      </div>
      <Modal visibility={modalVisibility} closeModal={e => changeVisibility(e, modalVisibility)}>
        <Register />
      </Modal>
    </section>
  );
}
