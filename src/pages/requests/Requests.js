import React, { useState, useEffect } from 'react';
import Header from '../../components/header/Header';
import Cork from '../../components/cork/Cork';
import Button from '../../components/button/Button'
import firebase from '../../configure-firebase';
import './requests.css'

export default function Requests() {
  const [readyOrder, setReadyOrder] = useState([]);
  const [completedOrder, setCompletedOrder] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection('orders')
      .onSnapshot(querySnapshot => {
        const getData = querySnapshot.docs.map(doc =>
          ({
            ...doc.data()
          })
        );
        setReadyOrder(getData.filter(doc => doc.status === 'Pronto'));
        setCompletedOrder(getData.filter(doc => doc.status === 'Entregue'));
      });
  }, [])

  const changeStatus = (item) => {
    firebase
      .firestore()
      .collection('orders')
      .doc(item.id)
      .update({
        status: "Entregue",
      });

    const filter = readyOrder.filter(orders => orders !== item);
    setCompletedOrder([...completedOrder, item]);
    setReadyOrder([...filter]);
  }

  return (
    <>
      <section className='page-requests'>
        <Header />
      </section>

      <Cork name='ENTREGUES'
        children={readyOrder &&
          readyOrder.map(item => (
            <div className='divs-orders' key={item.id}>
              <p>Cliente: {item.client}</p>
              <p>Mesa: {item.table}</p>
              <p className='status-ready'>{item.status}</p>
              {item.order.map(pedido =>
                <p className='p-orders'>• {pedido.name}</p>
              )}
              <div>
                <Button name='ENTREGUE' handleClick={() => changeStatus(item)} />
              </div>
            </div>
          ))
        }

        secondChildren={completedOrder &&
          completedOrder.map(item => (
            <div className='divs-orders' key={item.id}>
              <p>Mesa: {item.table}</p>
              <p>Cliente: {item.client}</p>
              <p className='status-completed'>{item.status}</p>
              {item.order.map(pedido =>
                <p className='p-orders'>•{pedido.count} x {pedido.name}</p>
              )}
            </div>
          ))
        }
      />
    </>
  )
}  