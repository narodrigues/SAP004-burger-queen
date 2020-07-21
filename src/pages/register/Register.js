import React, { useState } from "react";
import './register.css';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import firebase from '../../configure-firebase';

export default function Register() {
  //ter um tipo de useState para cada tipo de informação que iremos armazenar
  //assim ao salvar as informações, salvaremos uma por fez, ficando mais fácil de entender
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [jobTitle, setJoTitle] = useState('');
  let [showErroNameEmpty, setErrorNameEmpty] = useState(false);
  let [showErroEmailInvalid, setErrorEmailInvalid] = useState(false);
  let [showErroEmptyFields, setErrorEmptyFields] = useState(false);
  let [showErroPassword, setErrorPassword] = useState(false);

  //quando der tudo certo vai guardar as informações do usuário lá no firebase, e quando não ser, vai pegar aquele errinhoq ue ao próprio firebase retorna e verificar
  //se o erro for igual a o erro do firebase vai chamar a função de erro caso o email seja inválido e mostrar a mensagem personalizada que está abaixo de cada input
  const creatUser = (e) => {
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
      }).catch((err) => {
        if (email === '' || username === '' || jobTitle === '' || password === '') {
          setErrorEmptyFields(!showErroEmptyFields)
        } else if (username === '') {
          setErrorNameEmpty(!showErroNameEmpty)
        } else if (err.code === 'auth/invalid-email') {
          setErrorEmailInvalid(!showErroEmailInvalid)
        } else if (err.code === 'auth/weak-password') {
          setErrorPassword(!showErroPassword)
        }
      })
  }

  return (
    <form className='form-register modal-main overlay'>
      <div className='inputs-text'>
        <Input type='text' name='username' placeholder='nome' id='name-login' onChange={(e) => setUsername(e.target.value)} />
        {showErroNameEmpty && (
          <p>Por favor, preencha seu nome</p>
        )}
        <Input type='email' name='email' placeholder='email@exemple.com' id='email-register' onChange={(e) => setEmail(e.target.value)} />
        {showErroEmailInvalid && (
          <p>E-mail inválido.</p>
        )}
        <Input type='password' name='password' placeholder='senha' id='password-register' onChange={(e) => setPassword(e.target.value)} />
        {showErroPassword && (
          <p>Sua senha deve ter mais de 6 dígitos.</p>
        )}
      </div>
      <div className='select-role'>
        <label htmlFor='kitchen'>COZINHA</label>
        <Input type='radio' className='radio-button' name='jobTitle' id='kitchen' value='kitchen' onChange={(e) => setJoTitle(e.target.value)} />
        <label htmlFor='hall'>SALÃO</label>
        <Input type='radio' className='radio-button' name='jobTitle' id='hall' value='hall' onChange={(e) => setJoTitle(e.target.value)} />
      </div>
      <div className='btn-confirms'>
        <Button id='btn-cancel' className='button' name='Cancelar' />
        <Button id='btn-confirm' className='button' name='Confirmar' handleClick={creatUser} />
      </div>
      {showErroEmptyFields && (
        <p>Todos os campos devem ser preenchidos</p>
      )}
    </form>
  )
}