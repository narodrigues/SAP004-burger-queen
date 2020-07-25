import React from 'react';
import Img from '../imagem/Img';
import Button from '../button/Button'
// import optionBurger from '../optionMenu/option'
import './menu.css'
import firebase from '../../configure-firebase'

const breakfast = (e) => {
  e.preventDefault()
  firebase
    .firestore()
    .collection('breakfast')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => console.log(doc.data()))
    })
}

const allDayArray = []; 
const allDay = () => {
  firebase
    .firestore()
    .collection('allday')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => allDayArray.push(doc.data()));
      // return allDayArray
      // allDayArray.forEach(categories => categories.burger.forEach(burgers => console.log(burgers.name)))
    })
}

const Menu = () => (
  <section className='menu'>
    <div className='div-menu'>
      <div className='buttons-options-menu'>
        <Button name='Matinal' className='option-menu-food' handleClick={breakfast} />
        <Button name='Almoço/Janta' className='option-menu-food' handleClick={allDay} />
      </div>
      <div className='menu-principal bg-color'>
        <div className='border-menu bg-color'>
          {allDayArray.forEach(item => (
            <div className='divs-option-menu'>
              <div className='only-option-menu'>
                <Img alt={item.burger.alt} className='img-food' />
                <p>{item.burger.name}</p>
                <p>{item.burger.price}</p>
              </div>
            </div>
          ))}
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

export default Menu;