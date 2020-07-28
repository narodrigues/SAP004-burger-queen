import React, { useState } from 'react';
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
  const [orders, setOrdens] = useState([]);
  const [price, setPrice] = useState([0]);
  const [option, setOption] = useState([]);

  const totalPrice = price.reduce((acc, total) => { return acc + total });

  const brazilianCurrency = item => Number(item).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const getOrders = (name, value, options) => {
    setOrdens([...orders, name]);
    setPrice([...price, Number(value)]);
    setOption([...option, options]);
    // orders === name ? setOrdens() : setOrdens([...orders, name]);
  }

  const changeShow = (e, show) => {
    e.preventDefault();
    setModalBoolean(!show);
  }

  const breakfast = (e) => {
    e.preventDefault()
    setCurrentMenu('breakfast')
    firebase
      .firestore()
      .collection('breakfast')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => { setMenuBreakfast(doc.data()) });
      });
  };

  const allDay = (e) => {
    e.preventDefault();
    setCurrentMenu('allDay')
    firebase
      .firestore()
      .collection('allday')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => { setMenuAllDay(doc.data()) });
      });
  };

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
                  <div className='divs-option-menu' key={item.name}>
                    <div className='only-option-menu' onClick={(e) => { changeShow(e, modalBoolean); getOrders(item.name, item.price) }}>
                      <Img src={item.img} alt={item.alt} />
                      <p>{item.name}</p>
                      <p>{brazilianCurrency(item.price)}</p>
                    </div>
                  </div>
                ))}
                {menuAllDay && menuAllDay.startes.map(item => (
                  <div className='divs-option-menu' key={item.name}>
                    <div className='only-option-menu' onClick={() => { getOrders(item.name, item.price) }}>
                      <Img src={item.img} alt={item.alt} />
                      <p>{item.name}</p>
                      <p>{brazilianCurrency(item.price)}</p>
                    </div>
                  </div>
                ))}
                {menuAllDay && menuAllDay.drinks.map(item => (
                  <div className='divs-option-menu' key={item.name}>
                    <div className='only-option-menu' onClick={() => { getOrders(item.name, item.price) }}>
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
                  <div className='divs-option-menu' key={item.name}>
                    <div className='only-option-menu' onClick={() => { getOrders(item.name, item.price) }}>
                      <Img src={item.img} alt={item.alt} />
                      <p>{item.name}</p>
                      <p>{brazilianCurrency(item.price)}</p>
                    </div>
                  </div>
                ))}
                {menuBreakfast && menuBreakfast.drinks.map(item => (
                  <div className='divs-option-menu' key={item.name}>
                    <div className='only-option-menu' onClick={() => { getOrders(item.name, item.price) }}>
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
          <p>PEDIDOS</p>
          <div className='orders'>{orders.map(itens => `${itens} \n`)}</div>
        </div>
        <div className='total'>
          <span>Total: {totalPrice !== 0 ? brazilianCurrency(totalPrice) : ''}</span>
        </div>
        <Button name='PEDIR' />
      </div>
      <BurgerOptions show={modalBoolean} closeModal={e => changeShow(e, modalBoolean)} setBurger={(meat, option) => getOrders(meat, option)} />
    </section>
  );
};

export default Menu;