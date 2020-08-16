/* eslint-disable react-hooks/exhaustive-deps */
import './kitchen.css';
import { FaUserAlt } from 'react-icons/fa';
import Button from '../../components/button/Button';
import Cork from '../../components/cork/Cork';
import firebase from '../../configure-firebase';
import Hat from '../../assets/Mad-Hatter-Silhouette-1.png';
import Header from '../../components/header/Header';
import Img from '../../components/imagem/Img';
import React, { useState, useEffect } from 'react';
import Search from '../../components/search/Search';

export default function Kitchen() {
  const [pendingOrder, setPendingOrder] = useState([]);
  const [readyOrder, setReadyOrder] = useState([]);
  const [searchResultsPending, setSearchResultsPending] = useState([]);
  const [searchResultsReady, setSearchResultsReady] = useState([]);

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
        setSearchResultsPending(getData.filter(doc => doc.status === 'Pendente'));
        setSearchResultsReady(getData.filter(doc => doc.status === 'Pronto'));
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

  const printInfos = item => {
    return (
      <>
      <p className='table-number'>Mesa: {item.table}</p>
      <p><FaUserAlt /> {item.client}</p>
      <p className={`general-status ${item.status.toLowerCase()}`}>{item.status}</p>
        {item.order.map(pedido =>
          <p className='p-orders'>•{pedido.count}x {pedido.name}</p>
        )}
      </>
    )
  }

  return (
    <>
      <Header className='header'/>
      <div className='back-to-hat buttons-option'>
        <Img src={Hat} alt='chapéu' />
        <Button name='Sair' handleClick={logout} />
      </div>

      <Search order1={pendingOrder} order2={readyOrder} onChange1={setSearchResultsPending} onChange2={setSearchResultsReady}/>

      <Cork name='PREPARANDO'
        children={ 
          searchResultsPending.map(item => (
            <div className='divs-orders' key={item.id}>
              {printInfos(item)}
              <div>
                <Button name='PRONTO' handleClick={() => changeStatus(item)} />
              </div>
            </div>
          ))
        }

        secondChildren={
          searchResultsReady.map(item => (
            <div className='divs-orders' key={item.id}>
              {printInfos(item)}
            </div>
          ))
        }
      />
    </>
  );
}