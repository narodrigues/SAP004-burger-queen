import React, { Component } from "react";
import './register.css';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';

export default class Register extends Component {

  state = {
    username: '',
    email: '',
    password: '',
    position: '',
  };

  handleChange = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }

  confirmar = (e) => {
    e.preventDefault();
    console.log(this.state)
  };

  render() {
    return (
      <form className='form-register modal-main overlay'>
        <div className='inputs-text'>
          <Input type='text' name='username' placeholder='nome' id='name-login' onChange={this.handleChange} />
          <Input type='email' name='email' placeholder='email@exemple.com' id='email-register' onChange={this.handleChange} />
          <Input type='password' name='password' placeholder='senha' id='password-register' onChange={this.handleChange} />
        </div>
        <div className='select-role'>
          <label htmlFor='kitchen'>COZINHA</label>
          <Input type='radio' onChange={this.handleChange}  className='radio-button' name='position' id='kitchen' />
          <label htmlFor='hall'>SALÃO</label>
          <Input type='radio' onChange={this.handleChange}  className='radio-button' name='position' id='hall' />
        </div>
        <div className='btn-confirms'>
          <Button id='btn-cancel' className='button' name='Cancelar' />
          <Button id='btn-confirm' className='button' name='Confirmar' handleClick={this.confirmar}/>
        </div>
      </form>

    )
  }
}