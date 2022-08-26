import React from 'react';
import { useParams } from 'react-router-dom';

const getResults = async (playerid) => {
  const response = await fetch(
    `http://localhost:5005/play/${playerid}/results`,
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
    console.log(data);
    return data;
  }
};

const PlayerResult = () => {
  const playerID = useParams().playerID;
  console.log(playerID);
  const displayResults = (results) => {
    const answerCount = results.length;
    let score = 0;
    const resBox = results.map((result, index) => {
      if (result.correct) {
        score += 1;
      }
      return (
        <li key={index}>
          {index + 1}. {result.correct ? 'Correct' : 'Incorrect'}
        </li>
      );
    });

    return (
      <div>
        <h2>Results for player: {playerID}</h2>
        <h3>
          {score}/{answerCount}
        </h3>
        <ul>{resBox}</ul>
      </div>
    );
  };

  const [display, setDisplay] = React.useState([]);
  React.useEffect(() => {
    getResults(playerID).then((data) => {
      setDisplay(displayResults(data));
    });
  }, []);

  return <div>{display}</div>;
};
export default PlayerResult;
