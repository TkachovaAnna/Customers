import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CustomersTable from './components/CustomersTable/CustomersTable';
import Customer from './components/Customer/Customer';

import "./App.css";
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <h1> Customers app</h1>
          <Switch>
            <Route exact path='/' component={CustomersTable} />
            <Route path='/customer/:id' component={Customer} />
          </Switch>
        </div>
      </BrowserRouter >
    );
  }
}

export default App;
