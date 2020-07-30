/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';
import Img from '../imagem/Img';
import Button from '../button/Button';
import BurgerOptions from '../modalHamburger/BurgerOptions'
import './menu.css';
import firebase from '../../configure-firebase';

const Menu = () => {
  const [menuAllDay, setMenuAllDay] = useState(null);
  const [menuBreakfast, setMenuBreakfast] = useState(null);
  const [modalBoolean, setModalBoolean] = useState(false);
  const [currentMenu, setCurrentMenu] = useState('allDay');
  const [orders, setOrders] = useState([]);
  const [burger, setBurger] = useState(null);

  const breakfast = e => {
    e.preventDefault()
    setCurrentMenu('breakfast')
    firebase
      .firestore()
      .collection('breakfast')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => { setMenuBreakfast(doc.data()) });
      });
  }

  const allDay = e => {
    e.preventDefault();
    setCurrentMenu('allDay')
    firebase
      .firestore()
      .collection('allday')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => setMenuAllDay(doc.data()));
      });
  }

  const getBurger = item => {
    setBurger(item);
    setModalBoolean(true);
  }

  const getAdditional = orderBurger => {
    let priceToNumber = Number(orderBurger.price)
    let finalName = orderBurger.name;

    if (orderBurger.cheese === true && orderBurger.egg) {
      priceToNumber += 2;
      finalName += ` e adicionais de queijo e ovo`
    } else if (orderBurger.cheese === true) {
      priceToNumber += 1;
      finalName += ` e adicional de queijo`
    } else if (orderBurger.egg === true) {
      priceToNumber += 1;
      finalName += ` e adicional de ovo`
    } else {
      priceToNumber += 0;
      finalName += '';
    }

    const finalOrder = {
      alt: orderBurger.alt,
      cheese: orderBurger.cheese,
      egg: orderBurger.egg,
      img: orderBurger.img,
      name: finalName,
      price: priceToNumber,
      count: orderBurger.count,
    };

    countQuantity(finalOrder)
    setModalBoolean(false);
  }

  const totalPrice = orders.reduce((total, acc) => total + (Number(acc.price) * acc.count), 0);

  const brazilianCurrency = item => Number(item).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const getRequests = (item) => {
    setOrders([...orders, item]);
    countQuantity(item);
  }

  const countQuantity = (item) => {
    if (!orders.includes(item)) {
      item.count = 1;
      setOrders([...orders, item]);
    } else {
      item.count++;
      console.log(`esta pessoa quer + ${item.count} de ${item.name}`);
      setOrders([...orders]);
    }
  }

  return (
    <section className='menu'>
      <div className='div-menu'>
        <div className='buttons-options-menu'>
          <Button name='Matinal' className='option-menu-food' handleClick={breakfast} />
          <Button name='Almoço/Janta' className='option-menu-food' handleClick={allDay} />
        </div>
        <div className='menu-principal bg-color'>
          <div className='bg-color'>
            {currentMenu === 'allDay' &&
              <div className='border-menu'>
                {menuAllDay && menuAllDay.burger.map(item => (
                  <div className='divs-option-menu' key={item.name} onClick={() => getBurger(item)}>
                    <div className='only-option-menu' >
                      <Img src={item.img} alt={item.alt} />
                      <p>{item.name}</p>
                      <p>{brazilianCurrency(item.price)}</p>
                    </div>
                  </div>
                ))}
                {menuAllDay && menuAllDay.startes.map(item => (
                  <div className='divs-option-menu' key={item.name} onClick={() => getRequests(item)}>
                    <div className='only-option-menu'>
                      <Img src={item.img} alt={item.alt} />
                      <p>{item.name}</p>
                      <p>{brazilianCurrency(item.price)}</p>
                    </div>
                  </div>
                ))}
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
                {menuBreakfast && menuBreakfast.grilled.map(item => (
                  <div className='divs-option-menu' key={item.name} onClick={() => getRequests(item)}>
                    <div className='only-option-menu'>
                      <Img src={item.img} alt={item.alt} />
                      <p>{item.name}</p>
                      <p>{brazilianCurrency(item.price)}</p>
                    </div>
                  </div>
                ))}
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
          <p className='title-request'>PEDIDOS</p>
          <div className='orders'>
            {orders.map((item, index) => (
              <div className='request-plus-minus' key={item.name}>
                <p key={index}>{item.name}</p>
                <div className='div-btn-icons'>
                  <button className='icon-btn'> <FaMinusCircle className='icon' /></button>
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
        <Button name='PEDIR' />
      </div>
      <BurgerOptions show={modalBoolean} closeModal={() => setModalBoolean(false)} currentBurger={burger} setBurger={getAdditional} />
    </section >
  );
};

export default Menu;