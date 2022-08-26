import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  root: {
    minWidth: 200,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  popUp: {
    width: 400,
    height: 300,
    backgroundColor: 'white',
    opacity: [0.9, 0.8, 0.7],
    border: '1px solid grey',
    margin: 'auto',
  },
  big: {
    fontSize: 30,
    margin: '20px',
  },
  buttons: {
    margin: '10px',
    minWidth: '90px',
  },
  text: {
    textDecoration: 'underline',
    margin: '20px',
    fontWeight: 'bold',
    fontSize: '20px',
  }
});

export default function OutlinedCard ({
  quiz,
  toEdit,
  getResults,
  getAllResults,
}) {
  const [openSessionId, setOpenSessionId] = React.useState(false);
  const [sessionId, setSessionId] = React.useState('');
  const [gameText, setGameText] = React.useState('Click To Start Game');
  const [openEndWindow, setOpenEndWindow] = React.useState(false);
  const [stage, setStage] = React.useState(-1);
  const classes = useStyles();
  const token = localStorage.getItem('token');
  const [duration, setDuration] = React.useState(0);
  const [questionNum, setQuestionNum] = React.useState(0);

  const getDuration = async (quiz) => {
    let questions = []
    const response = await fetch(`http://localhost:5005/admin/quiz/${quiz.id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      questions = data.questions;
    }
    let duration = 0;
    questions.forEach(question => {
      duration += parseInt(question.duration);
    });
    // if duration Nan
    if (isNaN(duration)) {
      duration = 0;
    }
    const questionNum = questions.length;
    return { duration, questionNum };
  }

  const startOrEndGame = () => {
    if (gameText === 'Click To Start Game') {
      startGame();
      setGameText('Click To End Game');
    } else {
      endGame();
      setGameText('Click To Start Game');
    }
  };

  const startGame = async () => {
    if (sessionId !== '') {
      handleOpenSessionId();
      return;
    }
    const response = await fetch(
      `http://localhost:5005/admin/quiz/${quiz.id}/start`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    if (data.error) {
      alert(data.error);
      return;
    }
    const response2 = await fetch(
      `http://localhost:5005/admin/quiz/${quiz.id}`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data2 = await response2.json();
    if (data2.error) {
      alert(data2.error);
    } else {
      setSessionId(data2.active);
      handleOpenSessionId();
      console.log(data2.active);
    }
  };

  const endGame = async () => {
    // get session id from request
    const response2 = await fetch(
      `http://localhost:5005/admin/quiz/${quiz.id}`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data2 = await response2.json();
    if (data2.error) {
      alert(data2.error);
    } else {
      setSessionId(data2.active);
      console.log(data2.active);
    }
    const response = await fetch(
      `http://localhost:5005/admin/quiz/${quiz.id}/end`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      setOpenEndWindow(true);
      //  setSessionId('')
    }
  };
  const handleAllResults = () => {
    getAllResults(quiz.id);
  };

  const handleGameResult = () => {
    console.log('going to session');
    console.log(sessionId);
    getResults(quiz, sessionId);
    // setSessionId('')
  };

  const handleOpenSessionId = () => {
    setOpenSessionId(true);
  };

  const handleCloseSessionId = () => {
    setOpenSessionId(false);
  };

  const handleCloseEndWindow = () => {
    setOpenEndWindow(false);
    setSessionId('');
  };

  const handleClick = () => {
    navigator.clipboard.writeText(
      `http://localhost:3000/play/join/${sessionId}`
    );
  };

  const manageGame = async () => {
    const response = await fetch(
      `http://localhost:5005/admin/quiz/${quiz.id}/advance`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      console.log(data);
      setStage(data.stage);
    }
  };

  getDuration(quiz).then(res => {
    setDuration(res.duration);
    setQuestionNum(res.questionNum);
  });

  return (
    <Card className={classes.root} variant='outlined' id='outsideCard'>
      <div></div>
      <CardContent>
        <Typography
          className={classes.title}
          color='textSecondary'
          gutterBottom
        >
          {quiz.id}
        </Typography>
        <Typography variant='h5' component='h2' id='title'>
          {quiz.name}
        </Typography>
        <img src={quiz.thumbnail} />
        <Typography className={classes.pos} color='textSecondary'>
          Questions : {questionNum}
        </Typography>
        <Typography variant='body2' component='p'>
          Duration: {duration} seconds
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          id='toEdit'
          className={classes.buttons}
          variant='contained'
          size='small'
          color='primary'
          onClick={toEdit}
        >
          Edit
        </Button>
        <Button
          id='startOrEndBtn'
          className={classes.buttons}
          variant='contained'
          size='small'
          color='primary'
          onClick={startOrEndGame}
        >
          {gameText}
        </Button>
        <Button
          id='allResults'
          className={classes.buttons}
          variant='contained'
          size='small'
          color='primary'
          onClick={handleAllResults}
        >
          All Results
        </Button>
      </CardActions>

      <Modal
        aria-labelledby='id to join game'
        open={openSessionId}
        //  onClose={handleClose}
        className={classes.popUp}
      >
        <Box className={classes.popUp}>
          <div>
            <Typography className={classes.big}>
              SessionID: {sessionId}
            </Typography>
            <Button
            variant="contained"
            className={classes.buttons}
            onClick={handleClick}>Click To Copy Link</Button>
            <Button
            variant="contained"
            className={classes.buttons}
            size='small' onClick={manageGame}>
              Advance
            </Button>
            <Typography className={classes.text}>
              Stage: {stage}</Typography>
            <hr/>
            <Button
            variant="contained"
            className={classes.buttons}
            color="secondary"
            onClick={handleCloseSessionId}>
              close
            </Button>
          </div>
        </Box>
      </Modal>

      <Modal
        aria-labelledby='end Game Window'
        open={openEndWindow}
        //  onClose={handleClose}
        className={classes.popUp}
      >
        <Box className={classes.popUp}>
          <div>
            <Typography className={classes.big}>
              Would You Like to See Results?
            </Typography>
            <Button size='small'
              variant="contained"
              className={classes.buttons}
              onClick={handleGameResult}>
              Yes
            </Button>
            <Button size='small'
              variant="contained"
              color="secondary"
              className={classes.buttons}
              onClick={handleCloseEndWindow}>
              close
            </Button>
          </div>
        </Box>
      </Modal>
    </Card>
  );
}

OutlinedCard.propTypes = {
  quiz: PropTypes.object,
  toEdit: PropTypes.func,
  getResults: PropTypes.func,
  getAllResults: PropTypes.func
};
