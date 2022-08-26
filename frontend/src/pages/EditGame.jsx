import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import { useNavigate, useParams } from 'react-router-dom';
import ListQuestion from '../components/ListQuestion';

const useStyles = makeStyles({
  root: {
    minWidth: 200,
  },
  title: {
    ontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  form: {
    textAlign: 'left',
    margin: '10px',
  },
  button: {
    margin: '30px',
    width: '150px'
  },
  deleteButton: {
    margin: '5px 0 40px 0',
  },

});
/*
Function to load the quiz data from the server
*/
const loadQuiz = async (quizid) => {
  const token = localStorage.getItem('token')
  const response = await fetch(`http://localhost:5005/admin/quiz/${quizid}`, {
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
    return data
  }
}
// Function to delete the quiz from the server
const deleteQuestion = async (quiz, quizID, questionID) => {
  const questions = quiz.questions;
  // delete questions[questionID];
  questions.splice(questionID, 1);
  const token = localStorage.getItem('token')
  const response = await fetch(`http://localhost:5005/admin/quiz/${quizID}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      questions: questions,
      name: quiz.name,
      thumbnail: quiz.thumbnail,
    })
  })
  const data = await response.json();
  if (data.error) {
    alert(data.error)
  } else {
    console.log(data)
  }
}

const EditGame = () => {
  const classes = useStyles();
  const gameID = useParams().gameID

  // For reference, this is the data structure for a quiz
  const quizTemplate = {
    questions: [
      {}
    ],
    createdAt: '',
    name: '',
    thumbnail: '',
    owner: '',
    active: null,
    oldSessions: [

    ]
  };

  const [quiz, setQuiz] = React.useState(quizTemplate);
  const [ifDelete, setifDelete] = React.useState(false);
  const [thumbnail, setThumbnail] = React.useState('');
  const [quizname, setQuizname] = React.useState(quiz.name)

  // Quiz data is loaded from the server
  React.useEffect(() => {
    const getQuiz = async (gameID) => {
      setQuiz(await loadQuiz(gameID))
    }
    getQuiz(gameID)
  }, [ifDelete])

  // Navigate to the edit question page
  const navigate = useNavigate();
  const newQuestion = (quiz, gameID) => {
    navigate('/editGame/' + gameID + '/' + parseInt(quiz.questions.length), { state: { quiz: quiz } })
  }
  // Saving changes to the quiz
  const handleSave = async () => {
    const token = localStorage.getItem('token')
    const response = await fetch(`http://localhost:5005/admin/quiz/${gameID}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        questions: quiz.questions,
        name: quizname,
        thumbnail: thumbnail,
      })
    })
    const data = await response.json();
    if (data.error) {
      alert(data.error)
    } else {
      console.log(data)
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = reader.result;
      console.log(base64);
      setThumbnail(base64);
    };
  }
  // Thumbnails displayed in the edit page
  const thumbnailDisplay = () => {
    if (thumbnail === '') {
      return (
        <Typography variant="h6" className={classes.title} color="textSecondary" gutterBottom>
          {'No thumbnail'}
        </Typography>
      )
    } else {
      return (
        <img src={thumbnail} alt="thumbnail" style={{ width: '400px' }} />
      )
    }
  }
  return (
      <>
      <Card className={classes.root}>
        <Button variant='contained' className={classes.button} onClick={() => navigate('/admin/quiz')}> Back</Button>
        <CardContent>
          <Typography variant='h3' color='textSecondary' gutterBottom>
              Edit Game: {quiz.name}
          </Typography>
        <FormGroup>
          <TextField
              id='outlined-basic'
              label='Quiz Name'
              variant='outlined'
              className={classes.form}
              value={quizname}
              onChange={(e) => setQuizname(e.target.value)} />
          {thumbnailDisplay()}
          <input
              type='file'
              onChange={handleFileChange}
              accept='image/*'
          />
          <Button variant='contained' className={classes.button} onClick ={handleSave}>Save</Button>
          <hr/>
          <Typography variant='h6' color='textSecondary'>
              Add/Edit Questions:
          </Typography>
          <Button
              key={'add-question' + gameID}
              variant='contained'
              className={classes.button}
              color='primary'
              onClick={() => newQuestion(quiz, gameID)}> + Add question
          </Button>
          <>
              {
              quiz.questions.map((question, index) => (
               <>
               <ListQuestion key={'qn' + index} question={question} questionID={index} quizID={gameID} quiz={quiz}/>
               <Button key={'button' + index} variant='contained'
                className={classes.deleteButton}
                color='secondary'
                onClick={() => {
                  deleteQuestion(quiz, gameID, index)
                  setifDelete(!ifDelete)
                }}>
                Delete </Button>
               </>
              ))}
          </>
        </FormGroup>
        </CardContent>
      </Card>
      </>
  )
}

export default EditGame;
