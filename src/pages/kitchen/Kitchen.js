import React, { useState, useEffect } from 'react';
import './kitchen.css';
import Button from '../../components/button/Button'
import firebase from '../../configure-firebase'
import Header from '../../components/header/Header'
import Cork from '../../components/cork/Cork'

export default function Kitchen() {
  const [pendingOrder, setPendingOrder] = useState([]);
  setTimeout(() => console.log(pendingOrder), 2000)

  const logout = () => {
    firebase
      .auth()
      .signOut()
  }

  useEffect(() => {
    firebase
      .firestore()
      .collection('orders')
      .where('status', '==', 'Pendente')
      .get()
      // .then(a => a.docs.map(b => console.log(...b.data())))
      .then(querySnapshot => {
        const teste = querySnapshot.docs.map(doc =>
          ({
            ...doc.data()
          })
        );
        setPendingOrder(teste)
      });
  }, [])

  return (
    <>
      <section className='kitchen'>
        <Header className='header-hall' />
        <div className='exit-btn'>
          <Button name='Sair' handleClick={(e) => logout(e)} />
        </div>
      </section>

      <Cork>
        {pendingOrder &&
          pendingOrder.map(item => (
            <div className='divs-orders' key={item.id}>
              <p>{item.client}</p>
              <span>mesa {item.table}</span>
              {item.order.map(pedido =>
                <p className='p-orders'>• {pedido.name}</p>
              )}
              <div>
                <Button name='PRONTO' />
              </div>
            </div>
          ))
        }
      </Cork>
    </>
  )
}