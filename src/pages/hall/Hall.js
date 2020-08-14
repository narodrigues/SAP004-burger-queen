import { Link } from 'react-router-dom';
import Button from '../../components/button/Button';
import firebase from '../../configure-firebase';
import Hat from '../../assets/Mad-Hatter-Silhouette-1.png'
import Header from '../../components/header/Header';
import Img from '../../components/imagem/Img'
import Menu from '../menu/Menu';
import React from "react";

export default function Hall() {
  const logout = () => {
    firebase
      .auth()
      .signOut();
  }

  return (
    <>
      <Header className='header' />
      <div className='back-to-hat buttons-option'>
        <Img src={Hat} alt='chapéu' />
        <Button>
          <Link to='/requests'>Pedidos prontos</Link>
        </Button>
        <Button name='Sair' handleClick={logout} />
      </div>
      <Menu />
    </>
  );
}