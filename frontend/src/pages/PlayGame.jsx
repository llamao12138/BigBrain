import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import useInterval from './useInterval';
import cat from './cat.gif';

// page which the player is on when they are playing games.
// Displays questions, multiple choice answers, and count down timer
// When timer is up, displays correct answers
function PlayGame () {
  const { playerID } = useParams();
  const [question, setQuestion] = React.useState('');
  const [answers, setAnswers] = React.useState('');
  const [checked, setChecked] = React.useState([]);
  const [correctAnswer, setCorrectAnswer] = React.useState('');
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = React.useState('');
  const [timeStart, setTimeStart] = React.useState('');
  const [duration, setDuration] = React.useState('');
  const [gameInProgress, setGameInProgress] = React.useState('');
  const [ifEnded, setIfEnded] = React.useState(false);
  const [catVisible, setCatVisible] = React.useState(true);

  const imgStyle = {
    width: '100%',
    height: '100%',
  };

  let checkedInfo = [];

  const handleChange = async (index) => {
    index = parseInt(index);
    console.log(checkedInfo);
    checkedInfo[index] = !checkedInfo[index];
    console.log(checkedInfo);
    await setChecked(checkedInfo);
    console.log(checked);
    // store index of all true values
    const correct = [];
    for (let i = 0; i < checkedInfo.length; i++) {
      if (checkedInfo[i]) correct.push(i);
    }
    console.log(correct);
    if (correct.length === 0) {
      return;
    }
    console.log({ answerIds: correct });
    const response = await fetch(
      `http://localhost:5005/play/${playerID}/answer`,
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ answerIds: correct }),
      }
    );
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      console.log(data);
    }
  };

  // poll backend and see if the admin as advanced the question
  useInterval(() => {
    const getQuestion = async () => {
      const response = await fetch(
        `http://localhost:5005/play/${playerID}/question`,
        {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
          },
        }
      );
      const data = await response.json();
      if (data.error) {
        // if game ended, display result
        if (ifEnded) {
          navigate('/play/' + playerID + '/results');
        }
        setGameInProgress('Please Wait for Host to start game');
        setCatVisible(true)
      } else if (data.question.question === question.question) {
        // if same question as before, just update timer, no need to update question
        setCatVisible(false)
        console.log(data.question.question);
        // console.log('HI')
        const started = new Date(timeStart);
        const curTime = new Date();
        const timeLapse = curTime - started;
        const left = (duration - timeLapse) / 1000;
        if (left >= 0) {
          setTimeLeft(`Time Left: ${left}`);
        } else {
          const response = await fetch(
            `http://localhost:5005/play/${playerID}/answer`,
            {
              method: 'GET',
              headers: {
                'Content-type': 'application/json',
              },
            }
          );
          const data = await response.json();
          if (data.error) {
            alert(data.error);
          } else {
            setCorrectAnswer(
              `Correct Answers: ${JSON.stringify(data.answerIds)}`
            );
          }
        }
      } else {
        // otherwise, change the question that is displayed
        if (data.question.question === question.question) {
          return;
        }
        console.log(question);
        setIfEnded(true);
        setGameInProgress('');
        setAnswers('');
        setCorrectAnswer('');

        console.log(data);
        checkedInfo = [];
        for (let i = 0; i < data.question.answers.length; i++) {
          checkedInfo.push(false);
        }
        setChecked(checkedInfo);

        setQuestion(data.question);
        const list = data.question.answers.map((answer, index) => {
          return (
            <FormControlLabel
              key ='hi'
              control={
                <Checkbox
                  id={data.question + index}
                  onChange={() => handleChange(index)}
                  value={index.toString()}
                  color='primary'
                />
              }
              label={answer}
            />
          );
        });
        setAnswers(list);
        setDuration(data.question.duration * 1000);
        console.log(data.question);
        console.log(duration);
        setTimeStart(data.question.isoTimeLastQuestionStarted);
        const started = new Date(timeStart);
        const curTime = new Date();
        const timeLapse = curTime - started;
        setTimeLeft(`Time Left: ${(duration - timeLapse) / 1000}`);
      }
    };
    getQuestion();
  }, 1000);

  return (
    <>
      <h1>{question.question}</h1>
      <ul>{answers}</ul>
      <br />
      {gameInProgress}
      <br />
      {timeLeft}
      <br />
      {correctAnswer}

      {
        catVisible &&
        <img
            src = {cat}
            style={imgStyle}
            alt = {'a very cute cat relaxing'}
        />
      }
    </>
  );
}

export default PlayGame;
