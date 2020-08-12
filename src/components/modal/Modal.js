import React from 'react';
import CloseButton from '../closeButton/CloseButton';

const Modal = props => {
  const showHideClassName = props.visibility ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <CloseButton name='X' onClick={props.closeModal} />
      <section className="modal-main">
        {props.children}
      </section>
    </div>
  );
};

export default Modal;