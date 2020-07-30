import React from "react";
import './kitchen.css';
import Button from '../../components/button/Button'
import firebase from '../../configure-firebase'
import Header from '../../components/header/Header'
import Cork from '../../components/cork/Cork'

export default function Kitchen() {
  const logout = () => {
    firebase
      .auth()
      .signOut()
  }

  return (
    <>
      <section className='kitchen'>
        <Header className='header-hall' />
        <div className='exit-btn'>
          <Button name='Sair' handleClick={(e) => logout(e)} />
        </div>
      </section>
      <Cork />
    </>
  )
}