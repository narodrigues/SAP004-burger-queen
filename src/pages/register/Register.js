import React, { useState } from "react";
import './register.css';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import firebase from '../../configure-firebase';

export default function Register(props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [showErroNameEmpty, setErrorNameEmpty] = useState(false);
  const [showErroEmailInvalid, setErrorEmailInvalid] = useState(false);
  const [showErroPassword, setErrorPassword] = useState(false);
  const [showErroEmptyRadios, setErrorEmptyRadios] = useState(false);

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
      setErrorEmptyRadios("escolha uma das opções");
      isValid = false;
    }
    if (!email) {
      setErrorEmailInvalid("email obrigatório");
      isValid = false;
    }
    if (!(/\S+@\S+\.\S+/.test(email))) {
      setErrorEmailInvalid('Formato de e-mail inválido');
    }
    return isValid;
  }

  const creatUser = (e, username, email, password, jobTitle) => {
    e.preventDefault()

    const isValid = validForm();

    if (isValid) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          firebase
            .firestore()
            .collection('users').add({
              username,
              email,
              jobTitle,
              userUid: firebase.auth().currentUser.uid,
            });
        }).catch((err) => {
          console.log(err)
        })
    };
  }

  return (
    <div className='form-register'>
      <form className=' modal-main overlay'>
        <div className='inputs-text'>
          <Input type='text' name='username' placeholder='nome' id='name-login' onChange={(e) => setUsername(e.target.value)} />
          {showErroNameEmpty && (
            <p>Por favor, preencha seu nome.</p>
          )}
          <Input type='email' required name='email' placeholder='email@exemple.com' id='email-register' onChange={(e) => setEmail(e.target.value)} />
          {showErroEmailInvalid && (
            <p>{showErroEmailInvalid}</p>
          )}
          <Input type='password' name='password' placeholder='senha' id='password-register' onChange={(e) => setPassword(e.target.value)} />
          {showErroPassword && (
            <p>Sua senha deve ter mais de 6 dígitos.</p>
          )}
        </div>
        <div className='select-role'>
          <label htmlFor='kitchen'>COZINHA</label>
          <Input type='radio' className='radio-button' name='jobTitle' id='kitchen' value='Kitchen' onChange={(e) => setJobTitle(e.target.value)} />
          <label htmlFor='hall'>SALÃO</label>
          <Input type='radio' className='radio-button' name='jobTitle' id='hall' value='Hall' onChange={(e) => setJobTitle(e.target.value)} />
          {showErroEmptyRadios && (
            <p>{showErroEmptyRadios}</p>
          )}
        </div>
      </form>
      <div className='btn-confirms'>
        <Button id='btn-cancel' name='Cancelar' handleClick={props.closeModalConfirm} />
        <Button id='btn-confirm' className='button' name='Confirmar' handleClick={creatUser} />
      </div>
    </div>
  );
}