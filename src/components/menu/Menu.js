/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';
import Img from '../imagem/Img';
import Button from '../button/Button';
import BurgerOptions from '../modalHamburger/BurgerOptions';
import './menu.css';
import firebase from '../../configure-firebase';
import { useHistory } from 'react-router-dom';
import Burgers from '../../assets/burgers.png';
import Drinks from '../../assets/bebidas.png';
import Starters from '../../assets/acomp.png';
import Grilled from '../../assets/sanduiche.png';
import Orders from '../../assets/pedidos.png';

const Menu = () => {
  const [menuAllDay, setMenuAllDay] = useState(null);
  const [menuBreakfast, setMenuBreakfast] = useState(null);
  const [modalBoolean, setModalBoolean] = useState(false);
  const [currentMenu, setCurrentMenu] = useState(null);
  const [orders, setOrders] = useState([]);
  const [burger, setBurger] = useState(null);
  const [btnColor, setBtnColor] = useState(false);
  const [btnColor2, setBtnColor2] = useState(true);
  let history = useHistory();

  useEffect(() => {
    allDay();
  }, []);

  const breakfast = () => {
    setBtnColor(!btnColor);
    setBtnColor2(!btnColor2);
    setCurrentMenu('breakfast');
    firebase
      .firestore()
      .collection('breakfast')
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => { setMenuBreakfast(doc.data()) });
      });
  }

  const allDay = () => {
    setBtnColor(!btnColor);
    setBtnColor2(!btnColor2);
    setCurrentMenu('allDay');
    firebase
      .firestore()
      .collection('allday')
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => setMenuAllDay(doc.data()));
      });
  }

  const getBurger = item => {
    setBurger(item);
    setModalBoolean(true);
  }

  const getAdditional = orderBurger => {
    let priceToNumber = Number(orderBurger.price);
    let finalName = orderBurger.name;

    const extras = [];

    orderBurger.cheese && extras.push('queijo');
    orderBurger.egg && extras.push('ovo');

    priceToNumber += extras.length;
    finalName += extras.join(' e ');

    let finalOrder = orderBurger;
    finalOrder = {
      name: finalName,
      price: priceToNumber,
      count: orderBurger.count,
    }

    countQuantity(finalOrder);
    setModalBoolean(false);
  }

  const totalPrice = orders.reduce((total, acc) => total + (Number(acc.price) * acc.count), 0);

  const brazilianCurrency = item => Number(item).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

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
    if (orders.includes(item)) {
      item.count--;
      if (item.count === 0) {
        orders.splice(orders.indexOf(item), 1);
        setOrders([...orders]);
      }
    }
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

    if(requests.order.length > 0){
      firebase
      .firestore()
      .collection('orders')
      .doc(`${new Date().getTime()}`)
      .set(requests)

      return history.push('/table');
    }
  }

  return (
    <section className='menu'>
      <div className='div-menu'>
        <div className='buttons-options-menu'>
          <Button name='Matinal' className={btnColor2 ? "button-true option-menu-food": "button-false option-menu-food"} handleClick={breakfast} />
          <Button name='Almoço/Janta' className={btnColor ? "button-true option-menu-food": "button-false option-menu-food"} handleClick={allDay} />
        </div>
        <div className='menu-principal bg-color'>
          <div className='bg-color'>
            {currentMenu === 'allDay' &&
              <div className='border-menu'>
                <div className='titles-container'>
                  <Img src={Burgers} alt='Hambúrgueres' />
                </div>
                {menuAllDay && menuAllDay.burger.map(item => (
                  <div className='divs-option-menu' key={item.name} onClick={() => getBurger(item)}>
                    <div className='only-option-menu' >
                      <Img src={item.img} alt={item.alt} />
                      <p>{item.name}</p>
                      <p>{brazilianCurrency(item.price)}</p>
                    </div>
                  </div>
                ))}
                <div className='titles-container'>
                  <Img src={Starters} alt='Acompanhamentos' />
                </div>
                {menuAllDay && menuAllDay.startes.map(item => (
                  <div className='divs-option-menu' key={item.name} onClick={() => getRequests(item)}>
                    <div className='only-option-menu'>
                      <Img src={item.img} alt={item.alt} />
                      <p>{item.name}</p>
                      <p>{brazilianCurrency(item.price)}</p>
                    </div>
                  </div>
                ))}
                <div className='titles-container'>
                  <Img src={Drinks} alt='Bebidas' />
                </div>
                {menuAllDay && menuAllDay.drinks.map(item => (
                  <div className='divs-option-menu' key={item.name} onClick={() => getRequests(item)}>
                    <div className='only-option-menu'>
                      <Img src={item.img} alt={item.alt} />
                      <p>{item.name}</p>
                      <p>{brazilianCurrency(item.price)}</p>
                    </div>
                  </div>
                ))}
              </div>
            }
            {currentMenu === 'breakfast' &&
              <div className='border-menu'>
                <div className='titles-container'>
                  <Img src={Grilled} alt='Sanduíches' />
                </div>
                {menuBreakfast && menuBreakfast.grilled.map(item => (
                  <div className='divs-option-menu' key={item.name} onClick={() => getRequests(item)}>
                    <div className='only-option-menu'>
                      <Img src={item.img} alt={item.alt} />
                      <p>{item.name}</p>
                      <p>{brazilianCurrency(item.price)}</p>
                    </div>
                  </div>
                ))}
                <div className='titles-container'>
                  <Img src={Drinks} alt='Bebidas' />
                </div>
                {menuBreakfast && menuBreakfast.drinks.map(item => (
                  <div className='divs-option-menu' key={item.name} onClick={() => getRequests(item)}>
                    <div className='only-option-menu'>
                      <Img src={item.img} alt={item.alt} />
                      <p>{item.name}</p>
                      <p>{brazilianCurrency(item.price)}</p>
                    </div>
                  </div>
                ))}
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
                  <button className='icon-btn'> <FaMinusCircle className='icon' onClick={() => reduceItem(item)} /></button>
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
      <BurgerOptions show={modalBoolean} closeModal={() => setModalBoolean(false)} currentBurger={burger} setBurger={getAdditional} />
    </section >
  );
};

export default Menu;