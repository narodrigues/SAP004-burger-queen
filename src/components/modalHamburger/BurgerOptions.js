import React, { useState } from 'react';
import Button from '../button/Button';
import CloseModal from '../modalCloseButton/ModalCloseButton';
import Input from '../input/Input';
import './burgerOptions.css';

const ModalBurger = (props) => {
  const showHideClassName = props.show ? "modal display-block" : "modal display-none";

  const [meat, setMeat] = useState();
  const [option, setOption] = useState([])

  return (
    <div className={showHideClassName}>
      <CloseModal name='X' onClick={props.closeModal} />
      <section className='modal-container modal-main'>
        <div className='modal-options'>
          <form className='modal-form'>
            <fieldset>
              <p>Escolha sua carne:</p>
              <div>
                <label htmlFor='option-beef'>Carne</label>
                <Input type='radio' className='radio-option' name='option-burger' id='option-beef' value='carne' onChange={e => setMeat(e.target.value)} />
              </div>
              <div>
                <label htmlFor='option-chicken'>Frango</label>
                <Input type='radio' className='radio-option' name='option-burger' id='option-chicken' value='frango' onChange={e => setMeat(e.target.value)} />
              </div>
              <div>
                <label htmlFor='option-vegetarian'>Vegetariano</label>
                <Input type='radio' className='radio-option' name='option-burger' id='option-vegetarian' value='vegetariano' onChange={e => setMeat(e.target.value)} />
              </div>
            </fieldset>
            <fieldset>
              <p>Adicionais (R$ 1,00):</p>
              <div className='add-item-burger'>
                <label htmlFor='option-cheese'>Queijo</label>
                <Input type='checkbox' className='radio-cheese' name='option-burger' id='option-cheese' value='queijo' onChange={e => setOption([...option, e.target.value])} />
              </div>
              <div className='add-item-burger'>
                <label htmlFor='option-egg'>Ovo</label>
                <Input type='checkbox' className='radio-option' name='option-burger' id='option-egg' value='ovo' onChange={e => setOption([...option, e.target.value])} />
              </div>
            </fieldset>
            <Button name='CONFIRMAR' type="button" handleClick={e => { e.preventDefault(); props.setBurger(meat, 0, option) }} />
            {/* <Button name='CONFIRMAR' type="button" handleClick={e => { e.preventDefault();  props.setBurger(meat, options) }}/> */}
            {/* <Button name='CONFIRMAR' handleClick={props.getOptionsAdditional(meat, options)} /> */}
          </form>
        </div>
      </section>
    </div>
  );
};

export default ModalBurger;
