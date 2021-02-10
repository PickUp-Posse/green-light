import React, { useEffect, useState } from 'react';
import superagent from 'superagent';
import io from 'socket.io-client';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const PrincipalPickupPage = () => {
  const [studentList, setStudentList] = useState([]);
  const [chosenChild, setChosenChild] = useState({});
  const pickupIdRef = React.createRef();
  useEffect(() => {
    async function fetchData() {
      //const host = io('http://localhost:3001', { transports: ['websocket'] });
      // const principal = io.connect(host);
      // principal.emit('connection');
      // console.log('inside dataEntry');
      let students = await superagent.get('https://parent-pickup-coordinator.herokuapp.com/student')
        .then(response => {
          return response.body;
        })
      setStudentList(students);
    }
    fetchData();

  }, []);

  const pickUpStudent = (e) => {
    e.preventDefault();
    const pickupId = pickupIdRef.current.value;
    console.log('ID: ', pickupId);
    let chosenStudent = studentList.filter((child) => {
      if (child.studentID === parseInt(pickupId)) return child;
    })
    setChosenChild(chosenStudent[0]);
  }
  return (
    <>
      { console.log('inside return', chosenChild)}
      <form onSubmit={pickUpStudent}>
        <input type='text' ref={pickupIdRef} />
        <Button type='submit'>Submit</Button>
      </form>
      <div>
        <p>{chosenChild.name}</p>
      </div>
    </>
  )
}



export default withRouter(PrincipalPickupPage);


// if studentList.studentID === pickupIdRef then student name will populate in <p> else === <div>
