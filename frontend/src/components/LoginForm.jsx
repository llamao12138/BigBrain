import React from 'react';
import PropTypes from 'prop-types';
// import { useNavigate } from 'react-router-dom';

// with fields for email, password, login button, and option to register
function LoginForm ({ goRegister, login }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const processLogin = () => {
    login(email, password);
  };

  return (
    <>
      <label htmlFor='email'>Email:</label>
      <br />
      <input
        id='email'
        type='email'
        onChange={(e) => setEmail(e.target.value)}
        aria-required='true'
      />
      <br />
      <label htmlFor='password'>Password:</label>
      <br />
      <input
        id='password'
        type='password'
        onChange={(e) => setPassword(e.target.value)}
        aria-required='true'
      />
      <br />
      <br />
      <button type='login' onClick={processLogin}>
        Log In{' '}
      </button>
      <br />
      <br />
      No Account?
      <button type='register' onClick={goRegister}>
        Register!
      </button>
      <br />
    </>
  );
}

LoginForm.propTypes = {
  goRegister: PropTypes.func,
  login: PropTypes.func,
};

export default LoginForm;
