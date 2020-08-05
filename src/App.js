import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/login/Login';
import Kitchen from './pages/kitchen/Kitchen';
import Hall from './pages/hall/Hall';
import Table from './pages/table/Table';
import Request from './pages/requests/Requests';
import firebase from './configure-firebase';
import './App.css';

export default function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    firebase
      .auth()
      .onAuthStateChanged(user => {
        user ?
          firebase
            .firestore()
            .collection('users')
            .where('userUid', '==', user.uid)
            .onSnapshot(querySnapshot => {
              querySnapshot.forEach(doc => setUser(doc.data()))
            })
          : setUser();
      });
  }, []);

  return (
    <BrowserRouter>
      {user ? <Redirect to={user.jobTitle} /> : <Redirect to={'/'} />}

      <Switch>
        <Route exact path='/' component={Login} />
        <Route path='/table' component={Table} />
        <Route path='/kitchen' component={Kitchen} />
        <Route path='/hall' component={Hall} />
        <Route path='/requests' component={Request} />
      </Switch>
    </BrowserRouter>
  );
}