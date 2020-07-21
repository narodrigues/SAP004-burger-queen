// import React from 'react';
// // import logo from './logo.svg';
// import Routes from './routes';
import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import Kitchen from './pages/kitchen';
import Login from './pages/login/Login';
import Kitchen from './pages/kitchen/Kitchen';
import Hall from './pages/hall/Hall';
import firebase from './configure-firebase'

// import Header from './components/header/Header';
// import Login from  './pages/login/Login';
import './App.css';
// import 'bootstrap / dist / css / bootstrap.min.css';

export default function App(){
  // <div className="App">

// const history = useHistory();
// console.log(history)

// useEffect(() => {
//   firebase
//   .auth()
//   .onAuthStateChanged(user => {
//     user ? 
//     firebase
//       .firestore()
//       .collection('users')
//       // .doc(user.uid)
//       .where('userUid', '==', user.uid)
//       .get()
//       .then(querySnapshot => {
//         querySnapshot.forEach((doc) => {
//           const userData = doc.data().jobTitle
//           // if(userData === 'kitchen'){
//           //   console.log(useHistory)
//           //   history.push('/kitchen')
//           // } else {
//           //   history.push('/hall')
//           // }
//         })
    
//       }) 
//       : history.push('/')

//   })
// }, [history]);

return  (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Login} />
      <Route exact path='/kitchen' component={Kitchen} />
      <Route exact path='/hall' component={Hall} />
    </Switch>
  </BrowserRouter>
)
  //   <Routes />
  // </div>
}

// export default App;
