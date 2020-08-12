import React, { useState } from 'react';
import Button from '../button/Button';
import CloseModal from '../modalCloseButton/ModalCloseButton';
import Input from '../input/Input';
import './burgerOptions.css';

const ModalBurger = props => {
  const showHideClassName = props.show ? "modal display-block" : "modal display-none";

  const [meat, setMeat] = useState();
  const [egg, setEgg] = useState(false);
  const [cheese, setCheese] = useState(false);

  const resetModal = () => {
    setMeat(null);
    setEgg(false);
    setCheese(false);
  }

  const getValueOfAdditionals = e => {
    e.preventDefault();
    const payload = { ...props.currentBurger };

    payload.name = `${payload.name} + hambúrguer sabor ${meat}`;
    payload.egg = egg;
    payload.cheese = cheese;
    props.updateBurger(payload);

    resetModal();
  }

  return (
    <div className={showHideClassName}>
      <CloseModal name='X' onClick={() => {
        resetModal();
        props.closeModal();
      }} />
      <section className='modal-container modal-main'>
        <div className='modal-options'>
          <form className='modal-form'>
            <fieldset>
              <p>Escolha sua carne:</p>
              <div>
                <label htmlFor='option-beef'>Carne</label>
                <Input type='radio' className='radio-option' checked={(meat === "carne")} name='option-burger' id='option-beef' value='carne' onChange={e => setMeat(e.target.value)} />
              </div>
              <div>
                <label htmlFor='option-chicken'>Frango</label>
                <Input type='radio' className='radio-option' checked={(meat === "frango")} name='option-burger' id='option-chicken' value='frango' onChange={e => setMeat(e.target.value)} />
              </div>
              <div>
                <label htmlFor='option-vegetarian'>Vegetariano</label>
                <Input type='radio' className='radio-option' checked={(meat === "vegetariano")} name='option-burger' id='option-vegetarian' value='vegetariano' onChange={e => setMeat(e.target.value)} />
              </div>
            </fieldset>
            <fieldset>
              <p>Adicionais (R$ 1,00 cada):</p>
              <div className='add-item-burger'>
                <label htmlFor='option-cheese'>Queijo</label>
                <Input type='checkbox' className='radio-cheese' checked={(cheese === true)} name='option-burger' id='option-cheese' value='queijo' onChange={() => setCheese(!cheese)} />
              </div>
              <div className='add-item-burger'>
                <label htmlFor='option-egg'>Ovo</label>
                <Input type='checkbox' className='radio-option' checked={(egg === true)} name='option-burger' id='option-egg' value='ovo' onChange={() => setEgg(!egg)} />
              </div>
            </fieldset>
            <Button name='CONFIRMAR' type="button" handleClick={getValueOfAdditionals} />
          </form>
        </div>
      </section>
    </div>
  );
}

export default ModalBurger;