/* eslint-disable no-unused-vars */
import React, { useState, useMemo } from 'react';
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
  const [currentburger, setCurrentburger] = useState(null);

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
  };

  const allDay = e => {
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


  //guardando o valor antigo do hamburger que foi clicado
  //se o modal for true, mostra, se for false, fecha
  const handleBurger = (item) => {
    setCurrentburger(item)
    setModalBoolean(true)
  }

  //set order -  vou pegar as orders(pedidos) que ja foram feitos, e adicionar o hamburguer que foi escolhido
  // setCurrentburger(null) = para poder limpar 
  //e fecha o modal
  const handleBurgerOrder = (orderBurger) => {
    setOrdens([...orders, orderBurger])
    setModalBoolean(false)
    setCurrentburger(null)
  }

  //aqui o total vem na frente porque ele é 0. ai converto nosso preço pra número igual estavamos fazendo e somo os produtos que ja estão lá, + o novo produto que etrou
  const totalPrice = orders.reduce((total, acc) => {
    return total + Number(acc.price)
  }, 0);

  const brazilianCurrency = item => Number(item).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

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
                  <div className='divs-option-menu' key={item.name} onClick={() => handleBurger(item)}>
                    <div className='only-option-menu' >
                      <Img src={item.img} alt={item.alt} />
                      <p>{item.name}</p>
                      <p>{brazilianCurrency(item.price)}</p>
                    </div>
                  </div>
                ))}
                {menuAllDay && menuAllDay.startes.map(item => (
                  <div className='divs-option-menu' key={item.name}>
                    <div className='only-option-menu'>
                      <Img src={item.img} alt={item.alt} />
                      <p>{item.name}</p>
                      <p>{brazilianCurrency(item.price)}</p>
                    </div>
                  </div>
                ))}
                {menuAllDay && menuAllDay.drinks.map(item => (
                  <div className='divs-option-menu' key={item.name} onClick={() => setOrdens([...orders, item])}>
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
                  <div className='divs-option-menu' key={item.name}>
                    <div className='only-option-menu'>
                      <Img src={item.img} alt={item.alt} />
                      <p>{item.name}</p>
                      <p>{brazilianCurrency(item.price)}</p>
                    </div>
                  </div>
                ))}
                {menuBreakfast && menuBreakfast.drinks.map(item => (
                  <div className='divs-option-menu' key={item.name}>
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
          <p>PEDIDOS</p>
          <div className='orders'>
            {orders.map((item, index) => (
              <p key={index}>{item.name} - {brazilianCurrency(item.price)}</p>
            ))}
          </div>
        </div>
        <div className='total'>
          <span>Total: {brazilianCurrency(totalPrice)}</span>
        </div>
        <Button name='PEDIR' />
      </div>
      <BurgerOptions show={modalBoolean} closeModal={() => setModalBoolean(false)} currentBurger={currentburger} setBurger={handleBurgerOrder} />
    </section >
  );
};

export default Menu;