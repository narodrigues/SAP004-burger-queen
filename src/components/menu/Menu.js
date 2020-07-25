import React, { useState } from 'react';
import Img from '../imagem/Img';
import Button from '../button/Button'
import './menu.css'
import firebase from '../../configure-firebase'

const Menu = () => {
  const [menuAllDay, setMenuAllDay] = useState(null);
  const [menuBreakfast, setMenuBreakfast] = useState(null);
  const [currentMenu, setCurrentMenu] = useState('allDay');

  const breakfast = (e) => {
    e.preventDefault()
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
          <div className='border-menu bg-color'>
            {currentMenu === 'allDay' &&
              <div>
                {menuAllDay && menuAllDay.burger.map(item => (
                  <div className='divs-option-menu' key={item.name}>
                    <div className='only-option-menu'>
                      <Img alt={item.alt} className='img-food' />
                      <p>{item.name}</p>
                      <p>{item.price}</p>
                    </div>
                  </div>
                ))}
                {menuAllDay && menuAllDay.startes.map(item => (
                  <div className='divs-option-menu' key={item.name}>
                    <div className='only-option-menu'>
                      <Img alt={item.alt} className='img-food' />
                      <p>{item.name}</p>
                      <p>{item.price}</p>
                    </div>
                  </div>
                ))}
                {menuAllDay && menuAllDay.drinks.map(item => (
                  <div className='divs-option-menu' key={item.name}>
                    <div className='only-option-menu'>
                      <Img alt={item.alt} className='img-food' />
                      <p>{item.name}</p>
                      <p>{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            }
            {currentMenu === 'breakfast' &&
              <div>
                {menuBreakfast && menuBreakfast.grilled.map(item => (
                  <div className='divs-option-menu' key={item.name}>
                    <div className='only-option-menu'>
                      <Img alt={item.alt} className='img-food' />
                      <p>{item.name}</p>
                      <p>{item.price}</p>
                    </div>
                  </div>
                ))}
                {menuBreakfast && menuBreakfast.drinks.map(item => (
                  <div className='divs-option-menu' key={item.name}>
                    <div className='only-option-menu'>
                      <Img alt={item.alt} className='img-food' />
                      <p>{item.name}</p>
                      <p>{item.price}</p>
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
        </div>
        <div className='total'>
          <span>Total: </span>
        </div>
        <Button name='PEDIR' />
      </div>
    </section>
  );
};

export default Menu;