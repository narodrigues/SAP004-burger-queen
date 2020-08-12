import './register.css';
import Button from '../../components/button/Button';
import firebase from '../../configure-firebase';
import Input from '../../components/input/Input';
import React, { useState } from "react";

export default function Register() {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [jobTitle, setJobTitle] = useState();
  const [showErrorNameEmpty, setErrorNameEmpty] = useState();
  const [showErrorEmailInvalid, setErrorEmailInvalid] = useState();
  const [showErrorPassword, setErrorPassword] = useState();
  const [showErrorEmptyRadios, setErrorEmptyRadios] = useState();

  function validForm() {
    setErrorNameEmpty(false);
    setErrorPassword(false);
    setErrorEmailInvalid(false);
    setErrorEmptyRadios(false);

    let isValid = true;
    
    if (!username) {
      setErrorNameEmpty(true);
      isValid = false;
    }
    if (!password) {
      setErrorPassword(true);
      isValid = false;
    }
    if (!jobTitle) {
      setErrorEmptyRadios(true);
      isValid = false;
    }
    if (!email) {
      setErrorEmailInvalid("email obrigatório");
      isValid = false;
    }
    if (!(/\S+@\S+\.\S+/.test(email))) {
      setErrorEmailInvalid('Formato de e-mail inválido');
      isValid = false;
    }

    return isValid;
  }

  const creatUser = e => {
    e.preventDefault();

    const isValid = validForm();

    isValid &&
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          firebase
            .firestore()
            .collection('users')
            .add({
              username,
              email,
              jobTitle,
              userUid: firebase.auth().currentUser.uid,
            });
        })
        .catch(err => {
          console.log(err);
        });
  }

  return (
    <div className='form-register'>
      <form className=' modal-main overlay'>
        <div className='inputs-text'>
          <Input type='text' name='username' placeholder='nome' id='name-login' onChange={e => setUsername(e.target.value)} />
          {showErrorNameEmpty && <p>Por favor, preencha seu nome.</p>}
          <Input type='email' required name='email' placeholder='email@exemple.com' id='email-register' onChange={e => setEmail(e.target.value)} />
          {showErrorEmailInvalid && <p>{showErrorEmailInvalid}</p>}
          <Input type='password' name='password' placeholder='senha' id='password-register' onChange={e => setPassword(e.target.value)} />
          {showErrorPassword && <p>Sua senha deve ter mais de 6 dígitos.</p>}
        </div>
        <div className='select-role'>
          <label htmlFor='kitchen'>COZINHA</label>
          <Input type='radio' className='radio-button' name='jobTitle' id='kitchen' value='Kitchen' onChange={e => setJobTitle(e.target.value)} />
          <label htmlFor='hall'>SALÃO</label>
          <Input type='radio' className='radio-button' name='jobTitle' id='hall' value='Hall' onChange={e => setJobTitle(e.target.value)} />
          {showErrorEmptyRadios && <p>Escolha uma das opções</p>}
        </div>
      </form>
      <div className='btn-confirms'>
        <Button id='btn-confirm' className='button' name='Confirmar' handleClick={creatUser} />
      </div>
    </div>
  );
}