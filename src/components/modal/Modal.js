import React from 'react';

const Modal = (props) => {
  const showHideClassName = props.open ? "modal display-block" : "modal display-none";
  
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {props.children}
      </section>
    </div>
  );
};

export default Modal;