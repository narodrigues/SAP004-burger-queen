import React from "react";
import './hall.css';
import Button from '../../components/button/Button'
import Header from '../../components/header/Header'
import Menu from '../../components/menu/Menu'
import firebase from '../../configure-firebase'


export default function Hall() {
  const logout = () => {
    firebase
      .auth()
      .signOut()
  }

  return (
    <>
      <section className='hall'>
        <Header className='header-hall' />
        <div className='buttons-option'>
          <Button name='Pedidos Prontos' />
          <Button name='Sair' handleClick={(e) => logout(e)} />
        </div>
      </section>
      <Menu />
    </>
  )
}