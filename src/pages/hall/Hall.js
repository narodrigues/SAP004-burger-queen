import './hall.css';
import { Link } from 'react-router-dom';
import Button from '../../components/button/Button';
import firebase from '../../configure-firebase';
import Header from '../../components/header/Header';
import Menu from '../../components/menu/Menu';
import React from "react";

export default function Hall() {
  const logout = () => {
    firebase
      .auth()
      .signOut();
  }

  return (
    <>
      <section className='hall'>
        <Header className='header-hall' />
        <div className='buttons-option'>
          <Button>
            <Link to="/requests" className='btn-order'>Pedidos prontos</Link>
          </Button>
          <Button name='Sair' handleClick={logout} />
        </div>
      </section>
      <Menu />
    </>
  );
}