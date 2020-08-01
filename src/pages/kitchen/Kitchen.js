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

  const getOrders = () => {
    firebase
    .firestore()
    .collection('orders')
    .where('status', '==', 'Pendente')
    .get()
    // .then(a => a.docs.map(b => console.log(...b.data())))
    .then(querySnapshot => {
      querySnapshot.forEach(doc => console.log(doc.data()));
    });
  }
  getOrders()

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