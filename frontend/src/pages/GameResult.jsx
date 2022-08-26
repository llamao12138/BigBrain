import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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
  button: {
    margin: 'auto',
    width: '150px',
  },
});

const GameResult = (props) => {
  const classes = useStyles();
  const { sessionID } = useParams();
  const navigate = useNavigate();

  const getResults = async (sessionID) => {
    const token = localStorage.getItem('token');
    const response = await fetch(
      `http://localhost:5005/admin/session/${sessionID}/results`,
      {
        method: 'GET',
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
      return data.results;
    }
  };

  const getTopFive = (results) => {
    const playerScores = results.map((player) => {
      let score = 0;
      player.answers.forEach((answer) => {
        if (answer.correct) {
          score += 1;
        }
      });
      return {
        name: player.name,
        score: score + ' / ' + player.answers.length,
      };
    });
    const topFive = playerScores.sort((a, b) => b.score - a.score).slice(0, 5);
    return (
      <>
        {topFive.map((player) => {
          return (
            <p key = 'hi'>
              {player.name} - {player.score}
            </p>
          );
        })}
      </>
    );
  };

  /*
    Function to go through each players answers and get correct % for all questions
    and plot it
    */
  const getCorrectPercentage = (results) => {
    const questionLen = results[0].answers.length;
    const correctCountArray = [];
    results.forEach((player) => {
      for (let i = 0; i < questionLen; i++) {
        //  console.log(player.answers[i].correct)
        if (player.answers[i].correct) {
          correctCountArray[i]
            ? (correctCountArray[i] += 1)
            : (correctCountArray[i] = 1);
        }
      }
    });

    const correctPercentage = [];
    for (let i = 0; i < questionLen; i++) {
      correctPercentage.push({
        question_num: i + 1,
        percent_correct: (correctCountArray[i] / results.length) * 100,
      });
    }
    console.log(correctPercentage);

    const options = {
      responsive: true,
      title: {
        display: true,
        text: 'Percentage of Correct Answers',
        fontSize: 25,
      },
      legend: {
        display: false,
        position: 'right',
      },
    };

    return (
      <>
        <Bar
          options={options}
          data={{
            labels: correctPercentage.map((question) => question.question_num),
            datasets: [
              {
                label: 'Percentage of Correct Answers',
                data: correctPercentage.map(
                  (question) => question.percent_correct
                ),
                backgroundColor: 'rgba(20, 249, 32, 0.2)',
                borderColor: 'rgba(0, 255, 12, 1)',
                width: 1,
                borderWidth: 1,
              },
            ],
          }}
        />
      </>
    );
  };

  const getAvgTime = (results) => {
    const questionLen = results[0].answers.length;
    const totalTimeArray = [];
    results.forEach((player) => {
      for (let i = 0; i < questionLen; i++) {
        // console.log(player.answers[i].correct)
        const startedAt = new Date(player.answers[i].questionStartedAt);
        const answeredAt = new Date(player.answers[i].answeredAt);
        const timeToAnswer = (answeredAt - startedAt) / 1000;
        totalTimeArray[i]
          ? (totalTimeArray[i] += timeToAnswer)
          : (totalTimeArray[i] = timeToAnswer);
      }
    });
    const averageTimeArray = [];
    for (let i = 0; i < questionLen; i++) {
      averageTimeArray.push({
        question_num: i + 1,
        avg_time: totalTimeArray[i] / results.length,
      });
    }
    console.log(averageTimeArray);
    const options = {
      responsive: true,

      title: {
        display: true,
        text: 'Average Time to Answer',
        fontSize: 25,
      },
      legend: {
        display: false,
        position: 'right',
      },
    };

    return (
      <>
        <Bar
          options={options}
          data={{
            labels: averageTimeArray.map((question) => question.question_num),
            datasets: [
              {
                label: 'Average Time to Answer (in seconds)',
                data: averageTimeArray.map((question) => question.avg_time),
                backgroundColor: 'rgba(120, 249, 32, 0.2)',
                borderColor: 'rgba(90, 255, 12, 1)',
                width: 1,
                borderWidth: 1,
              },
            ],
          }}
        />
      </>
    );
  };

  let results = [];
  const [topFive, setTopFive] = React.useState([]);
  const [correctPercentage, setCorrectPercentage] = React.useState([]);
  const [avgTime, setAvgTime] = React.useState([]);
  // const [questionCount, setQuestionCount] = React.useState(0);
  React.useEffect(() => {
    getResults(sessionID).then((data) => {
      console.log(data);
      results = data;
      if (data.length < 1 || data.length === undefined) {
        setTopFive([]);
        setCorrectPercentage([]);
        setAvgTime([]);
        // setQuestionCount(0);
      } else {
        // setQuestionCount(results[0].answers.length);
        setTopFive(getTopFive(results));
        console.log(topFive);
        setCorrectPercentage(getCorrectPercentage(results));
        console.log(correctPercentage);
        setAvgTime(getAvgTime(results));
        console.log(avgTime);
      }
    });
  }, []);

  return (
    <div>
      <Button
        variant='contained'
        color='primary'
        className={classes.button}
        onClick={() => navigate('/admin/quiz')}
      >
        {' '}
        Back to Dashboard
      </Button>
      <h1>Results</h1>
      <div className={classes.root}>
        <h5>Top 5</h5>
        <p>Name - Score</p>
        {topFive}

        <h5>Correct Percentage</h5>
        {correctPercentage}
        <h5>Average Time to Answer</h5>
        {avgTime}
      </div>
    </div>
  );
};

export default GameResult;
