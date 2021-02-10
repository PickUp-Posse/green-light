import React from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';

const IndexPage = (props) => {
  const registerHandler = () => {
    console.log('Clicked on registration')
    props.history.push('/registration');

  }
  const loginHandler = () => {
    console.log('Clicked on login')
    props.history.push('/login');

  }
  return (
    <>
      <Button onClick={registerHandler}>Register</Button>
      <Button onClick={loginHandler}>Login</Button>
    </>
  )
}

export default withRouter(IndexPage);