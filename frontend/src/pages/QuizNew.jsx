import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar'

// this is not used
function QuizNew () {
  const navigate = useNavigate();
  const [name, setName] = React.useState('');
  const token = localStorage.getItem('token')
  console.log(token)
  React.useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  })

  const createQuiz = async () => {
    const response = await fetch('http://localhost:5005/admin/quiz/new', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    });

    if (response.status === 400) {
      console.log('BANANa')
      console.log(await response.text())
    }
  }

  return <>
    <NavBar token = {token}/>
    <h1>QuizNew</h1>
    Quize name: <input
        type="text"
        onChange={e => setName(e.target.value)}
    />
    <button onClick={ createQuiz}>create</button>
  </>
}

export default QuizNew;
