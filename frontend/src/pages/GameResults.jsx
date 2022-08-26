import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    minWidth: 200,
  },
  button: {
    margin: 'auto',
    width: '150px'
  }
});

const getOldSession = async (quizID) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`http://localhost:5005/admin/quiz/${quizID}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  if (data.error) {
    alert(data.error)
  } else {
    console.log(data)
    return data.oldSessions
  }
}
const GameResults = () => {
  const quizID = useParams().id;
  const [oldSessions, setOldSessions] = React.useState([]);
  const classes = useStyles();
  const getSessionButtons = (oldSessions) => {
    const navigate = useNavigate();
    const buttons = []
    for (let i = 0; i < oldSessions.length; i++) {
      buttons.push(
        <>
        <Button
          variant="contained"
          className={classes.button}
          key={i}
          onClick={() => {
            navigate('/admin/quiz/' + oldSessions[i])
          }
        }> Results for Session: {oldSessions[i]} </Button>
        <hr/>
        </>
      )
    }
    return buttons
  }
  React.useEffect(() => {
    getOldSession(quizID).then((data) => {
      setOldSessions(data);
    });
  }, []);
  return (
    <div>
      <h1>Results for Quiz: {quizID}</h1>
      <h2>All Sessions</h2>
      {getSessionButtons(oldSessions)}
    </div>
  )
}
export default GameResults;
