import './App.css';
import { Route } from 'react-router-dom';
import React, { Component } from 'react';
import Loadable from 'react-loadable';

import Test from './Components/test';

const Loader = (c) => Loadable({
  loading: () => 'Loading using lazy load',
  loader: c 
})

const Prueba = Loader(() => import('./Components/test'))
const Invoices = Loader(() => import('./Components/Invoices'))
class App extends Component {
  render () {
    return (
      <div className="App">
        <Route exact path="/" component={Test} />
        <Route exact path="/invoices" component={Invoices} />
      </div>
    );
  }
}

export default App;
