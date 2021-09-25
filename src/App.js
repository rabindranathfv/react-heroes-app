import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import React, { Component } from 'react';
import Test from './Components/test';
import Invoices from './Components/Invoices';

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
