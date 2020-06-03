//More on React Hooks: https://reactjs.org/docs/hooks-intro.html

//npm Custom Store Hook package: https://www.npmjs.com/package/use-global-hook

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import configureProducsStore from './hooks-store/products-store';
import configureCounterStore from './hooks-store/counter-store';
//that's how store is initialized
configureProducsStore();
configureCounterStore();

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
