import React from 'react';
import DataEntry from './components/DataEntry';
import { Switch, Route } from 'react-router-dom';
import IndexPage from './components/IndexPage';
import Login from './components/Login';
import Register from './components/Register';
import Principal from './components/Principal';
import Teacher from './components/Teacher';


function App() {
  return (
    <Switch>
      <Route path='/' component={IndexPage} exact />
      <Route path='/login' component={Login} exact />
      <Route path='/registration' component={Register} exact />
      <Route path='/principal' component={Principal} exact />
      <Route path='/teacher' component={Teacher} exact />
      <Route path='/dataEntry' component={DataEntry} exact />

    </Switch>
  );
}

export default App;
