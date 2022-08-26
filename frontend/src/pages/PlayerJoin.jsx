import React from 'react';
import JoinGameForm from '../components/JoinGameForm';
import { useNavigate, useParams } from 'react-router-dom';

// the page that new players land on when they copy link, has field with game id(prefilled) and name
function PlayerJoin () {
  const { sessionID } = useParams();
  const navigate = useNavigate();

  const joinGame = async (sessionID, name) => {
    const response = await fetch(
      `http://localhost:5005/play/join/${sessionID}`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          name,
        }),
      }
    );
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      console.log(data.playerId);
      navigate(`/play/${data.playerId}`);
    }
  };

  return (
    <>
      <h1>Join A Big Brain Game!</h1>
      <JoinGameForm joinGame={joinGame} ID={sessionID} />
    </>
  );
}

export default PlayerJoin;
