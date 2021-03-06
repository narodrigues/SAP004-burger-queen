/* eslint-disable react-hooks/exhaustive-deps */
import './menu.css';
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import BurgerOptions from '../burgerOptions/BurgerOptions';
import Burgers from '../../assets/burgers.png';
import Button from '../../components/button/Button';
import Drinks from '../../assets/bebidas.png';
import firebase from '../../configure-firebase';
import Grilled from '../../assets/sanduiche.png';
import Img from '../../components/imagem/Img';
import Orders from '../../assets/pedidos.png';
import React, { useState, useEffect } from 'react';
import Starters from '../../assets/acomp.png';
import Modal from '../../components/modal/Modal';

const Menu = () => {
  const [menuAllDay, setMenuAllDay] = useState();
  const [menuBreakfast, setMenuBreakfast] = useState();
  const [modalVisibility, setModalVisibility] = useState(false);
  const [currentMenu, setCurrentMenu] = useState();
  const [orders, setOrders] = useState([]);
  const [burger, setBurger] = useState();
  const [btnColor, setBtnColor] = useState(false);
  const [btnColor2, setBtnColor2] = useState(true);
  const totalPrice = orders.reduce((total, acc) => total + (Number(acc.price) * acc.count), 0);
  let history = useHistory();

  useEffect(() => {
    menu('allDay');
  }, []);

  const menu = chosenMenu => {
    setBtnColor(!btnColor);
    setBtnColor2(!btnColor2);
    setCurrentMenu(chosenMenu);

    const getItensFromDatabase = (collectionDB, state) => {
      firebase
        .firestore()
        .collection(collectionDB)
        .onSnapshot(querySnapshot => {
          querySnapshot.forEach(state);
        })
    }

    chosenMenu === 'breakfast' ?
      getItensFromDatabase('breakfast', doc => setMenuBreakfast(doc.data()))
      : getItensFromDatabase('allday', doc => setMenuAllDay(doc.data()))

  }


  const getBurger = item => {
    setBurger(item);
    setModalVisibility(true);
  }

  const getAdditional = orderBurger => {
    const extras = [];
    let priceToNumber = Number(orderBurger.price);
    let finalName = orderBurger.name;
    let finalOrder = orderBurger;

    orderBurger.cheese && extras.push('queijo');
    orderBurger.egg && extras.push('ovo');

    priceToNumber += extras.length;

    if (extras.length > 0) finalName += ` com ${extras.join(' e ')}`;

    finalOrder = {
      name: finalName,
      price: priceToNumber,
      count: orderBurger.count,
    }

    countQuantity(finalOrder);
    setModalVisibility(false);
  }

  const getRequests = item => {
    setOrders([...orders, item]);
    countQuantity(item);
  }

  const countQuantity = item => {
    if (!orders.includes(item)) {
      item.count = 1;
      setOrders([...orders, item]);
    } else {
      item.count++;
      setOrders([...orders]);
    }
  }

  const reduceItem = item => {
    orders.includes(item) &&
      item.count--;
    item.count <= 0 &&
      orders.splice(orders.indexOf(item), 1);
    setOrders([...orders]);
  }

  const ordersToCollection = () => {
    let requests = {
      order: orders.map(e => {
        return {
          name: e.name,
          count: e.count,
        }
      })
    }
    localStorage.setItem('id', new Date().getTime());

    if (requests.order.length > 0) {
      firebase
        .firestore()
        .collection('orders')
        .doc(`${new Date().getTime()}`)
        .set(requests)

      return history.push('/table');
    }
  }

  const printMenu = (item, func) => {
    return (
      <div className='divs-option-menu' key={item.name} onClick={() => func(item)}>
        <div className='only-option-menu' >
          <Img src={item.img} alt={item.alt} />
          <p>{item.name}</p>
          <p>{brazilianCurrency(item.price)}</p>
        </div>
      </div>
    )
  }

  const brazilianCurrency = item => Number(item).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <section className='menu'>
      <div className='div-menu'>
        <div className='buttons-options-menu'>
          <Button name='Matinal' value='breakfast' className={btnColor2 ? 'button-true option-menu-food' : 'button-false option-menu-food'} handleClick={e => menu(e.target.value)} />
          <Button name='Almoço/Janta' value='allDay' className={btnColor ? 'button-true option-menu-food' : 'button-false option-menu-food'} handleClick={e => menu(e.target.value)} />
        </div>
        <div className='menu-principal bg-color'>
          <div className='bg-color'>
            {currentMenu === 'allDay' &&
              <div className='border-menu'>
                <div className='titles-container'>
                  <Img src={Burgers} alt='Hambúrgueres' />
                </div>
                {menuAllDay && menuAllDay.burger.map(item => printMenu(item, getBurger))}
                <div className='titles-container'>
                  <Img src={Starters} alt='Acompanhamentos' />
                </div>
                {menuAllDay && menuAllDay.startes.map(item => printMenu(item, getRequests))}
                <div className='titles-container'>
                  <Img src={Drinks} alt='Bebidas' />
                </div>
                {menuAllDay && menuAllDay.drinks.map(item => printMenu(item, getRequests))}
              </div>
            }
            {currentMenu === 'breakfast' &&
              <div className='border-menu'>
                <div className='titles-container'>
                  <Img src={Grilled} alt='Sanduíches' />
                </div>
                {menuBreakfast && menuBreakfast.grilled.map(item => printMenu(item, getRequests))}
                <div className='titles-container'>
                  <Img src={Drinks} alt='Bebidas' />
                </div>
                {menuBreakfast && menuBreakfast.drinks.map(item => printMenu(item, getRequests))}
              </div>
            }
          </div>
        </div>
      </div>
      <div className='requests bg-color'>
        <div className='requests-quantity'>
          <Img src={Orders} alt='Pedidos' />
          <div className='orders'>
            {orders.map((item, index) => (
              <div className='request-plus-minus' key={item.name}>
                <p key={index}>{item.name}</p>
                <div className='div-btn-icons'>
                  <button className='icon-btn'><FaMinusCircle className='icon' onClick={() => reduceItem(item)} /></button>
                  <span>{item.count}</span>
                  <button className='icon-btn' onClick={() => getRequests(item)}><FaPlusCircle className='icon' /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='total'>
          <span>Total: {brazilianCurrency(totalPrice)}</span>
        </div>
        <Button className='confirm-order' handleClick={ordersToCollection} name='PEDIR' />
      </div>
      <Modal visibility={modalVisibility} closeModal={() => setModalVisibility(false)}>
        <BurgerOptions currentBurger={burger} updateBurger={getAdditional} />
      </Modal>
    </section >
  );
};

export default Menu;