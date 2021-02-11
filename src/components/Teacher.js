import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
//import FormGroup from '@material-ui/core/FormGroup';
//import Input from '@material-ui/core/Input';
import { withRouter } from 'react-router-dom';
import superagent from 'superagent';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { populateStudents, updateStatus } from '../store/students-reducer.js';

const mapDispatchToProps = { populateStudents, updateStatus };

const TeacherPage = (props) => {
  const [name, setName] = useState('');
  // const [classRoster, setClassRoster] = useState([]);
  const teacherNameRef = React.createRef();
  const host = io.connect('http://localhost:3001', { transports: ['websocket'] });
  
  host.on('pickupready', (payload) => {
    console.log('this is the pickup on teacherPage, student:', payload.name);
    props.updateStatus(payload.studentID, payload.studentStatus);
  })

  const updateStudent = () => {
    props.history.push('/dataEntry');
  }
  const classList = async (e) => {
    e.preventDefault();
    const teacherName = teacherNameRef.current.value;
    // console.log('TEACHER NAME: ', teacherName);
    joinRoom(teacherName);
    let students = await superagent.get('https://parent-pickup-coordinator.herokuapp.com/student')
      .then(response => {
        return response.body;
      })
      .catch(err => {
        console.error(err);
      });
    // eslint-disable-next-line array-callback-return
    let filteredStudents = students.filter((item) => {
      if (item.teacher === teacherName) {
        return item;
      }
    })
    // setClassRoster(filteredStudents);
    props.populateStudents(filteredStudents);
  }

  const searchName = (e) => {
    // console.log(e.target.value);
    let teacherName = e.target.value;
    setName(teacherName);
  }

  const joinRoom = (teacherName) => {
    // const host = io.connect('http://localhost:3001', { transports: ['websocket'] });
    host.emit('joinRoom', (teacherName));
    console.log(`${teacherName} has joined a room`);
  }

  const studentReleased = (student) => {
    // console.log('TODO: make magic happen like a check mark');
    console.log('TEACHER studentReleased: ', {student});
    //Match to teacher
    student.studentStatus = 'releasedFromClass';
    console.log('TEACHER studentReleased: updatedStatus ', {student});
    props.updateStatus(student.ID, student.studentStatus);
    let teacher = student.teacher;
    //TODO: Use teacher to send socket message, use sibTeachers to send socket message
    host.emit('sendingstudent', student);

  }

  useEffect(() => {
    console.log('TEACHER useEffect: ', 'props.classRoster', props.classRoster);
  })

  return (

    <>
      {/* { console.log('inside return', classRoster)} */}
      <Button onClick={updateStudent}>Update Student</Button>

      <form onSubmit={classList}>
        <input onChange={searchName} type='text' ref={teacherNameRef} />
        <Button type='submit'>Submit</Button>
      </form>
      <div>
        {props.classRoster.map((student, idx) => (
          <div key={idx}>
            <p onClick={() => studentReleased(student)}>{student.name}</p>
          </div>
        ))}

      </div>
    </>
  )
}

const mapStateToProps = state => ({
  state,
  classRoster: state.studentStore.students
})

export default connect(mapStateToProps, mapDispatchToProps)(TeacherPage);

// export default withRouter(TeacherPage);