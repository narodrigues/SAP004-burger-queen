import React, { useState, useEffect } from 'react';
import './kitchen.css';
import Button from '../../components/button/Button'
import firebase from '../../configure-firebase'
import Header from '../../components/header/Header'
import Cork from '../../components/cork/Cork'
// import moment from 'moment';
// import 'moment/locale/pt-br';

export default function Kitchen() {
  const [pendingOrder, setPendingOrder] = useState([]);
  // const [readyOrder, setReadyOrder] = useState([]);

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
      .then(querySnapshot => {
        const getData = querySnapshot.docs.map(doc =>
          ({
            ...doc.data()
          })
        );
        setPendingOrder(getData)
      });
  }, [])

  const changeStatus = (id) => {
    firebase
      .firestore()
      .collection('orders')
      .doc(id)
      .update({
        status: "Pronto",
      });
  }

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
              <p>Cliente: {item.client}</p>
              <p>Mesa: {item.table}</p>
              <p className='status-pending'>{item.status}</p>
              {item.order.map(pedido =>
                <p className='p-orders'>• {pedido.name}</p>
              )}
              <div>
                <Button name='PRONTO' handleClick={changeStatus(item.id)} />
              </div>
            </div>
          ))
        }
      </Cork>
    </>
  )
}