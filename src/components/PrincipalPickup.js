import React, { useEffect, useState } from 'react';
import superagent from 'superagent';
import io from 'socket.io-client';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { populateStudents, updateStatus } from '../store/students-reducer.js';
// ~~~~~~~~~~~~~this is the test run stuff~~~~~~~~~~~~~
// import http from 'http';
// import express from 'express';
// // Express app setup
// const app = express();
// const server = http.createServer(app);
// server.listen(3001);
// server.on('listening', () => {
//   console.log('Server is listening on port: 3001');
// });
/// ~~~~~~~~~~end of test run stuff~~~~~~~~~~~~~~~~~


const mapDispatchToProps = { populateStudents, updateStatus };

const PrincipalPickupPage = (props) => {
  // const [studentList, setStudentList] = useState([]);
  const [chosenChild, setChosenChild] = useState({});
  const pickupIdRef = React.createRef();
  // const host = io('http://localhost:3001', { transports: ['websocket'] });
  // const principal = io.connect(host);
  // useEffect(() => {
  //   async function fetchData() {
      // const host = io('http://localhost:3001', { transports: ['websocket'] });
      // const principal = io.connect(host);
      // principal.emit('connection');
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

  const sendStudent = (student) => {
    console.log('PRINCIPALPICKUP sendStudent: ', 'studentID ', student.studentID);
    //Match to teacher
    let teacher = student.teacher;
    console.log('PRINCIPALPICKUP sendStudent: ', 'teacher ', teacher);
    //Get sibling ID's
    let siblings = student.siblings;
    //if siblings exist, get all teachers /////////////NOT SURE IF THIS NEXT PIECE OF LOGIC WORKS!!!
    // let sibTeachers = [];
    // if(siblings){
    //   let numSiblings = siblings.length;
    //   for (let i=0; i<numSiblings; i++){
    //     props.allStudents.filter(student => {
    //       if(student.studentID === siblings[i]){
    //         return sibTeachers.push[student.teacher];
    //       }
    //     })
    //   }
    // }
    // console.log('PRINCIPALPICKUP sendStudent: ', {sibTeachers});


    //TODO: Use teacher to send socket message, use sibTeachers to send socket message
    console.log('student', student);
    const host = io.connect('http://localhost:3001', { transports: ['websocket'] });
    host.on('connection', () => {
      console.log('principal connecting')
    })
    // const principal = io.connect(`${host}/principal`); //connecting 
    // principal.emit('connection');
    host.emit('pickupready', student);
    props.history.push('/principal');

  }

//   useEffect (() => {
//     console.log('PRINCIPALPICKUP useEffect: ', 'props.state ', props.state, 'props.allStudents ', props.allStudents);
//     // const host = io('http://localhost:3001');
    
//     const host = io("http://localhost:3001", {
//       // { 
//         transports: ['websocket'] 
//     // }
//       // withCredentials: true,
//       // extraHeaders: {
//       //   "my-custom-header": "1234"
//   // }
// })
  //   const genPrincipal = io.connect(host);
  //   const principal = io.connect(`${host}/principal`);
  //   principal.emit('pickupready');
  //   genPrincipal.emit('pickupready');
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  return (
    <>
      { console.log('inside return', chosenChild)}
      <form onSubmit={pickUpStudent}>
        <input type='text' ref={pickupIdRef} />
        <Button type='submit'>Submit</Button>
      </form>
      <div>
        <Button onClick={()=> sendStudent(chosenChild)}>Send out: {chosenChild.name}</Button>
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
