import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import React, { useState } from "react";
import Header from '../../components/header/Header';
import { Link } from 'react-router-dom';

export default function Table() {
  const [username, setUsername] = useState('');
  const [table, setTable] = useState('');
  const [showErrorNameEmpty, setErrorNameEmpty] = useState(false);
  const [showErrorTable, setErrorTable] = useState(false);

  const validForm = () => {
    setErrorNameEmpty(false);
    setErrorTable(false);

    let isValid = true;

    if (!username) {
      setErrorNameEmpty(true);
      isValid = false;
    }
    if (!table) {
      setErrorTable(true);
      isValid = false;
    }
    return isValid;
  }

  const sendOrder = e => {
    e.preventDefault()

    const isValid = validForm();

    if (isValid) {
      console.log('tudo certo')
    };
  }

  return (
    <section className='flex-row-desk'>
      <Header />
      <div>
        <form className='form-login'>
          <label>Escreva o nome do cliente e o número da mesa</label>
          <Input type='text' placeholder='Nome do cliente' id='client-name' onChange={e => setUsername(e.target.value)} />
          {showErrorNameEmpty && (
            <p>Por favor, preencha o nome do cliente.</p>
          )}
          <Input type='number' id='table-number' min="1" max="15" onChange={e => setTable(e.target.value)} />
          {showErrorTable && (
            <p>Sua senha deve ter mais de 6 dígitos.</p>
          )}
          <div className='div-buttons-order'>
            <Button id='btn-order' className='button' name='Fazer pedido' handleClick={sendOrder} />
            <Button id='btn-return' className='button' /*handleClick={''}*/>
              <Link to="/hall" className='btn-order'>VOLTAR</Link>
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}