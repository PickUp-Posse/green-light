import React from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import './IndexPage.scss';
import Image from './assets/classroom.PNG';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';


const styles = {
  paperContainer: {
    backgroundImage: `url(${Image})`,

  }
};

const IndexPage = (props) => {

  const signUpHandler = () => {
    console.log('Clicked on signup')
    props.history.push('/signup');

  }
  const signInHandler = () => {
    console.log('Clicked on signin')
    props.history.push('/signin');

  }
  // const image = () => {
  //   const classes = useStyles();

  const classes = useStyles();


  return (
    <>
      <Paper id="background-image" style={styles.paperContainer}>



        <Card id="card-image" variant="outlined">
          <CardContent>

            <CardActions>
              <Button className={classes.root} onClick={signUpHandler}>Sign up</Button>
              <Button className={classes.root} onClick={signInHandler}>Sign in</Button>

            </CardActions>
          </CardContent>

        </Card>


      </Paper>


    </>
  )
}

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #2A3EB1 10%, #2C387E 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .5)',
    color: 'white',
    height: 48,
    padding: '0 30px',
    // margin: spacing(1),
  },
});


export default withRouter(IndexPage);