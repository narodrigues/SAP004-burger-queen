import React, { useState } from "react";
import './register.css';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import firebase from '../../configure-firebase';

export default function Register() {
  const [username, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [jobTitle, setJobTitle] = useState('');

  const creatUser = (e, username, email, password, jobTitle) => {
    e.preventDefault();

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
      })
  }

  return (
    <form className='form-register modal-main overlay'>
      <div className='inputs-text'>
        <Input type='text' name='username' placeholder='nome' id='name-login' onChange={(e) => setUser(e.target.value)} />
        <Input type='email' name='email' placeholder='email@exemple.com' id='email-register' onChange={(e) => setEmail(e.target.value)} />
        <Input type='password' name='password' placeholder='senha' id='password-register' onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className='select-role' onChange={(e) => setJobTitle(e.target.value)}>
        <label htmlFor='kitchen'>COZINHA</label>
        <Input type='radio' className='radio-button' name='jobTitle' id='kitchen' value='Kitchen' />
        <label htmlFor='hall'>SALÃO</label>
        <Input type='radio' className='radio-button' name='jobTitle' id='hall' value='Hall' />
      </div>
      <div className='btn-confirms'>
        <Button id='btn-cancel' className='button' name='Cancelar' />
        <Button id='btn-confirm' className='button' name='Confirmar' handleClick={(e) => creatUser(e, username, email, password, jobTitle)} />
      </div>
    </form>
  );
}