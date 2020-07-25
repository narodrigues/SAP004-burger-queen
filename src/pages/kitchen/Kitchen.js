import React from "react";
import './kitchen.css';
import Button from '../../components/button/Button'
import firebase from '../../configure-firebase'
import Header from '../../components/header/Header'
import Cork from '../../components/cork/Cork'

export default function Kitchen() {
  const logout = () => {
    firebase
      .auth()
      .signOut()
  }


  // const ref = firebase.storage().ref('imgs');
  // const myFile = e.target.files[0];

  // const getUserImg = myFile => 
  //   ref
  //   .child(`imgs + ${myFile.name}`)
  //   .put(myFile)
  //   .then(() => ref
  //     .child(`imgs + ${myFile.name}`)
  //     .getDownloadURL()
  //     .then(url => url));


  return (
    <>
      <section className='kitchen'>
        <Header className='header-hall' />
        <div className='exit-btn'>
          <Button name='Sair' handleClick={(e) => logout(e)} />
        </div>
      </section>
      {/* <form>
        <label for='my-file'>Select a file:</label>
        <input type='file' id='my-file' name='my-file' disabled onChange={getUserImg(e, myFile)}/>
      </form>
      <button onClick={}></button>
      <div id='myImg'></div> */}
      <Cork />
    </>
  )
}