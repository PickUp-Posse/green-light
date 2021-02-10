import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
//import FormGroup from '@material-ui/core/FormGroup';
//import Input from '@material-ui/core/Input';
import { withRouter } from 'react-router-dom';
import superagent from 'superagent';
import io from 'socket.io-client';
import { connect } from 'react-redux';
// import { populateStudents, updateStatus } from '../store/students-reducer.js';

// const mapDispatchToProps = { populateStudents, updateStatus };

const TeacherPage = (props) => {
  const [name, setName] = useState('');
  const [classRoster, setClassRoster] = useState([]);
  const teacherNameRef = React.createRef();
  const updateStudent = () => {
    console.log('Clicked on registration')
    props.history.push('/dataEntry');

  }
  const classList = async (e) => {
    e.preventDefault();
    const teacherName = teacherNameRef.current.value;
    console.log('TEACHER NAME: ', teacherName);
    // const host = io('http://localhost:3001', { transports: ['websocket'] });
    // const principal = io.connect(host);
    // principal.emit('connection');
    let students = await superagent.get('https://parent-pickup-coordinator.herokuapp.com/student')
      .then(response => {
        return response.body;
      })
      .catch(err => {
        console.error(err);
      });
    console.log('Line 31 students', students);
    // eslint-disable-next-line array-callback-return
    let filteredStudents = students.filter((item) => {
      if (item.teacher === teacherName) {
        return item;
      }
    })
    setClassRoster(filteredStudents);
    console.log('Line 33: Whats happening?', filteredStudents);
  }

  const searchName = (e) => {
    console.log(e.target.value);
    let teacherName = e.target.value;
    setName(teacherName);
  }

  const studentReleased = (studentID) => {
    console.log('TODO: make magic happen like a check mark');

  }
  // useEffect() => {

  // }
  return (

    <>
      { console.log('inside return', classRoster)}
      <Button onClick={updateStudent}>Update Student</Button>

      <form onSubmit={classList}>
        <input onChange={searchName} type='text' ref={teacherNameRef} />
        <Button type='submit'>Submit</Button>
      </form>
      <div>
        {classRoster.map((student, idx) => (
          <div key={idx}>
            <p onClick={studentReleased}>{student.name}</p>
          </div>
        ))}

      </div>
    </>
  )
}

const mapStateToProps = state => ({
  state,
  allStudents: state.studentStore.students
})

export default connect(mapStateToProps)(TeacherPage);

// export default withRouter(TeacherPage);