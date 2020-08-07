import React from 'react';
import CloseModal from '../../components/modalCloseButton/ModalCloseButton';

const Modal = props => {
  const showHideClassName = props.show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <CloseModal name='X' onClick={props.closeModal} />
      <section className="modal-main">
        {props.children}
      </section>
    </div>
  );
};

export default Modal;