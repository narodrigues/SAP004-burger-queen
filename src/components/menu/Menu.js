import React from 'react';
import Img from '../imagem/Img';
import Button from '../button/Button'
import optionBurger from '../optionMenu/option'
import './menu.css'

const Menu = () => (
  <section className='menu'>
    <div className='menu-principal bg-color'>
      <div className='border-menu'>
        {optionBurger.map(item => (
          <div className='divs-option-menu'>
            <div className='only-option-menu'>
              <Img src={item.imagem} alt={item.alt} className='img-food' />
              <p>{item.text}</p>
              <p>{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className='requests bg-color'>
      <div className='requests-quantity'>
        <p>PEDIDOS</p>
      </div>
      <div className='total'>
        <span>Total: </span>
      </div>
      <Button />
    </div>
  </section>
);

export default Menu;