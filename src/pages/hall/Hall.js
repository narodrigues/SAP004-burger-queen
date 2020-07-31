import React from "react";
import { Link } from 'react-router-dom';
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
          <Button>
            <Link to="/Requests" className='btn-order'>Pedidos prontos</Link>
          </Button>
          <Button name='Sair' handleClick={(e) => logout(e)} />
        </div>
      </section>
      <Menu />
    </>
  )
}