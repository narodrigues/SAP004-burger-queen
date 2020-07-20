import React, { Component } from "react";
import './register.css';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import firebase from '../../configure-firebase';

export default class Register extends Component {
  creatUser = (e) => {
    e.preventDefault();
    const username = this.state.username;
    const email = this.state.email;
    const password = this.state.password;
    const jobTitle = this.state.jobTitle;

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

  creatUser = (e) => {
    e.preventDefault();
    const username = this.state.username;
    const email = this.state.email;
    const password = this.state.password;
    const jobTitle = this.state.jobTitle;

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

  state = {
    username: '',
    email: '',
    password: '',
    jobTitle: '',
  };

  handleChange = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  }

  sendForm = (e) => {
    console.log(this.state)
    e.preventDefault();
  };

  render() {
    return (
      <form className='form-register modal-main overlay'>
        <div className='inputs-text'>
          <Input type='text' name='username' placeholder='nome' id='name-login' onChange={this.handleChange} />
          <Input type='email' name='email' placeholder='email@exemple.com' id='email-register' onChange={this.handleChange} />
          <Input type='password' name='password' placeholder='senha' id='password-register' onChange={this.handleChange} />
        </div>
        <div className='select-role' onChange={this.handleChange}>
          <label htmlFor='kitchen'>COZINHA</label>
          <Input type='radio' className='radio-button' name='jobTitle' id='kitchen' value='kitchen' />
          <label htmlFor='hall'>SALÃO</label>
          <Input type='radio' className='radio-button' name='jobTitle' id='hall' value='hall' />
        </div>
        <div className='btn-confirms'>
          <Button id='btn-cancel' className='button' name='Cancelar' />
          <Button id='btn-confirm' className='button' name='Confirmar' handleClick={this.creatUser} />
        </div>
      </form>

    )
  }
}