import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';

// form with field for email, name and password to register new users
function RegisterForm ({ register }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');

  const processRegister = () => {
    register(email, password, name)
  }

  return (<>
    Email:
    <br/>
    <input
      type = "text"
      onChange={e => setEmail(e.target.value)}
    /><br/>

    Password:
    <br/>
    <input
      type ="text"
      onChange={e => setPassword(e.target.value)}
    /><br/>

    Name:
    <br/>
    <input
      type = "text"
      onChange={e => setName(e.target.value)}
    /><br/>

    <br/>
    <Button variant="contained" onClick={processRegister}>Register </Button>

  </>)
}

RegisterForm.propTypes = {
  register: PropTypes.func
};

export default RegisterForm;
