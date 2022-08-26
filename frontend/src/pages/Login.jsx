import React from 'react';
import LoginForm from '../components/LoginForm'
import { useNavigate } from 'react-router-dom';

// login screen, with login form
function Login () {
  const navigate = useNavigate()

  const login = async (email, password) => {
    console.log('LOGIN!')
    console.log(password)
    console.log(email)
    const response = await fetch('http://localhost:5005/admin/auth/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      })
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error)
    } else {
      localStorage.setItem('token', data.token);
      console.log('NAVIGATE!')
      navigate('/admin/quiz');
    }
  }
  return (<>
    <h1>Login</h1>
    <LoginForm
      goRegister = {() => {
        navigate('/register')
      }}
      login = {login}
    />
  </>)
}

export default Login;
