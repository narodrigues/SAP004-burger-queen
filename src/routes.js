// import React, { useEffect } from 'react';
// import { BrowserRouter, Switch, Route, useHistory } from 'react-router-dom';
// // import Kitchen from './pages/kitchen';
// import Login from './pages/login/Login';
// import Kitchen from './pages/kitchen/Kitchen';
// import Hall from './pages/hall/Hall';
// import firebase from './configure-firebase'
// // import Register from './pages/register';
// // import Hall from './pages/hall';

//   let history = useHistory();

//   useEffect(() => {
//     firebase.auth().onAuthStateChanged(user => {
//       firebase
//         .firestore()
//         .collection('users')
//         .doc(user.uid)
//         // .where('userUid', '==', user.uid)
//         .get()
//         .then(querySnapshot => {
//           const userData = querySnapshot.data();
//           if(userData.jobTitle === 'kitchen'){
//             history.push('/kitchen')
//           } else {
//             history.push('/hall')
//           }
//         });
//     })
//   }, [history]);

// const Routes = () => (
//   <BrowserRouter>
//     <Switch>
//       <Route exact path='/' component={Login} />
//       <Route exact path='/kitchen' component={Kitchen} />
//       <Route exact path='/hall' component={Hall} />

//       {/* <Route path='/register' component={Register} />
//       <Route path='/kitchen' component={Kitchen} />
//       <Route path='/hall' component={Hall} /> */}

//       {/* <Route path='/products:id' component={Product} /> */}
//     </Switch>
//   </BrowserRouter>
// )

// export default Routes;