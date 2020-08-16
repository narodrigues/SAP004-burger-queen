import './requests.css';
import { Link } from 'react-router-dom';
import { FaUserAlt, FaStopwatch } from 'react-icons/fa';
import Button from '../../components/button/Button'
import Cork from '../../components/cork/Cork';
import firebase from '../../configure-firebase';
import Hat from '../../assets/Mad-Hatter-Silhouette-1.png'
import Header from '../../components/header/Header';
import Img from '../../components/imagem/Img'
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import Search from '../../components/search/Search';

export default function Requests() {
  const [readyOrder, setReadyOrder] = useState([]);
  const [completedOrder, setCompletedOrder] = useState([]);
  const [searchResultsReady, setSearchResultsReady] = useState([]);
  const [searchResultsCompleted, setSearchResultsCompleted] = useState([]);

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
        setSearchResultsReady(getData.filter(doc => doc.status === 'Pronto'));
        setSearchResultsCompleted(getData.filter(doc => doc.status === 'Entregue'));
      });
  }, [])

  const changeStatus = item => {
    firebase
      .firestore()
      .collection('orders')
      .doc(item.id)
      .update({
        status: 'Entregue',
        finalTime: new Date().toLocaleString("en-ZA"),
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

  const printOrders = item => {
    return (
      <>
        <p className='table-number'>Mesa: {item.table}</p>
        <p><FaUserAlt /> {item.client}</p>
        <p className={`general-status ${item.status.toLowerCase()}`}>{item.status}</p>
        {item.order.map(pedido =>
          <p className='p-orders'>•{pedido.count} x {pedido.name}</p>
        )}
      </>
    )
  }

  return (
    <>
      <Header className='header' />
      <div className='back-to-hat buttons-option'>
        <Img src={Hat} alt='chapéu' />
        <Button>
          <Link to='/hall'>❮ voltar</Link>
        </Button>
      </div>

      <Search order1={readyOrder} order2={completedOrder} onChange1={setSearchResultsReady} onChange2={setSearchResultsCompleted}/>

      <Cork name='PRONTOS' secondName='ENTREGUES'
        children={
          searchResultsReady.map(item => (
            <div className='divs-orders' key={item.id}>
              {printOrders(item)}
              <div>
                <Button name='ENTREGUE' handleClick={() => changeStatus(item)} />
              </div>
            </div>
          ))
        }

        secondChildren={
          searchResultsCompleted.map(item => (
            <div className='divs-orders' key={item.id}>
              {printOrders(item)}
              <p className='time'><FaStopwatch /> {Math.floor(moment.duration(moment(item.finalTime).diff(item.initialTime)).asMinutes())} min</p>
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