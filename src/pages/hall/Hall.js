import React from "react";
import './hall.css';
import Button from '../../components/button/Button'
import firebase from '../../configure-firebase'


export default function Hall() {
  const logout = () => {
    firebase
      .auth()
      .signOut()
  }

  return (
    <>
      <h1>Salão</h1>
      <Button name='Sair'handleClick={(e) => logout(e)}/>
    </>
  )
}