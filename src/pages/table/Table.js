import { Link } from 'react-router-dom';
import Button from '../../components/button/Button';
import firebase from '../../configure-firebase';
import Header from '../../components/header/Header';
import Input from '../../components/input/Input';
import Modal from '../../components/modal/Modal';
import ConfirmOrder from '../confirmOrder/ConfirmOrder';
import React, { useState } from "react";

export default function Table() {
  const [username, setUsername] = useState();
  const [table, setTable] = useState();
  const [showErrorNameEmpty, setErrorNameEmpty] = useState();
  const [showErrorTable, setErrorTable] = useState();
  const [modalVisibility, setModalVisibility] = useState(false);

  const orderId = localStorage.getItem('id');

  const changeVisibility = (e, show) => {
    e.preventDefault();
    setModalVisibility(!show);
  }

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

  const sendOrder = (e, show) => {
    e.preventDefault()

    const isValid = validForm();

    if (isValid) {
      setModalVisibility(!show);

      firebase
        .firestore()
        .collection('orders')
        .doc(orderId)
        .update({
          client: username,
          table: table,
          status: "Pendente",
          id: orderId,
          initialTime: new Date().toLocaleString(),
        });
    }
  }

  return (
    <section className='close-modal-only'>
      <section className='flex-row-desk'>
        <Header />
        <div>
          <form className='form-login'>
            <label >Escreva o nome do cliente e o número da mesa</label>
            <Input type='text' placeholder='Nome do cliente' id='client-name' onChange={e => setUsername(e.target.value)} />
            {showErrorNameEmpty && <p className='error-msg'>Por favor, preencha o nome do cliente.</p>}
            <Input type='number' placeholder='Número da mesa' id='table-number' min="1" max="15" onChange={e => setTable(e.target.value)} />
            {showErrorTable && <p className='error-msg'>Por favor, escolha o número da mesa.</p>}
            <div className='div-buttons-order'>
              <Button id='btn-order' className='button' name='Fazer pedido' handleClick={e => sendOrder(e, modalVisibility)} />
              <Button id='btn-return' className='button'>
                <Link to='/hall'>VOLTAR</Link>
              </Button>
            </div>
          </form>
        </div>
        <Modal visibility={modalVisibility} closeModal={e => changeVisibility(e, modalVisibility)} >
          <ConfirmOrder />
        </Modal>
      </section>
    </section >
  );
}