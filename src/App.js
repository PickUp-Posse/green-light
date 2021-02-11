import React from 'react';
import { Switch, Route } from 'react-router-dom';
import IndexPage from './components/IndexPage';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Principal from './components/Principal';
import Teacher from './components/Teacher';
import DataEntry from './components/DataEntry';
import PrincipalPickup from './components/PrincipalPickup';

function App() {
  return (
    <Switch>
      <Route path='/' component={IndexPage} exact />
      <Route path='/signup' component={SignUp} exact />
      <Route path='/signin' component={SignIn} exact />
      <Route path='/principal' component={Principal} exact />
      <Route path='/teacher' component={Teacher} exact />
      <Route path='/dataEntry' component={DataEntry} exact />
      <Route path='/principalPickup' component={PrincipalPickup} exact />
    </Switch>
  );
}

export default App;
