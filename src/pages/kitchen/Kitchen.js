import React from "react";
import './kitchen.css';
import Button from '../../components/button/Button'
import firebase from '../../configure-firebase'

export default function Kitchen() {
  const logout = () => {
    firebase
      .auth()
      .signOut()
  }

  return (
    <>
      <h1>Cozinha</h1>
      <Button name='Sair' handleClick={(e) => logout(e)} />
    </>
  )
}