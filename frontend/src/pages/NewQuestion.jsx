import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import AnswerFields from '../components/AnswerFields';

const useStyles = makeStyles({
  root: {
    minWidth: 200,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  form: {
    textAlign: 'left',
  },
  textField: {
    width: 200,
  },
});

// New question page (very similar to EditQuestion)
const NewQuestion = (props) => {
  const classes = useStyles();
  const params = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const quiz = state.quiz;
  const quizID = params.gameID;
  const questionID = params.questionID;

  const [questionDesc, setQuestionDesc] = React.useState('');
  const [duration, setDuration] = React.useState('');
  const [points, setPoints] = React.useState('');
  const [url, setUrl] = React.useState('');
  const [answers, setAnswers] = React.useState([]);
  const [questionType, setQuestionType] = React.useState('single-choice');

  const handleSave = async () => {
    const question = {
      question: questionDesc,
      duration: duration,
      points: points,
      url: url,
      answers: answers,
    };
    const questions = quiz.questions;
    questions[questionID] = question;
    const token = localStorage.getItem('token');
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
      }),
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      console.log(data);
      console.log('Question updated');
    }
  };

  return (
    <div>
      <Button
        variant='contained'
        color='primary'
        onClick={() => navigate(`/editGame/${quizID}`)}
      >
        Back
      </Button>
      <Card>
        <CardContent>
          <Typography
            className={classes.title}
            color='textSecondary'
            gutterBottom
          >
            Question {parseInt(questionID) + 1}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                id='question'
                label='Question'
                multiline
                value={questionDesc}
                onChange={(event) => setQuestionDesc(event.target.value)}
                className={classes.textField}
                margin='normal'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id='questionType'
                select
                label='Question Type'
                value={questionType}
                onChange={(event) => setQuestionType(event.target.value)}
                className={classes.textField}
                SelectProps={{
                  native: true,
                }}
                helperText='Please select question type'
                margin='normal'
              >
                <option value='single-choice'>Single Choice</option>
                <option value='multiple-choice'>Multiple Choice</option>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id='duration'
                label='Duration'
                value={duration}
                onChange={(event) => setDuration(event.target.value)}
                className={classes.textField}
                margin='normal'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id='points'
                label='Points'
                value={points}
                onChange={(event) => setPoints(event.target.value)}
                className={classes.textField}
                margin='normal'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id='url'
                label='URL'
                value={url}
                onChange={(event) => setUrl(event.target.value)}
                className={classes.textField}
                margin='normal'
              />
            </Grid>
            <Grid item xs={12}>
              <AnswerFields
                questionType={questionType}
                answers={answers}
                setAnswers={setAnswers}
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button size='small' onClick={handleSave}>
            Save
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default NewQuestion;
