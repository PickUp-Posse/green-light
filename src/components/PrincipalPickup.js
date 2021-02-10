import React, { useEffect, useState } from 'react';
import superagent from 'superagent';
import io from 'socket.io-client';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { populateStudents, updateStatus } from '../store/students-reducer.js';

const mapDispatchToProps = { populateStudents, updateStatus };

const PrincipalPickupPage = (props) => {
  // const [studentList, setStudentList] = useState([]);
  const [chosenChild, setChosenChild] = useState({});
  const pickupIdRef = React.createRef();

  // useEffect(() => {
  //   async function fetchData() {
  //     //const host = io('http://localhost:3001', { transports: ['websocket'] });
  //     // const principal = io.connect(host);
  //     // principal.emit('connection');
  //     // console.log('inside dataEntry');
  //     let students = await superagent.get('https://parent-pickup-coordinator.herokuapp.com/student')
  //       .then(response => {
  //         return response.body;
  //       })
  //     setStudentList(students);
  //   }
  //   fetchData();

  // }, []);

  const pickUpStudent = (e) => {
    e.preventDefault();
    const pickupId = pickupIdRef.current.value;
    console.log('ID: ', pickupId);
    let chosenStudent = props.allStudents.filter((child) => {
      if (child.studentID === parseInt(pickupId)) return child;
    })
    setChosenChild(chosenStudent[0]);
    props.updateStatus(pickupId, 'pickupReady')
  }

  useEffect (() => {
    console.log('PRINCIPALPICKUP useEffect: ', 'props.state ', props.state, 'props.allStudents ', props.allStudents);
  })

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

const mapStateToProps = state => ({
  state,
  allStudents: state.studentStore.students
})

export default connect(mapStateToProps, mapDispatchToProps)(PrincipalPickupPage);

// export default withRouter(PrincipalPickupPage);


// if studentList.studentID === pickupIdRef then student name will populate in <p> else === <div>
