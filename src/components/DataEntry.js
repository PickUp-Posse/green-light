import React from 'react';
import Button from '@material-ui/core/Button';
import superagent from 'superagent';



const DataEntry = (props) => {
  const getAll = () => {
    console.log('inside dataEntry');
    superagent.get('https://parent-pickup-coordinator.herokuapp.com/student')
      .then(response => {
        console.log('Line 11 response body', response.body);
      })
  }
  const getOneStudent = (id) => {
    console.log('inside dataEntry');
    superagent.get(`https://parent-pickup-coordinator.herokuapp.com/student/${id}`)
      .then(response => {
        console.log('Line 11 response body', response.body);
      })
  }
  const updateOneStudent = (id) => {
    console.log('inside dataEntry');
    superagent.put(`https://parent-pickup-coordinator.herokuapp.com/student/${id}`)
      .send({

        "name": "Lenard",
        "studentID": 1,
        "grade": 5,
        "teacher": "Mrs. Rosemary",
        "parents": ["Nancy", "Kasey"],
        "busRoute": 807,
        "district": 819,
        "schoolName": "Coe Elementary"
      })
      .then(response => {
        console.log('Line 11 response body', response.body);
      })
  }
  const addOneStudent = () => {
    console.log('inside dataEntry');
    superagent.post('https://parent-pickup-coordinator.herokuapp.com/student/')
      .send({
        "name": "mr. Whiskers",
        "studentID": 5,
        "grade": 5,
        "teacher": "Mrs. Flower",
        "parents": ["Nancy", "Kasey"],
        "busRoute": 809,
        "district": 8,
        "schoolName": "Coe Elementary"
      })
      .then(response => {
        console.log('Line 11 response body', response.body);
      })
  }
  const deleteOneStudent = (id) => {
    console.log('inside dataEntry');
    superagent.delete(`https://parent-pickup-coordinator.herokuapp.com/student/${id}`)
      .then(response => {
        console.log('Line 11 response body', response.body);
      })
  }
  return (
    <div>
      <Button size="small" color="primary" onClick={getAll}>Get All Students</Button>
      <Button size="small" color="primary" onClick={() => getOneStudent('6021c73fe34438826ffb65d0')}>One Student</Button>
      <Button size="small" color="primary" onClick={() => updateOneStudent('6021cb7e516cc7085e551726')}>Make Student Change</Button>
      <Button size="small" color="primary" onClick={addOneStudent}>Add Student</Button>
      <Button size="small" color="primary" onClick={() => deleteOneStudent('6021cb7e516cc7085e551726')}>Delete Student</Button>
    </div>
  )
}

export default DataEntry;


// change out ids
// search with studentID