import React from 'react';
import RegisterForm from '../components/RegisterForm'
import { useNavigate } from 'react-router-dom';

// register page, with register form
function Register () {
  const navigate = useNavigate()

  // calls backend to register
  const register = async (email, password, name) => {
    const response = await fetch('http://localhost:5005/admin/auth/register', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        name,
      })
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error)
    } else {
      localStorage.setItem('token', data.token);
      navigate('/admin/quiz');
    }
  }

  // returns a header, and a register form
  return (<>
    <h1>Register</h1>
    <RegisterForm
      register = {register}
    />
  </>)
}

export default Register;
