import './index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>, 
  document.getElementById("root")
);

serviceWorker.unregister();
