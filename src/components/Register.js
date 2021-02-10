// TODO: Come back to this page

import React from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';

const RegisterPage = (props) => {
  const emailRef = React.createRef();
  const passwordRef = React.createRef();
  const login = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    console.log('login');
  }
  // const registerHandler = () => {
  //   console.log('Clicked on registrater')
  //   props.history.push('/registration');

  // }
  // const loginHandler = () => {
  //   console.log('Clicked on login')
  //   props.history.push('/login');


  return (
    <>
    <form onSubmit={login}>
      <input type='text' ref={emailRef} />
      <input type='text' ref={passwordRef} />
      <Button type='submit'>Login</Button>
    </form>

      // <Button>Login</Button>
    </>
  )
}

export default withRouter(RegisterPage);