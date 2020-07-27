import React from 'react';
import Button from '../button/Button';
import Input from '../input/Input';
import './modal.css';

const ModalHamburger = () => {
  return (
    <section className='modal-container'>
      <div className='modal-options'>
        <Button className='btn-modal-close' name='X' />
        <form className='modal-form'>
          <fieldset>
            <p>Escolha sua carne:</p>
            <div>
              <label htmlFor='option-beef'>Carne</label>
              <Input type='radio' className='radio-option' name='option-burger' id='option-beef' />
            </div>
            <div>
              <label htmlFor='option-chicken'>Frango</label>
              <Input type='radio' className='radio-option' name='option-burger' id='option-chicken' />
            </div>
            <div>
              <label htmlFor='option-vegetarian'>Vegetariano</label>
              <Input type='radio' className='radio-option' name='option-burger' id='option-vegetarian' />
            </div>
          </fieldset>
          <fieldset>
            <p>Adicionais (R$ 1,00):</p>
            <div className='add-item-burger'>
              <label htmlFor='option-cheese'>Queijo</label>
              <Input type='checkbox' className='radio-cheese' name='option-burger' id='option-cheese' />
            </div>
            <div className='add-item-burger'>
              <label htmlFor='option-egg'>Ovo</label>
              <Input type='checkbox' className='radio-option' name='option-burger' id='option-egg' />
            </div>
          </fieldset>
          <Button name='CONFIRMAR' />
        </form>
      </div>
    </section>
  );
};

export default ModalHamburger;