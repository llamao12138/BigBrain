import React from 'react';
import PropTypes from 'prop-types';

function JoinGameForm ({ joinGame, ID }) {
  const [name, setName] = React.useState('');
  const [sessionID, setSessionID] = React.useState(ID);

  const processJoinGame = () => {
    joinGame(sessionID, name);
  };

  return (
    <>
      <label>Session ID: </label>
      <br />
      <input
        id='sessionID'
        type='sessionID'
        onChange={(e) => setSessionID(e.target.value)}
        aria-required='true'
        value={sessionID}
      />
      <br />
      <br />

      <label>Name: </label>
      <br />
      <input
        id='name'
        type='name'
        onChange={(e) => setName(e.target.value)}
        aria-required='true'
      />
      <br />

      <br />
      <button type='joinGame' onClick={processJoinGame}>
        Join Game!
      </button>
      <br />
    </>
  );
}

export default JoinGameForm;

JoinGameForm.propTypes = {
  joinGame: PropTypes.func,
  ID: PropTypes.number
};
