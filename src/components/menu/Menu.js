import React, { useState } from 'react';
import Img from '../imagem/Img';
import Button from '../button/Button'
import './menu.css'
import firebase from '../../configure-firebase'

const Menu = () => {
  const [menu, setMenu] = useState(null);

  const breakfast = (e) => {
    e.preventDefault()
    firebase
      .firestore()
      .collection('breakfast')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => console.log(doc.data().drinks));
      });
  };

  const allDay = (e) => {
    e.preventDefault();
    firebase
      .firestore()
      .collection('allday')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => { setMenu(doc.data()) });
      });
  };

  
// const[cafe, setCafe] = useState(false)
// const[almoço, setAlmoço] = useState(false)

// useEffect(() => {
//   {cafe && (
//     breakfast()
//   )},
//   {almoço && (
//     allDay()
//   )}
// }, [cafe, almoço])



  return (
    <section className='menu'>
      <div className='div-menu'>
        <div className='buttons-options-menu'>
          <Button name='Matinal' className='option-menu-food' handleClick={breakfast} />
          <Button name='Almoço/Janta' className='option-menu-food' handleClick={allDay} />
        </div>
        <div className='menu-principal bg-color'>
          <div className='border-menu bg-color'>
            {menu && menu.burger.map(item => (
              <div className='divs-option-menu' key={item.name}>
                <div className='only-option-menu'>
                  <Img alt={item.alt} className='img-food' />
                  <p>{item.name}</p>
                  <p>{item.price}</p>
                </div>
              </div>
            ))}
            {menu && menu.startes.map(item => (
              <div className='divs-option-menu' key={item.name}>
                <div className='only-option-menu'>
                  <Img alt={item.alt} className='img-food' />
                  <p>{item.name}</p>
                  <p>{item.price}</p>
                </div>
              </div>
            ))}
            {menu && menu.drinks.map(item => (
              <div className='divs-option-menu' key={item.name}>
                <div className='only-option-menu'>
                  <Img alt={item.alt} className='img-food' />
                  <p>{item.name}</p>
                  <p>{item.price}</p>
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
};

export default Menu;