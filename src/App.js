import React from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Header from './components/Header/Header';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import Schedule from './components/Schedule/Schedule';
import Map from './components/Map/Map';


import './styles/main.css';

const App = () => (
  <div>
    <Header title="JFuerst Real Estate Photography" />
    <Router>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route
          path="/home"
          component={LoginPage}
        />
        <Route
          path="/register"
          component={RegisterPage}
        />
        <Route
          path="/schedule"
          component={Schedule}
        />
        <Route
          path="/map"
          component={Map}
        />
        {/* OTHERWISE no path */}
        <Route
          render={() => <h1>404</h1>}
        />
      </Switch>
    </Router>
  </div>
);

export default App;
