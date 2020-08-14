import './burgerOptions.css';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import React, { useState } from 'react';

const ModalBurger = props => {
  const [meat, setMeat] = useState();
  const [egg, setEgg] = useState(false);
  const [cheese, setCheese] = useState(false);
  const [showErrorMeat, setErrorMeat] = useState();

  const resetModal = () => {
    setMeat(null);
    setEgg(false);
    setCheese(false);
  }

  function validForm() {
    setErrorMeat(false);

    let isValid = true;
    
    if (!meat) {
      setErrorMeat(true);
      isValid = false;
    }
    return isValid;
  }

  const getValueOfAdditionals = e => {
    e.preventDefault();

    const isValid = validForm();

    if (isValid) {
      const payload = { ...props.currentBurger };

      payload.name = `${payload.name} + hambúrguer sabor ${meat}`;
      payload.egg = egg;
      payload.cheese = cheese;
      props.updateBurger(payload);

      resetModal();
    }
  }

  const burgerOptions = (id, flavor, input, option, value, func) => {
    return (
      <div>
        <label htmlFor={id}>{flavor}</label>
        <Input type={input} className='radio-option' checked={(option === value)} name='option-burger' id={id} value={flavor} onChange={func} />
      </div>
    )
  }

  return (
    <section className='modal-container modal-main'>
      <div className='modal-options'>
        <form className='modal-form'>
          <fieldset>
            <p>Escolha sua carne:</p>
            {burgerOptions('option-beef', 'carne', 'radio', meat, 'carne', e => setMeat(e.target.value))}
            {burgerOptions('option-chicken', 'frango', 'radio', meat, 'frango', e => setMeat(e.target.value))}
            {burgerOptions('option-vegetarian', 'vegetariano', 'radio', meat, 'vegetariano', e => setMeat(e.target.value))}
            {showErrorMeat && <p className='error-msg'>Escolha o tipo de carne</p>}
          </fieldset>
          <fieldset>
            <p>Adicionais (R$ 1,00 cada):</p>
            {burgerOptions('option-cheese', 'queijo', 'checkbox', cheese, true, () => setCheese(!cheese))}
            {burgerOptions('option-egg', 'ovo', 'checkbox', egg, true, () => setEgg(!egg))}
          </fieldset>
          <Button name='CONFIRMAR' type="button" handleClick={getValueOfAdditionals} />
        </form>
      </div>
    </section>
  );
}

export default ModalBurger;