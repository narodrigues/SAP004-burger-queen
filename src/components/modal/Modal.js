import React, { useState, useEffect } from 'react';
import CloseModal from '../../components/modalCloseButton/ModalCloseButton';
// import './modal.css'

const Modal = (props) => {
  const [value, setValue] = useState(props.show)
  const showHideClassName = value ? "modal display-block" : "modal display-none";

  useEffect(() => {
    setValue(props.show)
  }, [props.show])

  return (
    <div className={showHideClassName}>
      <CloseModal name='X' handleClick={() => { setValue(false) }} />
      <section className="modal-main">
        {props.children}
      </section>
    </div>
  );
};

export default Modal;

// const[cafe, setCafe] = useState(false)
// const[almoço, setAlmoço] = useState(false)

// useEffect(() => {
//   {cafe && (
//     breakfast()
//   )},
//   {almoço && (
//     allDay()
//   )}
// }, [cafe, almoço])


// const[cafe, setCafe] = useState(false)
// const[almoço, setAlmoço] = useState(false)

// const renderizo = cafe ? 'display: block' : 'display: none'
// const renderizo2 = almoço ? 'display: block' : 'display: none'

