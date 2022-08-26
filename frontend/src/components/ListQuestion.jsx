import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

// List questions in Edit game page
const ListQuestion = (props) => {
  const classes = makeStyles({
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
  });
  const navigate = useNavigate();

  const questionID = props.questionID;
  const question = props.question.question;
  console.log('Navigation options');
  console.log(props);

  const editQuestion = (props) => {
    navigate('/editGame/' + props.quizID + '/' + props.questionID, {
      state: props,
    });
  };

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <Typography
            className={classes.title}
            color='textSecondary'
            gutterBottom
          >
            Question {parseInt(questionID + 1)}
          </Typography>
          <Grid item xs={12}>
            <Typography
              className={classes.pos}
              color='textSecondary'
              marginLeft={1}
            >
              {question}
            </Typography>
          </Grid>
        </CardContent>
        <CardActions>
          <Button
            size='small'
            color='primary'
            onClick={() => editQuestion(props)}
          >
            Edit
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default ListQuestion;

ListQuestion.propTypes = {
  questionID: PropTypes.number,
  question: PropTypes.object,
  quizID: PropTypes.string,
}
