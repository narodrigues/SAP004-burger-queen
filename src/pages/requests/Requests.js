import React, { useState, useEffect } from 'react';
import Header from '../../components/header/Header';
import Cork from '../../components/cork/Cork';
import Button from '../../components/button/Button'
import Img from '../../components/imagem/Img'
import Hat from '../../assets/Mad-Hatter-Silhouette-1.png'
import firebase from '../../configure-firebase';
import { Link } from 'react-router-dom';
import './requests.css';
import moment from 'moment';

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

  const changeStatus = item => {
    firebase
      .firestore()
      .collection('orders')
      .doc(item.id)
      .update({
        status: "Entregue",
        finalTime: new Date().toLocaleString(),
      });

    const filter = readyOrder.filter(orders => orders !== item);
    setCompletedOrder([...completedOrder, item]);
    setReadyOrder([...filter]);
  }

  const deleteOrder = id => {
    firebase
      .firestore()
      .collection('orders')
      .doc(id)
      .delete();
  }

  return (
    <>
      <section className='page-requests'>
        <Header />
        <div className='back-to-hat'>
          <Img src={Hat} alt='chapéu' />
          <Button>
            <Link to="/hall" className='btn-order'>voltar ❯</Link>
          </Button>
        </div>
      </section>

      <Cork name='PRONTOS' secondName='ENTREGUES'
        children={readyOrder &&
          readyOrder.map(item => (
            <div className='divs-orders' key={item.id}>
              <p><span className='bolder'>Cliente:</span> {item.client}</p>
              <p><span className='bolder'>Mesa:</span> {item.table}</p>
              <p className='general-status pronto'>{item.status}</p>
              {item.order.map(pedido =>
                <p className='p-orders'>•{pedido.count}x {pedido.name}</p>
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
              <p><span className='bolder'>Cliente:</span> {item.client}</p>
              <p><span className='bolder'>Mesa:</span> {item.table}</p>
              <p><span className='bolder'>Tempo de preparo:</span> {Math.floor(moment.duration(moment(item.finalTime).diff(item.initialTime)).asMinutes())} minuto(s) atrás</p>
              <p className='general-status status-completed'>{item.status}</p>
              {item.order.map(pedido =>
                <p className='p-orders'>•{pedido.count} x {pedido.name}</p>
              )}
              <div>
                <Button name='DELETAR' handleClick={() => deleteOrder(item.id)} />
              </div>
            </div>
          ))
        }
      />
    </>
  );
}  