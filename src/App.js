import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import firebase from './configure-firebase';
import Hall from './pages/hall/Hall';
import Kitchen from './pages/kitchen/Kitchen';
import Login from './pages/login/Login';
import React, { useEffect, useState } from 'react';
import Request from './pages/requests/Requests';
import Table from './pages/table/Table';

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