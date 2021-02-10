// TODO: Come back to this page

import React from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';

const RegisterPage = (props) => {
  // const registerHandler = () => {
  //   console.log('Clicked on registrater')
  //   props.history.push('/registration');

  // }
  // const loginHandler = () => {
  //   console.log('Clicked on login')
  //   props.history.push('/login');


  return (
    <>

      <Button>Login</Button>
    </>
  )
}

export default withRouter(RegisterPage);