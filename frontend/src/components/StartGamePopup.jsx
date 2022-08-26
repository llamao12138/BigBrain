import Modal from '@material-ui/core/Modal';
import Box from '@mui/material/Box';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React from 'react';

// not used
const useStyles = makeStyles({
  popUp: {
    width: 300,
    height: 300,
    backgroundColor: 'white',
    opacity: [0.9, 0.8, 0.7],
    border: '1px dashed grey',
    margin: 'auto',
  },
  title: {
    fontSize: 14,
  },
});

function StartGamePopup ({
  sessionId,
  handleCloseSessionId,
  openSessionId,
  manageGame,
  handleClick,
}) {
  // const [openSessionId, setOpenSessionId] = React.useState(false);
  const classes = useStyles();

  return (
    <Modal
      aria-labelledby='id to join game'
      open={openSessionId}
      //  onClose={handleClose}
      className={classes.popUp}
    >
      <Box className={classes.popUp}>
        <div>
          <Typography id='sessionId' className={classes.big}>
            SessionID: {sessionId}
          </Typography>
          <Button id='shareBtn' onClick={handleClick}>
            Click To Share Link
          </Button>
          <Button id='closeBtn' size='small' onClick={handleCloseSessionId}>
            close
          </Button>
          <Button id='manageGameBtn' size='small' onClick={manageGame}>
            Advance
          </Button>
        </div>
      </Box>
    </Modal>
  );
}

export default StartGamePopup;

StartGamePopup.propTypes = {
  sessionId: PropTypes.number,
  handleCloseSessionId: PropTypes.func,
  openSessionId: PropTypes.number,
  manageGame: PropTypes.func,
  handleClick: PropTypes.func,
};
