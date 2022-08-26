import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@mui/material/Card';
import { Grid } from '@material-ui/core';
import { TextField } from '@mui/material';
import PropTypes from 'prop-types';

const Question = (props) => {
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
      width: 300,
      height: 300,
      backgroundColor: 'white',
      opacity: [0.9, 0.8, 0.7],
      border: '1px dashed grey',
      margin: 'auto',
    },
    big: {
      fontSize: 30,
    },
  });

  const classes = useStyles();
  const questionId = props.questionID;
  const [question, setQuestion] = React.useState(props.question.question);
  const [questionType, setQuestionType] = React.useState(props.questionType);
  const [duration, setDuration] = React.useState(props.duration);
  const [points, setPoints] = React.useState(props.points);
  // const [url, setUrl] = React.useState(props.url);
  // const [answers, setAnswers] = React.useState(props.answers);

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };
  const handleQuestionTypeChange = (event) => {
    setQuestionType(event.target.value);
  };
  const handleDurationChange = (event) => {
    setDuration(event.target.value);
  };
  const handlePointsChange = (event) => {
    setPoints(event.target.value);
  };
  /*
  const handleAnswersChange = (event) => {
    setAnswers(event.target.value);
  };
  */
  console.log(question);

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <Typography
            className={classes.title}
            color='textSecondary'
            id='questionId'
            gutterBottom
          >
            Question {questionId}
          </Typography>
          <Grid item xs={12}>
            <TextField
              id='question'
              label='Question'
              multiline
              value={question}
              onChange={handleQuestionChange}
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
              onChange={handleQuestionTypeChange}
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
              onChange={handleDurationChange}
              className={classes.textField}
              margin='normal'
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id='points'
              label='Points'
              value={points}
              onChange={handlePointsChange}
              className={classes.textField}
              margin='normal'
            />
          </Grid>
        </CardContent>
        <CardActions>
          <Button size='small' color='primary'>
            Save
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default Question;

Question.propTypes = {
  questionID: PropTypes.number,
  question: PropTypes.obj,
  questionType: PropTypes.string,
  duration: PropTypes.string,
  points: PropTypes.string,
  url: PropTypes.string,
  answers: PropTypes.obj,
};
