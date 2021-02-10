import React from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import superagent from 'superagent';
import io from 'socket.io-client';

const PrincipalPage = (props) => {
  const dataEntryHandler = () => {
    console.log('DATA')
    props.history.push('/dataEntry');

  }
  const startParentPickup = () => {
    console.log('Parent Pickup')
    // const host = io('http://localhost:3001', { transports: ['websocket'] });
    // const principal = io.connect(host);
    // principal.emit('connection');
    // console.log('inside dataEntry');
    // superagent.get('https://parent-pickup-coordinator.herokuapp.com/student')
    //   .then(response => {
    //     console.log('Line 11 response body', response.body);
    //   })
    props.history.push('/principalPickup');
  }
  return (
    <>
      <Button onClick={dataEntryHandler}>Student Records</Button>
      <Button onClick={startParentPickup}>Start Pickup</Button>
    </>
  )
}

export default withRouter(PrincipalPage);