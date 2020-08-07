import React, { useState, useEffect } from 'react';
import './kitchen.css';
import Button from '../../components/button/Button';
import firebase from '../../configure-firebase';
import Header from '../../components/header/Header';
import Cork from '../../components/cork/Cork';

export default function Kitchen() {
  const [pendingOrder, setPendingOrder] = useState([]);
  const [readyOrder, setReadyOrder] = useState([]);

  const logout = () => {
    firebase
      .auth()
      .signOut();
  }

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
        setPendingOrder(getData.filter(doc => doc.status === 'Pendente'));
        setReadyOrder(getData.filter(doc => doc.status === 'Pronto'));
      });
  }, []);

  const changeStatus = item => {
    firebase
      .firestore()
      .collection('orders')
      .doc(item.id)
      .update({
        status: "Pronto",
      });

    const filter = pendingOrder.filter(orders => orders !== item);
    setReadyOrder([...readyOrder, item]);
    setPendingOrder([...filter]);
  }

  return (
    <>
      <section className='kitchen'>
        <Header className='header-hall' />
        <div className='exit-btn'>
          <Button name='Sair' handleClick={e => logout(e)} />
        </div>
      </section>

      <Cork name='PREPARANDO'
        children={pendingOrder &&
          pendingOrder.map(item => (
            <div className='divs-orders' key={item.id}>
              <p><span className='bolder'>Cliente:</span> {item.client}</p>
              <p><span className='bolder'>Mesa:</span> {item.table}</p>
              <p className='general-status status-pending'>{item.status}</p>
              {item.order.map(pedido =>
                <p className='p-orders'>• {pedido.name}</p>
              )}
              <div>
                <Button name='PRONTO' handleClick={() => changeStatus(item)} />
              </div>
            </div>
          ))
        }

        secondChildren={readyOrder &&
          readyOrder.map(item => (
            <div className='divs-orders' key={item.id}>
              <p><span className='bolder'>Mesa:</span> {item.table}</p>
              <p><span className='bolder'>Cliente:</span> {item.client}</p>
              <p className='general-status status-ready'>{item.status}</p>
              {item.order.map(pedido =>
                <p className='p-orders'>•{pedido.count}x {pedido.name}</p>
              )}
            </div>
          ))
        }
      />
    </>
  );
}